# Publicação segura

## 1. Preservar e restringir o ambiente antigo

1. Faça uma cópia privada da planilha e do projeto Apps Script que estão em uso. O backup local desta atualização contém código, não dados da planilha.
2. Verifique se a planilha não está pública nem compartilhada com pessoas que só precisam do portal. Os usuários do portal não precisam de acesso direto à planilha.
3. Planeje a troca do endereço ou da versão oficial. Arquive/desative todas as implantações antigas que exponham doGet/doPost sem autenticação. Editar o código no editor não altera uma versão implantada até atualizar a implantação.
4. Mantenha backups e arquivos de configuração fora de qualquer hospedagem pública.

## 2. Copiar os arquivos para o Apps Script

No projeto Apps Script autorizado, remova/substitua o código antigo, evitando funções doGet/doPost duplicadas.

| Arquivo local | Destino no Apps Script |
|---|---|
| CODIGO_APPS_SCRIPT_ATUALIZADO.js | Arquivo de código, por exemplo Codigo.gs |
| index.html | HTML index |
| dash_hgcr.html | HTML dash_hgcr |
| lefs_HGCR.html | HTML lefs_HGCR |
| oswestry_HGCR.html | HTML oswestry_HGCR |
| roland_morris_HGCR.html | HTML roland_morris_HGCR |
| QNSO_Digital_PROJETO_CONTINUAR_HGCR.html | HTML QNSO_Digital_PROJETO_CONTINUAR_HGCR |
| painel_gestor_udso.html | HTML painel_gestor_udso |
| compartilhado.html | HTML compartilhado |
| painel_script.html | HTML painel_script |
| estilos.html | HTML estilos |
| appsscript.json | Manifesto, visível pelas configurações do editor |

Preserve maiúsculas e minúsculas nos nomes dos arquivos. Não substitua os trechos de template `<? ... ?>`: o Apps Script os processa.

## 3. Configurar o login Google para as contas Gmail

As duas contas administradoras são Gmail; por isso não se depende de Session.getActiveUser em um aplicativo executado como proprietário.

1. No Google Cloud, crie/configure um cliente OAuth do tipo **Aplicativo da Web** e a tela de consentimento com público externo, pois as contas são Gmail.
2. Para homologação em modo de teste, cadastre os dois administradores como usuários de teste. Para liberar outros usuários, ajuste o público e a publicação do aplicativo de autenticação conforme as exigências exibidas pelo Google.
3. Use os escopos de login `openid email profile`. Não solicite aos usuários acesso à planilha.
4. Copie o ID do cliente e seu segredo para as **propriedades do script**, nunca para o HTML nem para a conversa.
5. Implante o Apps Script como aplicativo da Web, executado como a conta proprietária com acesso à planilha. A estrutura HTML permite acesso sem conta no nível da implantação; as operações de dados exigem login Google e autorização no código. Esta configuração só deve ser usada com todos os arquivos desta versão, jamais com o servidor antigo.
6. Abra o endereço `/exec` implantado. Obtenha a origem HTTPS do frame da aplicação (no console do navegador, selecione o frame que contém o portal e execute `location.origin`). O HTML Service roda em um domínio `googleusercontent.com`, que pode diferir da URL `script.google.com` visível na barra.
7. Cadastre **essa origem exata** nas origens JavaScript autorizadas do cliente Google Cloud e na propriedade `GOOGLE_ORIGINS_JSON`. Não use curingas nem aceite qualquer origem recebida do navegador.
8. No modelo popup, a troca do código usa a origem da página como `redirect_uri`. Se a configuração do cliente exigir sua inclusão entre redirecionamentos autorizados, cadastre a mesma origem exata. Não invente uma URL diferente para o callback.
9. Reabra o portal e teste os dois logins. Bloqueio de popup, configuração de origem ou política do navegador precisam ser verificados na homologação real. Se a origem mudar após uma nova implantação, atualize a lista explicitamente.

O servidor troca o código de uso único diretamente no Google, consulta o perfil verificado e só então emite uma sessão do portal. Não usa tokeninfo de depuração, não confia em e-mail enviado pelo formulário e não salva tokens de acesso/refresh do Google.

## 4. Propriedades obrigatórias do script

Use o editor do Apps Script → Configurações do projeto → Propriedades do script.

