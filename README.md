# Plataforma Continuar — Fisioterapia do Trabalho & Gestão Ocupacional

> **"Seu Corpo Foi Feito para se Mover. Nós Ajudamos Você a Continuar."**

Sistema digital da Unidade de Desempenho em Saúde Ocupacional (UDSO) do Hospital Governador Celso Ramos (HGCR / SES-SC).  
Responsável técnico: **Dr. Cleiton Gomes Façanha** (CREFITO-10: 265.366-F).

---

## Acesso Online (GitHub Pages)

A aplicação está disponível diretamente no navegador:  
👉 **https://cleitongfacanha-wq.github.io/continuar/**

---

## Estrutura de Módulos

### 1. Triagem e Histórico Ocupacional
- **Anamnese Digital** (`anamnese.html` / `anamnese_hgcr.html`): Mapeamento biopsicossocial, setor, turno (Manhã, Tarde, Noite, Plantão 12x36), queixas álgicas e histórico osteomuscular.

### 2. Escalas Clínicas e Instrumentos de Campo (Coleta Cega)
Instrumentos validados para mensuração funcional, sem retorno de pontuação ao servidor:
- **QNSO** (`qnso_digital_projeto_continuar.html`): Questionário Nórdico de Sintomas Osteomusculares.
- **QuickDASH** (`dash_hgcr.html`): Disfunções musculoesqueléticas de MMSS.
- **Oswestry** (`oswestry_hgcr.html`): Índice de incapacidade da coluna lombar.
- **Roland-Morris** (`roland_morris_hgcr.html`): Avaliação funcional de lombalgia.
- **LEFS** (`lefs_hgcr.html`): Escala funcional de extremidades inferiores (MMII).
- **Corlett & Manenica** (`corlett_hgcr.html`): Diagrama de desconforto postural situacional.
- **REBA** (`reba_hgcr.html`): Rapid Entire Body Assessment para sobrecarga biomecânica.
- **ICT / WAI** (`ict_hgcr.html`): Índice de Capacidade para o Trabalho.
- **NASA-TLX** (`nasa_tlx_hgcr.html`): Carga de trabalho mental e fatores cognitivos.

### 3. Gestão e Vigilância
- **Painel Gestor UDSO** (`painel_gestor_udso.html`): Estratificação de risco biomecânico, correlação setorial, indicadores e suporte pericial.
- **Orientações e Autocuidado** (`orientacoes.html`): Diretrizes ergonômicas para postos sentados, ortostatismo e manuseio de pacientes.
- **Grade de Intervenções** (`agendamentos.html`): Planejamento setorial reservado para coordenações.

---

## Configuração do GitHub Pages

1. Acesse o repositório no GitHub: `Settings` > `Pages`.
2. Em **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / `(root)`
3. Clique em **Save**. O endereço publicado será `https://cleitongfacanha-wq.github.io/continuar/`.
