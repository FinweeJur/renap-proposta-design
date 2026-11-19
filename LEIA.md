# Apresentação — novo site da RENAP

Página única, sem build, sem instalação. **24 telas** para apresentar o briefing
à Articulação Nacional em linguagem simples.

- Conteúdo: `Briefing-novo-site-RENAP.docx`, de 19/11/2026.
- Autoria da proposta: **GT de Comunicação da RENAP**.
- Base visual: [design system do Controle Popular](https://github.com/FinweeJur/controle-popular-design) (MIT), com a marca RENAP por cima.

## Abrir

Clique duas vezes em `index.html`. Ou, nesta pasta:

```
python -m http.server 4323
```

e abra <http://127.0.0.1:4323>.

## Andar

| Ação | Como |
|---|---|
| Próxima / anterior | setas `←` `→`, espaço, `PageUp`/`PageDown` |
| Início / fim | botões `⏮` `⏭`, ou `Home` / `End` |
| No celular | deslize o dedo na horizontal |
| Ir direto a uma tela | `#12` no fim do endereço |
| Vira PDF | `Ctrl`+`P` → salvar como PDF |

O tema escolhido fica guardado no navegador.

## As 24 telas

1 capa · 2 o que queremos · 3 a cara · 4 verba · 5 fase 1 · 6 migração ·
7 documentos · 8 cadastro · 9 temas · 10 sigilo · 11 pedidos a orçar ·
12 API · 13 proteções · 14 voz e robô · 15 código aberto · 16 como avaliar ·
17 cinco decisões · 18 glossário · 19 fechamento

**Anexos** (20 a 24): efeitos · sanfona · busca, robô e rádio · fontes ·
hospedagem e domínio.

## O que é de quem

| Peça | Origem | Licença |
|---|---|---|
| `temas/temas.css`, `temas/temas.json` | Controle Popular | MIT |
| `fontes/fontshare.css` | Controle Popular | MIT |
| `componentes/select.css` | Controle Popular | MIT |
| `componentes/sanfona.css` | Controle Popular, tokens trocados | MIT |
| `componentes/shell.css` + `shell.js` | Controle Popular (robô, tabela) | MIT |
| `efeitos/efeitos.css` + `magnet.js` | Controle Popular (pulso, brilho, ímã) | MIT |
| `temas/renap.css` | marca RENAP (vermelho) | MIT |
| `assets/logo-renap-*.png` | logo oficial da RENAP | uso da RENAP |
| textos | briefing da RENAP | RENAP |

Código sob MIT. Ver [LICENSE](LICENSE).

## Pastas

```
index.html                 o deck inteiro (HTML + CSS + JS)
assets/                    logo em duas cores, com fundo transparente
temas/                     tokens dos 8 temas + camada de marca da RENAP
fontes/                    Clash Display + General Sans (Fontshare)
componentes/               sanfona, select, casca e robô
efeitos/                   pulso, brilho, ímã, contador
docs/DESIGN.md             o design system desta apresentação
docs/COMO-EDITAR.md        trocar texto, criar tela, gerar PDF
docs/medir-contraste.py    mede os 8 temas e diz onde falha
docs/preparar-logo.py      refaz o logo transparente a partir do original
```

## Sobre os preços do anexo E

Consultados em **19/11/2026**, em semana de promoção de Black Friday.
Fonte de cada linha: Guara Cloud (`guaracloud.com`), KingHost, HostGator,
Hostinger e Wix — preço de tabela e promoção mudam; confira antes de contratar.

O valor de renovação do domínio `renap.org.br` **não foi publicado de forma
legível** pelo Registro.br na data. Confirme no painel da conta e atualize a
tabela; não invente número.