| Propriedade | Conteúdo |
|---|---|
| SPREADSHEET_ID | ID real da planilha privada |
| GOOGLE_CLIENT_ID | ID real do cliente OAuth Web |
| GOOGLE_CLIENT_SECRET | Segredo real do cliente OAuth, somente no servidor |
| GOOGLE_ORIGINS_JSON | Array JSON com as origens HTTPS exatas do portal |
| SETORES_JSON | Array JSON com os nomes oficiais dos setores |
| USUARIOS_JSON | Objeto JSON de contas e perfis autorizados |

Veja **CONFIGURACAO_EXEMPLO.json**. Os setores do exemplo são ilustrativos: substitua pela lista oficial. Os dois e-mails administradores já foram preenchidos conforme solicitado. Não cole o arquivo inteiro como uma única propriedade: cada chave corresponde a uma propriedade, e arrays/objetos são valores em JSON.

Para cadastrar um servidor, informe `perfil`, `nome`, `matricula` e `setor`. Matrícula e setor são conferidos no servidor. Para clínica ou gestão, selecione `clinico` ou `gestor`. Para desativar uma conta, remova-a de USUARIOS_JSON ou defina `ativo: false`. O arquivo de exemplo é referência; sua edição local não altera as propriedades publicadas.

## 5. Homologação antes de liberar dados reais

1. Use inicialmente uma cópia privada de teste da planilha.
2. Entre com cada administrador e confirme o acesso. Tente uma terceira conta não cadastrada e confirme a negativa.
3. Cadastre usuários fictícios de teste para cada perfil e confira os limites da tabela em LEIA-ME.md.
4. Envie uma avaliação fictícia e verifique o protocolo, a linha em REGISTROS_V2 e a autoria em AUDITORIA_V2.
5. Simule perda de resposta/reenvio e confirme que o mesmo envio não gerou outra linha.
6. Confira a leitura dos cabeçalhos e das datas das abas legadas da sua planilha. O adaptador contempla os nomes observados no código recebido; abas com outros nomes precisam de mapeamento explícito.
7. Confira que o gestor não recebe registros individuais, nem ao tentar chamar obterRegistro pelo navegador.
8. Teste encerramento, expiração, revogação do usuário, navegação entre páginas e computador compartilhado.
9. Revise a versão adaptada das escalas, o aviso de tratamento de dados, os perfis autorizados e a lista de setores com os responsáveis institucionais. O código não estabelece sozinho os procedimentos institucionais de retenção e acesso.
10. Atualize a publicação oficial e desative as implantações antigas. Só então distribua o endereço novo/oficial.

## 6. Recuperação, auditoria e cópias de segurança

- Os registros v2 são acrescentados às novas abas; as abas antigas ficam preservadas. Não renomeie/remova colunas da aba REGISTROS_V2 manualmente.
- AUDITORIA_V2 registra tentativas de gravação e leituras, sem copiar os relatos. `TENTATIVA_REGISTRO` pode existir sem linha gravada; correlacione o ID com REGISTROS_V2.
- O histórico de versões do Sheets e as cópias institucionais são mecanismos de recuperação. Programe cópias privadas conforme a política do hospital e teste a restauração em uma planilha separada. Não foi criada uma rotina automática de backup sem definir destino e retenção.
- Em caso de indisponibilidade, mantenha o portal fechado; não reative o endpoint público antigo como solução temporária.
- Para reverter somente os arquivos locais, utilize a pasta irmã de backup criada na atualização. A reversão do código local não reverte dados da planilha.
- Se houver comprometimento do cliente OAuth, troque o segredo nas propriedades e na configuração Google. Se houver comprometimento de uma conta, remova a conta da lista e revise os acessos na auditoria.
- A sessão é um token temporário em sessionStorage, não um cookie HttpOnly; manter ausência de XSS e controle de scripts externos é essencial. O cache pode descartar sessões antes do prazo, exigindo novo login; ele nunca autoriza acesso quando a sessão estiver ausente.

## Referências técnicas

- [Google: modelo de código OAuth e popup](https://developers.google.com/identity/oauth2/web/guides/use-code-model)
- [Google: configuração do cliente](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)
- [Google: comunicação do HTML Service e funções privadas](https://developers.google.com/apps-script/guides/html/communication)
- [Google: opções de publicação](https://developers.google.com/apps-script/manifest/web-app-api-executable)
