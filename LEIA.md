# Apresentação — novo site da RENAP

Página única, sem build, sem instalação. **27 telas** para apresentar o briefing
à Articulação Nacional em linguagem simples.

- Conteúdo: `Briefing-novo-site-RENAP.docx`, de 19/11/2026.
- Autoria da proposta: **GT de Comunicação da RENAP**.
- Base visual: [design system do Controle Popular](https://github.com/FinweeJur/controle-popular-design) (MIT), com a marca RENAP por cima.

## Publicado

- Site: https://finweejur.github.io/renap-proposta-design/
- Código: https://github.com/FinweeJur/renap-proposta-design
- Publicação: GitHub Pages, branch main, pasta /. Atualiza sozinho a cada push.

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

## As 28 telas

**Abertura (2 a 7):** quatro decisões da reunião · referências (duas telas, 15
prints) · o que os 12 portais têm em comum · decisão de estilo · ferramentas
gratuitas.

**Proposta (8 a 22):** o que o site reúne · verba · fase 1 · migração ·
documentos · cadastro · cores e temas · fontes · sigilo · funções possíveis ·
chave de edição (API) · proteções · acessibilidade comunicacional · cinco
decisões · glossário · próximos passos.

**Anexos (23 a 28):** efeitos · sanfona · busca, robô e rádio · hospedagem ·
proposta de home (com os requisitos que ela cumpre).

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
proposta-home.html         demonstração da página inicial (navbar, biblioteca, rodapé)
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

## Sobre os prints de referência

As legendas descrevem o que a **página inteira** mostra: seções, menu,
busca, número de imagens e de palavras. Não são opinião sobre o site.

O Coletivo Margarida Alves ficou fora: o navegador bloqueou o site por
certificado. O Observatório de Protocolos não tinha site próprio localizável
em 19/11/2026.

## Como o texto da tela 2 foi revisado

O texto passou pelo modelo S5 da Maritaca, com raciocínio ligado
(`reasoning_effort: medium`) e teto de 9.000 tokens. Custo da chamada: menos de
R$ 0,05. O raciocínio consome o mesmo teto do texto — com 3.200 tokens o modelo
pensou tudo e devolveu vazio. O roteiro está em `docs/revisao-s5.md`.
