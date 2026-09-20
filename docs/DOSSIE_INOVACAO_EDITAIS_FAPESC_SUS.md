# Dossiê Técnico de Inovação e Impacto no SUS
## Plataforma Continuar • Vigilância Ergonômica Preditiva & Cinesioterapia Laboral
**Slogan Oficial:** "Seu Corpo Foi Feito para se Mover. Nós Ajudamos Você a Continuar."

- **Responsável Técnico:** Dr. Cleiton Gomes Façanha • Fisioterapeuta do Trabalho • CREFITO-10: 265.366-F
- **Unidade de Origem:** Unidade de Desempenho em Saúde Ocupacional (UDSO / HGCR / SES-SC)
- **Classificação:** Tecnologia em Saúde Digital / Vigilância Ocupacional Hospitalar
- **Editais-Alvo:** FAPESC (Chamadas de Inovação em Saúde), Inova Startups, Prêmio Inova Saúde SC, Boas Práticas do SUS (MS/OPAS)

---

## 1. Identificação do Problema Clínico e de Gestão
A rotina assistencial em hospitais públicos impõe sobrecargas biomecânicas severas. Movimentação manual de pacientes sedados em leitos de UTI, sustentação estática de afastadores em bloco cirúrgico e repetitividade no CME provocam alta incidência de LER/DORT (CID-10: M54, M65, M75).

O modelo tradicional opera de forma reativa. O trabalhador procura o SESMT após a instalação de incapacidade grave ou com atestado médico em mãos.

Impactos diretos no HGCR:
- Furos repentinos nas escalas de enfermagem e apoio.
- Sobrecarga física cumulativa nos servidores remanescentes.
- Custo elevado com pagamento de horas extras e substituições.
- Demanda reprimida por perícia médica e processos de readaptação (Lei Estadual nº 6.745/85).

---

## 2. A Solução: Plataforma Continuar
Plataforma web móvel (PWA) de triagem precoce, monitoramento funcional contínuo e cinesioterapia laboral baseada em mecanotransdução.

### Componentes Arquiteturais:
1. **Anamnese Biopsicossocial e Pericial Dedicada (`anamnese.html`):**
   - 6 novos campos estratégicos: dominância motora (destro/canhoto/ambidestro), turno/carga semanal, dupla jornada na saúde, histórico de afastamento $>15$ dias, biometria (peso/altura/IMC) e ritmo de trabalho.
   - Tecnologia Assistiva: reconhecimento por voz para servidores com dor intensa em MMSS/LER.
   - Higienização de dados em 1 clique para terminais compartilhados de posto.
2. **Matriz Topográfica de Sintomas em SVG:**
   - Registro diário em menos de 60 segundos por mapa anatômico interativo frente/costas.
   - Graduação de dor por Escala Visual Analógica (EVA 0-10).
3. **Bateria de Escalas Clínicas Padrão-Ouro:**
   - **QuickDASH:** incapacidade física de MMSS (fórmula oficial IWH).
   - **Roland-Morris (RMDQ):** incapacidade por dor lombar (0 a 24 pontos).
   - **Oswestry Disability Index (ODI):** índice de incapacidade lombar persistente.
   - **LEFS:** funcionalidade de membros inferiores (0 a 80 pontos, Binkley et al.).
   - **QNSO:** matriz nórdica padronizada em 9 regiões anatômicas (12 meses, afastamento e últimos 7 dias).
4. **Quatro Ferramentas de Ergonomia de Campo & AET (NR-17):**
   - **Método REBA (`reba_hgcr.html`):** Auditoria postural de campo (Hignett & McAtamney) para tarefas com movimentação de pacientes e leitos.
   - **ICT / WAI (`ict_hgcr.html`):** Índice de Capacidade para o Trabalho (7 dimensões) para predição de aposentadorias precoces e envelhecimento funcional.
   - **Diagrama de Corlett (`corlett_hgcr.html`):** Rastreio de desconforto situacional agudo pré/pós-plantão de 12h ou pós-tarefas críticas em 12 segmentos.
   - **NASA-TLX (`nasa_tlx_hgcr.html`):** Mensuração de carga mental, física, temporal e estresse em atendimento expresso ao Item 17.4 da NR-17.
