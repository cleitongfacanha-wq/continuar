# Plataforma Continuar — Monitoramento Ergonômico Preventivo e Manejo de LER/DORT no HGCR
**"Seu Corpo Foi Feito para se Mover. Nós Ajudamos Você a Continuar."**
**Proposta Técnica para a Coordenação da UDSO • Hospital Governador Celso Ramos**

- **Responsável Técnico:** Dr. Cleiton Gomes Façanha • Fisioterapeuta do Trabalho • CREFITO-10: 265.366-F
- **Unidade:** Unidade de Desempenho em Saúde Ocupacional (UDSO / HGCR)
- **Modalidade:** Projeto Piloto de Intervenção Preventiva (Custo Zero / Sem interferência na rotina assistencial)

---

## 1. Respostas Objetivas aos 3 Receios Imediatos da Gestão

| Dúvida da Gestão | Resposta Direta e Prática |
|---|---|
| **"Vai atrapalhar a escala ou tirar o servidor do posto?"** | **Não.** O preenchimento diário do mapa anatômico leva menos de 60 segundos. Pode ser feito no celular do servidor ou no computador do posto de enfermagem/triagem. |
| **"Vai gerar custos ou depender da TI da SES-SC?"** | **Custo financeiro zero.** O piloto opera 100% em nuvem via navegador web (PWA). Não requer instalação de programas nos computadores do Estado nem suporte técnico da SES-SC nesta fase. |
| **"E o sigilo dos prontuários e a LGPD?"** | **Sigilo total garantido.** O painel de gestão exibe apenas dados epidemiológicos agregados por setor (ex: "65% dos técnicos do Centro Cirúrgico relatam lombalgia"). Nomes, matrículas e queixas individuais permanecem sob sigilo ético do prontuário fisioterapêutico. |

---

## 2. O Gargalo Real da UDSO e a Solução Proposta

Atualmente, a UDSO atua predominantemente de forma reativa. O servidor procura o setor quando a crise aguda de dor musculoesquelética já se instalou ou após a emissão de atestado médico com CID osteomuscular (M54, M75, M65). Isso gera desfalques imediatos nas escalas de plantão e sobrecarga nas equipes assistenciais.

A Análise Ergonômica do Trabalho (AET) anual é um laudo estático. Não acompanha as oscilações de sobrecarga física que ocorrem semana a semana nos plantões de UTI, CME e Emergência.


### Inovações Estratégicas Incorporadas:
1. **Calculadora de ROI do Absenteísmo:** Estimativa direta de economia (R$ 350 a R$ 500/dia evitado de afastamento, gerando mais de R$ 42.000 de economia anual por setor piloto).
2. **Critério Científico MCID:** Mensuração de melhora clínica real nas escalas EVA (>= 2 pts), QuickDASH (>= 11 pts), Roland-Morris (>= 4 pts), LEFS (>= 9 pts) e Oswestry (>= 10 pts).
3. **Interoperabilidade RNDS / JSON Estruturado:** Exportação com codificação CIF (OMS) e CID-10 para comunicação com sistemas da SES-SC.
4. **Acessibilidade Digital (e-MAG / WCAG 2.1):** Controle de fonte, alto contraste e ditado de voz assistivo para LER/DORT em MMSS.

### O Que a Ferramenta Entrega na Prática:
1. **Triagem Ativa Contínua:** Coleta diária geolocalizada no corpo (mapa em SVG frente/costas, escala EVA de 0 a 10 e ditado de voz de 15 segundos).
2. **Estratificação por Escalas Validadas:** Aplicação automatizada de questionários oficiais (QuickDASH para MMSS, Roland-Morris e Oswestry para coluna lombar, LEFS para MMII e matriz nórdica QNSO).
3. **Alerta Precoce para o SESMT:** Sinalização automática quando um servidor pontua dores persistentes por mais de 5 dias seguidos, permitindo convocação preventiva antes do afastamento.
4. **Prescrição Imediata de Pausas:** O servidor recebe micro-pausas da NR-17 específicas para o segmento doloroso no próprio posto.

---

## 3. Reabilitação Funcional vs. Adaptação e Readaptação do Posto

A plataforma resolve dois problemas críticos que a Direção do hospital cobra rotineiramente da coordenação:

```
                  ┌───────────────────────────────────────────────────────────┐
                  │                 Vigilância Ergonômica                     │
                  └─────────────────────────────┬─────────────────────────────┘
                                                │
                 ┌──────────────────────────────┴──────────────────────────────┐
                 ▼                                                             ▼
   [ Reabilitação Funcional ]                                   [ Adaptação e Readaptação ]
   • Foco clínico-terapêutico.                                  • Foco ergonômico e pericial.
   • Recupera ADM, força e alívio da dor.                       • Adaptação: Ajuste de bancadas/leitos (NR-17).
   • Acompanha queda na EVA e melhora nos escores.              • Readaptação (Lei 6.745/85): Mapeia postos
   • Dá critério numérico para alta funcional.                    compatíveis e fundamenta laudo da SES-SC.
```

- **Reabilitação Funcional (Âmbito Clínico):** Mede a evolução da recuperação com índices numéricos auditáveis. O fisioterapeuta acompanha a resposta tecidual às micro-pausas e cinesioterapia com base em evidências.
- **Adaptação e Readaptação Funcional (Âmbito Ergonômico e Pericial):** Identifica se o problema é do posto ou do servidor. Se vários técnicos da UTI queixam-se da lombar na mesma tarefa, a intervenção é na ergonomia do mobiliário (NR-17). Se apenas um servidor apresenta incapacidade crônica sem melhora, a ferramenta documenta todo o histórico de tentativas de manejo interno, fornecendo embasamento técnico robusto para a perícia médica da SES-SC e indicando postos hospitalares compatíveis com a capacidade residual do servidor.

---

## 4. Roteiro Sugerido para a Apresentação (20 a 30 Minutos)

1. **Bloco 1 (5 min) — O Problema da Rotina:** Apresentar a taxa de afastamentos osteomusculares do hospital e a dificuldade de atuar antes do atestado médico.
2. **Bloco 2 (7 min) — Demonstração Prática no Celular:** Mostrar a rapidez do preenchimento da queixa no boneco anatômico e o cálculo imediato da escala de incapacidade.
3. **Bloco 3 (7 min) — O Painel Gestor da Coordenação:** Abrir no navegador do computador o mapa de calor setorial, as curvas de dor e os alertas de queixas contínuas.
4. **Bloco 4 (5 min) — O Pedido Concreto (Piloto Controlado):** Propor a implantação em escala piloto restrita.

---

## 5. Proposta do Piloto Controlado

- **Setores Sugeridos:** Centro Cirúrgico e UTI Adulto (alta demanda biomecânica e queixas frequentes).
- **Amostra:** 30 a 50 servidores voluntários.
- **Duração:** 60 a 90 dias.
- **Metas de Avaliação:**
  - Medir a taxa de adesão voluntária dos servidores.
  - Avaliar a redução média na escala de dor (EVA) antes e após os ciclos de cinesioterapia e micro-pausas.
  - Reduzir a incidência de afastamentos curtos por dor osteomuscular nos setores participantes.

---

## 6. Próximo Encaminhamento Institucional
Com a concordância da Coordenação da UDSO:
1. Emissão de despacho favorável no processo SGPE.
2. Encaminhamento conjunto da pasta ao **Núcleo de Educação Permanente e Pesquisa (NEP)** e à Diretoria Geral do HGCR para homologação da Carta de Anuência.
