// ==============================================================================
// ERGOVIGIL - PLATAFORMA DE GESTÃO ERGONÔMICA PREDITIVA E CINESIOTERAPIA (NR-17)
// Vigilância Ergonômica Preditiva & SESMT
// Responsável Técnico: Dr. Cleiton Gomes Façanha (CREFITO-10: 265.366-F)
//
// BACKEND INSTITUCIONAL SEGURO - GOOGLE APPS SCRIPT (v3.0)
// - Coleta Cega: Armazenamento de respostas textuais completas para auditoria
// - Cálculo e Estratificação On-the-Fly em segundo plano para o Painel Gestor
// - Compatível com Netlify, envio via Fetch JSON ou Form URL Encoded
// - Trava de Concorrência (LockService) e Proteção contra Formula Injection
// - Auditoria e Rastreabilidade (Protocolo EV-YYYYMMDD-XXXX)
// ==============================================================================

function sanitizeCell(val) {
  if (val === null || val === undefined) return '';
  var s = String(val).trim();
  // Proteção contra Formula Injection
  if (/^[=+\-@\t\r]/.test(s)) {
    return "'" + s;
  }
  return s;
}

function gerarProtocolo() {
  var dataStr = Utilities.formatDate(new Date(), "GMT-3", "yyyyMMdd");
  var rand = ("0000" + Math.floor(Math.random() * 10000)).slice(-4);
  return "EV-" + dataStr + "-" + rand;
}