5. **Painel Gestor Estratégico (`painel_gestor_udso.html`):**
   - Aba executiva de Ergonomia & AET (NR-17) com distribuição de risco REBA, curvas de WAI e comparativo de carga cognitiva.
   - Triagem automática de prioridade alta para casos com histórico de afastamento $>15$ dias.
   - Calculadora de ROI do absenteísmo.
   - Módulo de Diferença Clinicamente Importante Mínima (MCID).
   - Exportação interoperável em padrão RNDS / JSON estruturado com taxonomia CIF e CID-10.
6. **Acessibilidade Governamental (e-MAG / WCAG 2.1 AA):**
   - Barra de acessibilidade com redimensionamento de fonte (A- / A / A+) e alternador de alto contraste.

---

## 3. Indicador de Retorno Econômico (ROI do Absenteísmo)
Soluções para o SUS precisam demonstrar sustentabilidade e economia direta de recursos públicos.

### Base de Cálculo Parametrizada no HGCR:
- Custo médio da diária de um servidor de saúde (vencimento básico + encargos + cobertura de escala por hora-extra ou plantão extra): **R$ 350,00 a R$ 500,00/dia**.
- Afastamento médio por crise aguda osteomuscular sem manejo prévio: **15 dias**.
- Custo direto de 1 afastamento evitado: $15 \times R\$ 350,00 = R\$ 5.250,00$.

### Simulação no Piloto (Centro Cirúrgico + UTI - 50 servidores):
- Afastamentos por LER/DORT prevenidos via micro-pausas e cinesioterapia: **8 a 15 servidores/ano**.
- **Economia direta estimada aos cofres públicos:** **R$ 42.000,00 a R$ 78.750,00** por setor/ano.
- Custo de infraestrutura tecnológica da solução: **R$ 0,00** (arquitetura em nuvem gratuita, sem necessidade de servidores locais).
- **Taxa de Retorno (ROI):** 100% de ganho líquido imediato em produtividade assistencial.

---

## 4. Efetividade Clínica Mensurável (Métricas MCID)
Para além de impressões subjetivas, a plataforma utiliza a Diferença Clinicamente Importante Mínima (Minimal Clinically Important Difference - MCID). O servidor só é classificado como recuperado ao ultrapassar os limites matemáticos validados na literatura internacional:

| Instrumento Clínico | Limiar de Corte (MCID) | Significado Clínico no Plantão |
|---|---|---|
| **EVA (Escala de Dor)** | Redução $\ge 2.0$ pontos | Alívio perceptível da dor em repouso e movimento |
| **QuickDASH (MMSS)** | Queda $\ge 11.0$ pontos | Ganho funcional em punção, digitação e manuseio de instrumentais |
| **Roland-Morris (Lombar)** | Redução $\ge 4.0$ pontos | Retomada de flexão anterior e diminuição de pausas no leito |
| **Oswestry (ODI Lombar)** | Redução $\ge 10.0$ pts (ou $12.8\%$) | Capacidade mantida para ortostatismo e transferências de carga |
| **LEFS (MMII)** | Aumento $\ge +9.0$ pontos | Tolerância à deambulação hospitalar e subida de escadas |

A cinesioterapia atua por mecanotransdução nos tenócitos e fáscias. Séries de 15 minutos em dias alternados estimulam colágeno Tipo I, restabelecendo a biomecânica sem risco de fadiga residual no plantão.

---

## 5. Interoperabilidade em Saúde Digital (RNDS e e-SUS)
Em conformidade com a Estratégia de Saúde Digital para o Brasil 2020-2028:
- O painel gestor conta com botão nativo **"Exportar RNDS / JSON"**.
- Gera arquivo JSON estruturado contendo metadados clínicos, carimbo de data/hora ISO 8601, escores de incapacidade e mapeamento cruzado entre a Classificação Internacional de Funcionalidade (CIF) e a CID-10:
  - Mobilidade articular e dor vertebral: CIF b28013, d410, d415; CID-10: M54.5.
  - Uso da mão e braço em tarefas finas: CIF d430, d445; CID-10: M65, G56.0.
  - Marcha e ortostatismo prolongado: CIF d450, d455; CID-10: M79.
- O formato gerado é compatível com prontuários eletrônicos da SES-SC e barramentos FHIR do Datasus.

---


