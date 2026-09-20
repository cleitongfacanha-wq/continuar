# Plataforma Continuar — Vigilância Ergonômica Preditiva & Cinesioterapia Laboral (NR-17)
> **"Seu Corpo Foi Feito para se Mover. Nós Ajudamos Você a Continuar."**

- **Responsável Técnico:** Dr. Cleiton Gomes Façanha • Fisioterapeuta do Trabalho • CREFITO-10: 265.366-F
- **Unidade:** Unidade de Desempenho em Saúde Ocupacional (UDSO) • Hospital Governador Celso Ramos (HGCR / SES-SC)
- **Marco Normativo:** NR-17 (MTE), Lei Estadual nº 6.745/85, CIF (OMS), e-MAG / WCAG 2.1 AA e LGPD (Lei nº 13.709/2018).

---

## 1. Visão Geral da Arquitetura
A **Plataforma Continuar** foi desenvolvida para substituir o modelo reativo de saúde ocupacional por vigilância contínua e intervenção precoce de cinesioterapia laboral baseada em mecanotransdução.

### Estrutura de Arquivos:
- `index.html`: Portal principal SPA com mapa anatômico interativo em SVG, escala EVA, rotinas de micro-pausas e barra governamental de acessibilidade digital (e-MAG).
- `anamnese.html` (e `anamnese_hgcr.html`): Anamnese biopsicossocial desacoplada com 6 novos campos periciais (dominância motora, turno/horário, dupla jornada na saúde, histórico de afastamento $>15$ dias, biometria peso/altura e ritmo de trabalho), ditado por voz assistivo e higienização para computadores coletivos.
- `painel_gestor_udso.html`: Painel executivo e pericial da UDSO com:
  - Triagem de alta prioridade automática para afastamento $>15$ dias.
  - Calculadora de ROI do absenteísmo (simulador financeiro de economia de plantão).
  - Módulo científico de MCID (Diferença Clinicamente Importante Mínima).
  - Exportação de dados abertos para a RNDS em JSON estruturado com CIF e CID-10.
- `dash_hgcr.html`: Avaliação de Membros Superiores (QuickDASH - IWH, códigos CIF d430 e d445).
- `lefs_HGCR.html`: Escala Funcional de Membros Inferiores (LEFS - Binkley et al., códigos CIF d450 e d455).
- `oswestry_HGCR.html`: Índice de Incapacidade Lombar (Oswestry Disability Index - Fairbank et al., códigos CIF b28013, d410, d415).
- `roland_morris_HGCR.html`: Questionário de Incapacidade Roland-Morris (RMDQ, 24 itens).
- `QNSO_Digital_PROJETO_CONTINUAR_HGCR.html`: Questionário Nórdico de Sintomas Osteomusculares (9 regiões anatômicas, 12 meses, afastamento e 7 dias).
- `orientacoes.html`: Diretrizes de autocuidado, normas, ergonomia de telas e fluxo de CAT em 24 horas.
- `reba_hgcr.html`: Método REBA de avaliação postural de campo (Hignett & McAtamney) para manuseio de pacientes e leitos.
- `ict_hgcr.html`: Índice de Capacidade para o Trabalho (WAI - FIOH) para predição de aposentadorias precoces e envelhecimento funcional.
- `corlett_hgcr.html`: Diagrama de Desconforto Postural Situacional (Corlett & Manenica) para avaliação pré/pós-plantão de 12h.
- `nasa_tlx_hgcr.html`: Avaliação de Carga de Trabalho Mental e Cognitiva atendendo ao Item 17.4 da NR-17.

---

## 2. Inovações Estratégicas para Editais e Concursos
1. **Calculadora de Retorno Econômico (ROI do Absenteísmo):**
   - Demonstra economia real aos cofres públicos (custo médio da diária de substituição R$ 350 a R$ 500).
   - Projeção de R$ 42.000 a R$ 78.750 de economia anual por setor hospitalar com custo zero de implantação.
2. **Critério Científico MCID (Minimal Clinically Important Difference):**
   - Limiares formais: EVA (>= 2.0 pts), QuickDASH (>= 11.0 pts), Roland-Morris (>= 4.0 pts), LEFS (>= 9.0 pts), Oswestry (>= 10.0 pts / 12.8%).
3. **Interoperabilidade RNDS / JSON Estruturado:**
   - Botão no painel gestor que gera dados estruturados com taxonomia CIF e CID-10 prontos para integração ao Prontuário Eletrônico da SES-SC.
4. **Acessibilidade Digital (e-MAG / WCAG 2.1 AA):**
   - Redimensionamento de fonte (A-, A, A+), modo de alto contraste para plantões noturnos e reconhecimento por voz como tecnologia assistiva.

---

## 3. Sincronização de Dados e Privacidade
- Sincronização bidirecional por chaves cruzadas no navegador (`hgcr_user_nome`, `hgcr_servidor_nome`, matrícula, setor, função).
- Botão "Limpar Meus Dados deste Computador" para proteção em postos de enfermagem compartilhados.
- Duplo nível de sigilo da LGPD: dados clínicos individuais restritos à equipe fisioterapêutica; painel de coordenação recebe dados epidemiológicos agregados por setor.

---

## 4. Validação Técnica
Para validar a integridade dos scripts em todas as páginas:
```bash
node scratch/validate_all.js
```
Todos os 9 arquivos HTML e scripts embutidos são validados sintaticamente em ambiente isolado (Node.js vm).