// 1. RECEBIMENTO DOS DADOS BRUTOS COMPLETOS (COLETA CEGA)
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    if (!lock.tryLock(10000)) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'erro',
        mensagem: 'Servidor ocupado processando outros registros. Tente novamente em alguns segundos.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var dados = {};

    // 1.1 Tenta ler JSON enviado no corpo da requisição (fetch)
    if (e && e.postData && e.postData.contents) {
      try {
        dados = JSON.parse(e.postData.contents);
      } catch (_) {
        dados = e.parameter || {};
      }
    } else if (e && e.parameter) {
      dados = e.parameter;
    }

    // 1.2 Identifica a aba de destino
    var origem = (dados.origem || dados.TIPO_FORMULARIO || dados.acao || 'ANAMNESE').toString().toUpperCase().trim();
    var nomeAba = 'ANAMNESE';
    if (origem.indexOf('QNSO') > -1) nomeAba = 'QNSO';
    else if (origem.indexOf('DASH') > -1) nomeAba = 'DASH';
    else if (origem.indexOf('OSWESTRY') > -1 || origem.indexOf('ODI') > -1) nomeAba = 'OSWESTRY';
    else if (origem.indexOf('ROLAND') > -1 || origem.indexOf('RMDQ') > -1) nomeAba = 'ROLAND';
    else if (origem.indexOf('LEFS') > -1) nomeAba = 'LEFS';
    else if (origem.indexOf('EVA') > -1) nomeAba = 'EVA';
    else if (origem.indexOf('REBA') > -1) nomeAba = 'REBA';
    else if (origem.indexOf('ICT') > -1 || origem.indexOf('WAI') > -1) nomeAba = 'ICT';
    else if (origem.indexOf('CORLETT') > -1) nomeAba = 'CORLETT';
    else if (origem.indexOf('NASA') > -1 || origem.indexOf('TLX') > -1) nomeAba = 'NASA_TLX';
    else if (origem.indexOf('AGENDAMENTO') > -1) nomeAba = 'AGENDAMENTO';
    else if (origem.indexOf('EVOLUCAO') > -1) nomeAba = 'EVOLUCAO';

    var sheet = ss.getSheetByName(nomeAba);
    if (!sheet) {
      sheet = ss.insertSheet(nomeAba);
    }

    // 1.3 Adiciona metadados de rastreabilidade
    if (!dados.protocolo) dados.protocolo = gerarProtocolo();
    if (!dados.timestamp) dados.timestamp = Utilities.formatDate(new Date(), "GMT-3", "dd/MM/yyyy HH:mm:ss");

    // 1.4 Gerencia cabeçalhos dinâmicos preservando todas as respostas textuais
    var headers = sheet.getLastColumn() > 0 ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    var chaves = Object.keys(dados);
    var novasChaves = chaves.filter(function(k) { return headers.indexOf(k) === -1; });

    if (novasChaves.length > 0) {
      headers = headers.concat(novasChaves);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#0F4C43').setFontColor('#FFFFFF');
    }

    // 1.5 Monta e anexa a linha com sanitização
    var novaLinha = headers.map(function(h) {
      return sanitizeCell(dados[h]);
    });
    sheet.appendRow(novaLinha);

    // Registro em aba de Auditoria
    try {
      var aud = ss.getSheetByName('AUDITORIA');
      if (!aud) {
        aud = ss.insertSheet('AUDITORIA');
        aud.appendRow(['Data UTC', 'Protocolo', 'Aba', 'Matrícula', 'Status']);
      }
      aud.appendRow([new Date().toISOString(), dados.protocolo, nomeAba, sanitizeCell(dados.matricula || dados.matricula_servidor || ''), 'GRAVADO_SUCESSO']);
    } catch (_) {}

    return ContentService.createTextOutput(JSON.stringify({
      status: 'sucesso',
      protocolo: dados.protocolo,
      mensagem: 'Sua avaliação foi encaminhada.'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (erro) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'erro',
      detalhe: erro.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// 2. PROCESSAMENTO ANALÍTICO ON-THE-FLY PARA O PAINEL GESTOR (doGet)
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // 2.1 Autenticação do Gestor
    if (e && e.parameter && e.parameter.action === 'autenticar_gestor') {
      var senhaRecebida = (e.parameter.senha || '').trim();
      var senhaEsperada = PropertiesService.getScriptProperties().getProperty('SENHA_GESTOR') || 'udso2026';
      if (senhaRecebida === senhaEsperada) {
        var token = Utilities.getUuid();
        CacheService.getScriptCache().put('sess_' + token, 'autorizado', 1200);
        return ContentService.createTextOutput(JSON.stringify({
          status: 'sucesso',
          token: token,
          mensagem: 'Acesso autorizado.'
        })).setMimeType(ContentService.MimeType.JSON);
      } else {
        return ContentService.createTextOutput(JSON.stringify({
          status: 'erro',
          mensagem: 'Chave de acesso incorreta.'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // 2.2 Função auxiliar para ler qualquer aba
    function lerAbaBruta(nomeAba) {
      var sh = ss.getSheetByName(nomeAba);
      if (!sh || sh.getLastRow() <= 1) return [];
      var data = sh.getDataRange().getValues();
      var headers = data[0];
      var lista = [];
      for (var i = 1; i < data.length; i++) {
        var item = {};
        for (var j = 0; j < headers.length; j++) {
          item[headers[j]] = data[i][j];
        }
        lista.push(item);
      }
      return lista;
    }

    var baseAnamnese = lerAbaBruta('ANAMNESE');
    var baseEva = lerAbaBruta('EVA');
    var baseQnso = lerAbaBruta('QNSO');
    var baseOswestry = lerAbaBruta('OSWESTRY');
    var baseRoland = lerAbaBruta('ROLAND');
    var baseDash = lerAbaBruta('DASH');
    var baseLefs = lerAbaBruta('LEFS');
    var baseAgendamento = lerAbaBruta('AGENDAMENTO');
    var baseEvolucao = lerAbaBruta('EVOLUCAO');
    var baseReba = lerAbaBruta('REBA');
    var baseIct = lerAbaBruta('ICT');
    var baseCorlett = lerAbaBruta('CORLETT');
    var baseNasaTlx = lerAbaBruta('NASA_TLX');

    // Dicionários de Pesos Técnicos Oficiais para Cálculo em Segundo Plano
    var pesosOswestry = {
      "Não sinto dor no momento": 0, "A dor é muito leve no momento": 1, "A dor é moderada no momento": 2, "A dor é forte no momento": 3, "A dor é muito severa no momento": 4, "A dor é a pior imaginável no momento": 5,
      "Não preciso me ajudar para me lavar ou vestir": 0, "Consigo me lavar e vestir sozinho, mas sinto dor": 1, "É doloroso me lavar e vestir e faço devagar": 2, "Preciso de alguma ajuda, mas faço a maior parte": 3, "Preciso de ajuda diária na maioria dos cuidados": 4, "Não consigo me vestir, mal consigo me lavar": 5,
      "Consigo levantar pesos sem dor extra": 0, "Consigo levantar pesos, mas sinto dor extra": 1, "A dor me impede de levantar pesos do chão, mas consigo se bem posicionados": 2, "A dor me impede de levantar pesos pesados, mas médios consigo": 3, "Só consigo levantar pesos muito leves": 4, "Não consigo levantar ou carregar peso nenhum": 5,
      "A dor não me impede de caminhar qualquer distância": 0, "A dor me impede de caminhar mais que 1 km": 1, "A dor me impede de caminhar mais que 500 metros": 2, "A dor me impede de caminhar mais que 100 metros": 3, "Só consigo caminhar com bengala ou muletas": 4, "Fico na cama a maior parte do tempo": 5,
      "Consigo sentar em qualquer cadeira o tempo que quiser": 0, "Só consigo sentar na minha cadeira favorita por 1 hora": 1, "A dor me impede de sentar por mais de 30 minutos": 2, "A dor me impede de sentar por mais de 10 minutos": 3, "A dor me impede de sentar de qualquer forma": 4, "Não consigo sentar de jeito nenhum": 5,
      "Consigo ficar em pé o tempo que quiser sem dor extra": 0, "Consigo ficar em pé, mas sinto dor extra com o tempo": 1, "A dor me impede de ficar em pé por mais de 1 hora": 2, "A dor me impede de ficar em pé por mais de 30 minutos": 3, "A dor me impede de ficar em pé por mais de 10 minutos": 4, "Não consigo ficar em pé de jeito nenhum": 5,
      "Meu sono não é perturbado pela dor": 0, "Meu sono é um pouco perturbado pela dor (acordo 1x)": 1, "Meu sono é moderadamente perturbado (acordo 2x)": 2, "A dor me faz acordar de 3 a 4 vezes por noite": 3, "A dor quebra meu sono quase todas as noites": 4, "A dor me impede de dormir completamente": 5,
      "Minha vida social é normal e não me causa dor extra": 0, "Minha vida social é normal, mas aumenta o grau da minha dor": 1, "A dor não afeta minha vida social, mas limita atividades mais físicas": 2, "A dor limitou minha vida social e não saio com frequência": 3, "A dor restringiu minha vida social apenas ao meu lar": 4, "Não tenho vida social por causa da dor": 5,
      "Consigo viajar para qualquer lugar sem dor": 0, "Consigo viajar, mas sinto dor extra no percurso": 1, "A dor é ruim, mas aguento viagens de até 2 horas": 2, "A dor me limita a viagens de menos de 1 hora": 3, "A dor me limita a viagens curtas e necessárias de menos de 20 minutos": 4, "A dor me impede de viajar exceto deitado": 5
    };

    var pesosDash = {
      "Sem nenhuma dificuldade": 1, "Com pequena dificuldade": 2, "Com dificuldade moderada": 3, "Com grande dificuldade": 4, "Incapaz": 5,
      "Nenhum": 1, "Leve": 2, "Moderado": 3, "Intenso": 4, "Muito intenso": 5,
      "Sem limitação": 1, "Pouco limitado": 2, "Moderadamente limitado": 3, "Muito limitado": 4, "Totalmente limitado": 5
    };

    var pesosLefs = {
      "Nenhuma dificuldade": 4, "Pequena dificuldade": 3, "Dificuldade moderada": 2, "Grande dificuldade": 1, "Dificuldade extrema / Impossível": 0
    };

    // Processamento Oswestry (ODI)
    var oswestryCalculado = baseOswestry.map(function(r) {
      var pontos = 0, respondidas = 0;
      for (var k in r) {
        if (k.indexOf('secao') > -1 && pesosOswestry[r[k]] !== undefined) {
          pontos += pesosOswestry[r[k]];
          respondidas++;
        }
      }
      var score = respondidas > 0 ? Math.round((pontos / (respondidas * 5)) * 100) : 0;
      var classif = score <= 20 ? 'Mínima' : score <= 40 ? 'Moderada' : score <= 60 ? 'Severa' : 'Incapacitante';
      return {
        matricula: r.matricula || r.matricula_servidor || '',
        nome: r.nome || r.nome_servidor || '',
        setor: r.setor || r.setor_servidor || '',
        timestamp: r.timestamp || '',
        score: score,
        classificacao: classif
      };
    });

    // Processamento Roland-Morris (RMDQ)
    var rolandCalculado = baseRoland.map(function(r) {
      var count = 0;
      for (var k in r) {
        if (k.indexOf('item') > -1 && (r[k] === 'Sim' || r[k] === true || r[k] === 1)) {
          count++;
        }
      }
      var classif = count <= 4 ? 'Mínimo' : count <= 13 ? 'Moderado' : 'Severo';
      return {
        matricula: r.matricula || r.matricula_servidor || '',
        nome: r.nome || r.nome_servidor || '',
        setor: r.setor || r.setor_servidor || '',
        timestamp: r.timestamp || '',
        score: count,
        classificacao: classif
      };
    });

    // Processamento QuickDASH
    var dashCalculado = baseDash.map(function(r) {
      var pontos = 0, respondidas = 0;
      for (var k in r) {
        if (k.indexOf('item') > -1 && pesosDash[r[k]] !== undefined) {
          pontos += pesosDash[r[k]];
          respondidas++;
        }
      }
      var score = respondidas >= 10 ? Math.round(((pontos / respondidas) - 1) * 25) : 0;
      var classif = score <= 15 ? 'Mínima' : score <= 40 ? 'Moderada' : 'Severa';
      return {
        matricula: r.matricula || r.matricula_servidor || '',
        nome: r.nome || r.nome_servidor || '',
        setor: r.setor || r.setor_servidor || '',
        timestamp: r.timestamp || '',
        score: score,
        classificacao: classif
      };
    });

    // Processamento LEFS
    var lefsCalculado = baseLefs.map(function(r) {
      var pontos = 0, respondidas = 0;
      for (var k in r) {
        if (k.indexOf('item') > -1 && pesosLefs[r[k]] !== undefined) {
          pontos += pesosLefs[r[k]];
          respondidas++;
        }
      }
      var cap = respondidas > 0 ? Math.round((pontos / (respondidas * 4)) * 100) : 100;
      var classif = cap >= 80 ? 'Preservada' : cap >= 60 ? 'Moderada' : 'Severa';
      return {
        matricula: r.matricula || r.matricula_servidor || '',
        nome: r.nome || r.nome_servidor || '',
        setor: r.setor || r.setor_servidor || '',
        timestamp: r.timestamp || '',
        capacidade: cap,
        classificacao: classif
      };
    });

    var retorno = {
      status: 'sucesso',
      timestamp: new Date().toISOString(),
      anamnese: baseAnamnese,
      eva: baseEva,
      qnso: baseQnso,
      oswestry: oswestryCalculado,
      roland: rolandCalculado,
      dash: dashCalculado,
      lefs: lefsCalculado,
      agendamento: baseAgendamento,
      evolucao: baseEvolucao,
      reba: baseReba,
      ict: baseIct,
      corlett: baseCorlett,
      nasa_tlx: baseNasaTlx
    };

    return ContentService.createTextOutput(JSON.stringify(retorno)).setMimeType(ContentService.MimeType.JSON);
  } catch (erro) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'erro', detalhe: erro.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