## 6. Módulos de Ergonomia de Campo, AET e Fatores Psicossociais (NR-17)
Para elevar o projeto aos padrões de rigor exigidos por auditores fiscais do trabalho e bancas de pesquisa aplicada (FAPESC / PPSUS), a plataforma integra a tríade biomecânica, funcional e psicossocial:

### 6.1 Método REBA (Rapid Entire Body Assessment — Hignett & McAtamney)
- **Foco Técnico:** Tarefas assistenciais dinâmicas com manuseio de pacientes e cargas vivas.
- **Estrutura:** Grupo A (Tronco, Pescoço, Pernas + Força) e Grupo B (Braços, Antebraços, Punhos + Pega).
- **Classificação:** 5 níveis de ação (1 a 15), identificando tarefas hospitalares em risco crítico (ex: transferência sem prancha, banho de leito com leito rebaixado).

### 6.2 Índice de Capacidade para o Trabalho (ICT / WAI — FIOH)
- **Foco Técnico:** Predição de capacidade residual e sustentabilidade funcional no SUS.
- **Estrutura:** 7 dimensões oficiais (capacidade atual vs ápice, demandas físicas/mentais, diagnósticos médicos, perda de produtividade, faltas em 12m, autoprognóstico em 2 anos e recursos mentais).
- **Aplicação SES-SC:** Identifica precocemente servidores em envelhecimento funcional para planejamento de rotação preventiva e instrução da perícia da Lei Estadual nº 6.745/85.

### 6.3 Diagrama de Desconforto Postural de Corlett & Manenica
- **Foco Técnico:** Mensuração do estresse biomecânico imediato (linha de base vs pós-plantão de 12h ou pós-cirurgia).
- **Estrutura:** 12 segmentos corporais com escala de 1 (nenhum) a 5 (intolerável).
- **Diferencial:** Permite isolar o impacto ergonômico de uma tarefa específica sem viés retrospectivo.

### 6.4 NASA-TLX Simplificado (Item 17.4 da NR-17)
- **Foco Técnico:** Aspectos cognitivos e psicossociais da organização do trabalho hospitalar.
- **Dimensões:** Exigência Mental, Física, Pressão Temporal, Desempenho, Esforço e Nível de Frustração.
- **Aplicação:** Comprova tecnicamente a sobrecarga psicossocial em setores de alta densidade de urgência (UTI e Emergência), subsidiando planos de intervenção multiprofissionais.

## 7. Conformidade Legal e Suporte Pericial
1. **Norma Regulamentadora nº 17 (NR-17):**
   - Atende às exigências de Avaliação Ergonômica Preliminar (AEP).
   - Documenta a organização do trabalho, ritmos e mobiliário.
2. **Lei Estadual nº 6.745/85 (Estatuto dos Servidores Públicos de SC):**
   - Fornece histórico técnico de intervenções fisioterapêuticas para a Perícia Médica Oficial da SES-SC.
   - Diferencia necessidades de reabilitação ambulatorial daquelas de readaptação de função definitiva.
3. **LGPD (Lei nº 13.709/2018):**
   - Duplo nível de proteção: dados individuais sob sigilo ético fisioterapêutico; gestor tem acesso apenas a dados epidemiológicos agregados por setor.

---

## 8. Checklist de Submissão para Editais de Fomento

- [x] Problema concreto do SUS claramente identificado e dimensionado.
- [x] Equipe multidisciplinar com Responsabilidade Técnica ativa (CREFITO-10).
- [x] Solução funcional testada e sem dependências de infraestrutura paga.
- [x] Métricas de impacto financeiro (Calculadora de ROI do absenteísmo implementada).
- [x] Métricas científicas de efetividade clínica (MCID incorporado nas 5 escalas).
- [x] Ferramentas de campo para AET e NR-17 (REBA, ICT/WAI, Corlett e NASA-TLX).
- [x] Interoperabilidade técnica comprovada (Exportação RNDS / JSON estruturado).
- [x] Acessibilidade digital para servidores PcD (e-MAG / WCAG 2.1 AA e reconhecimento por voz).
- [x] Termo de Consentimento Livre e Esclarecido (TCLE Digital) integrado ao fluxo.
- [x] Carta de Anuência da Direção e Coordenação da UDSO minuta padronizada.
