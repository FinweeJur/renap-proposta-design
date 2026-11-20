# Apresentação — proposta do novo site da RENAP

> 🌐 **Português** (este documento) · [English version ↓](#english-version)

**Resumo.** Apresentação navegável, em página única, da proposta do novo site da
Rede Nacional de Advogados e Advogadas Populares (RENAP), feita pelo GT de
Comunicação. São 32 telas em português simples, com nove temas de cor, player
de rádio com 52 estações públicas, uma proposta de página inicial e um
laboratório de efeitos para teste.

[![HTML](https://img.shields.io/badge/HTML-%C3%BAnico-informational)](index.html)
[![Sem build](https://img.shields.io/badge/build-nenhum-success)](#como-abrir)
[![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-blue)](LICENSE)
[![Publicado](https://img.shields.io/badge/site-no%20ar-success)](https://finweejur.github.io/renap-proposta-design/)

**Palavras-chave:** RENAP, advocacia popular, proposta de site, acessibilidade,
design system, contraste WCAG, rádio pública, HLS, página única, GitHub Pages.

---

## Sumário

- [O que é](#o-que-é)
- [Como abrir](#como-abrir)
- [Como navegar](#como-navegar)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Documentação](#documentação)
- [Regras de qualidade](#regras-de-qualidade)
- [Acessibilidade](#acessibilidade)
- [Créditos e licença](#créditos-e-licença)
- [Como citar](#como-citar)

## O que é

Uma proposta, não o site final. O deck existe para a Articulação Nacional
decidir quatro pontos: o que a pessoa acha primeiro, quem publica, quem pode
descobrir documento restrito e se o site precisa funcionar em internet lenta.

Conteúdo: `Briefing-novo-site-RENAP.docx`, versão de 19/11/2026.
Base visual: [design system do Controle Popular](https://github.com/FinweeJur/controle-popular-design)
(MIT), com a marca RENAP por cima.

## Como abrir

Clique duas vezes em `index.html`. Ou, nesta pasta:

```bash
python -m http.server 4323
```

e abra <http://127.0.0.1:4323>.

Não há build, dependência instalada nem framework. Tudo é HTML, CSS e
JavaScript puro.

**No ar:** <https://finweejur.github.io/renap-proposta-design/>

## Como navegar

| Ação | Como |
|---|---|
| Próxima / anterior | setas grandes nas laterais, `←` `→`, espaço |
| Primeira / última | `Home` / `End`, ou os botões `⏮` `⏭` |
| No celular | deslize o dedo na horizontal |
| Tela específica | `#12` no fim do endereço |
| PDF | `Ctrl`+`P` — uma tela por página |
| Texto que não cabe | botões `↑` `↓` na lateral direita |

## Estrutura do repositório

```text
index.html                 o deck inteiro (32 telas, HTML + CSS + JS)
proposta-home.html         demonstração da página inicial
assets/                    logo em duas cores, fotos de fundo e prints de referência
assets/fundo/              três fotos usadas como fundo
assets/ref/                15 prints dos portais de referência
temas/                     tokens dos nove temas + camada de marca da RENAP
componentes/               sanfona, select, casca e robô (do design system)
efeitos/                   pulso, brilho, ímã e contador
fontes/                    Clash Display + General Sans (Fontshare)
docs/                      documentação técnica e scripts de apoio
```

## Documentação

| Documento | Para quê |
|---|---|
| [docs/DESIGN.md](docs/DESIGN.md) | direção de arte, tokens, tipografia, movimento e contraste medido |
| [docs/REGRAS-LAYOUT.md](docs/REGRAS-LAYOUT.md) | respiro, janelas pequenas e checklist de medição |
| [docs/COMO-EDITAR.md](docs/COMO-EDITAR.md) | trocar texto, criar tela, mudar cor, gerar PDF |
| [docs/revisao-s5.md](docs/revisao-s5.md) | como a tela 2 foi revisada pelo modelo S5, com custo |
| [AGENTS.md](AGENTS.md) | regras para agentes de IA que trabalharem aqui |
| [CONTRIBUTING.md](CONTRIBUTING.md) | como propor mudança, padrão de commit e revisão |
| [CHANGELOG.md](CHANGELOG.md) | histórico de mudanças no formato Keep a Changelog |

## Regras de qualidade

1. **Contraste medido**, nunca estimado: texto ≥ 4,5:1; texto grande ≥ 3:1.
   Rode `python docs/medir-contraste.py` — precisa dar **0 falhas**.
2. **Celular é a régua**: 390 px, sem rolagem lateral.
3. **Respiro mínimo**: 12 px entre cards; 20 px entre linhas de lista.
4. **Texto de interface ≥ 12 px**; alvo de toque ≥ 44 px.
5. **Cor nunca é o único sinal** de estado.
6. **Movimento é escolha**: tudo para em `prefers-reduced-motion`.
7. **Número com fonte**: preço, data e dado publicado têm link e data.

## Acessibilidade

- Marcação semântica, `aria-label` em navegação e botões.
- Emojis sempre com `aria-hidden`: o leitor de tela lê o texto, não o enfeite.
- `inert` nas telas fora de cena: o `Tab` não entra no que não está visível.
- Foco visível com `--cp-focus` em todos os controles.
- Leitura em voz pelo próprio navegador (Web Speech).

## Créditos e licença

| Peça | Origem | Licença |
|---|---|---|
| `temas/`, `fontes/`, `componentes/`, `efeitos/` | Controle Popular | MIT |
| `temas/renap.css`, `index.html`, `proposta-home.html` | este repositório | MIT |
| Logo | RENAP | uso da RENAP |
| Textos | briefing da RENAP | RENAP |

Código sob [MIT](LICENSE). Ver também [CITATION.cff](CITATION.cff).

## Como citar

```bibtex
@misc{renap_proposta_design_2026,
  title  = {Apresentação da proposta do novo site da RENAP},
  author = {{GT de Comunicação da RENAP}},
  year   = {2026},
  note   = {32 telas, HTML único},
  url    = {https://github.com/FinweeJur/renap-proposta-design}
}
```

## English version

**Summary.** A single-page, navigable presentation of the proposal for the new
website of RENAP (National Network of Popular Lawyers), produced by the RENAP
Communication Working Group. It has 32 screens in plain Portuguese, nine colour
themes, a radio player with 52 public stations, a homepage proposal and an
effects lab for testing.

**Keywords:** RENAP, popular legal aid, website proposal, accessibility, design
system, WCAG contrast, public radio, HLS, single page, GitHub Pages.

### Contents

- [What it is](#what-it-is)
- [How to open](#how-to-open)
- [How to navigate](#how-to-navigate)
- [Repository layout](#repository-layout)
- [Documentation](#documentation)
- [Quality rules](#quality-rules)
- [Accessibility](#accessibility)
- [Credits and licence](#credits-and-licence)

### What it is

A proposal, not the final website. The deck exists so the National Articulation
can decide four points: what people find first, who publishes, who may discover
restricted documents, and whether the site must work on slow connections.

Content: `Briefing-novo-site-RENAP.docx`, version of 19 November 2026.
Visual base: [Controle Popular design system](https://github.com/FinweeJur/controle-popular-design)
(MIT), with the RENAP brand on top.

### How to open

Double-click `index.html`, or run:

```bash
python -m http.server 4323
```

and open <http://127.0.0.1:4323>. No build, no framework, no installed
dependency: plain HTML, CSS and JavaScript.

**Live:** <https://finweejur.github.io/renap-proposta-design/>

### How to navigate

| Action | How |
|---|---|
| Next / previous | large side arrows, `←` `→`, space |
| First / last | `Home` / `End`, or the `⏮` `⏭` buttons |
| On a phone | swipe horizontally |
| Specific screen | `#12` at the end of the address |
| PDF | `Ctrl`+`P`, one screen per page |
| Long content | `↑` `↓` buttons on the right |

### Repository layout

```text
index.html                 the whole deck (32 screens)
proposta-home.html         homepage demonstration
assets/                    logos, background photos, reference prints
temas/                     tokens for the nine themes plus the RENAP brand layer
componentes/               accordion, select, shell and robot widgets
efeitos/                   pulse, glow, magnet and counter
fontes/                    Clash Display + General Sans (Fontshare)
docs/                      technical documentation and helper scripts
```

### Documentation

| Document | Purpose |
|---|---|
| [docs/DESIGN.md](docs/DESIGN.md) | art direction, tokens, type, motion, measured contrast |
| [docs/REGRAS-LAYOUT.md](docs/REGRAS-LAYOUT.md) | spacing, small windows, measurement checklist |
| [docs/COMO-EDITAR.md](docs/COMO-EDITAR.md) | change text, add a screen, change a colour, export PDF |
| [AGENTS.md](AGENTS.md) | rules for AI agents working here |
| [CONTRIBUTING.md](CONTRIBUTING.md) | how to propose a change and commit style |
| [CHANGELOG.md](CHANGELOG.md) | change history, Keep a Changelog format |

### Quality rules

1. **Measured contrast**, never estimated: text ≥ 4.5:1; large text ≥ 3:1.
   Run `python docs/medir-contraste.py` — it must report **0 failures**.
2. **The phone is the ruler**: 390 px, no horizontal scroll.
3. **Minimum spacing**: 12 px between cards; 20 px between list lines.
4. **Interface text ≥ 12 px**; touch target ≥ 44 px.
5. **Colour is never the only signal** of state.
6. **Motion is a choice**: everything stops under `prefers-reduced-motion`.
7. **Numbers need a source**: every published price and date carries a link.

### Accessibility

Semantic markup, `aria-label` on navigation and buttons, emojis always
`aria-hidden`, `inert` on off-screen slides so `Tab` does not reach them, visible
focus ring on every control, and browser speech reading.

### Credits and licence

Theme tokens, fonts, components and effects come from the Controle Popular
design system (MIT). Deck code is MIT (see [LICENSE](LICENSE)). The logo belongs
to RENAP; the texts come from the RENAP briefing.

### How to cite

```bibtex
@misc{renap_proposta_design_2026,
  title  = {Apresentação da proposta do novo site da RENAP},
  author = {{GT de Comunicação da RENAP}},
  year   = {2026},
  url    = {https://github.com/FinweeJur/renap-proposta-design}
}
```
