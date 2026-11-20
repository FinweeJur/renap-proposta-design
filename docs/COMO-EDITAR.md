# Como editar

> 🌐 **Português** (este documento) · [English version ↓](#english-version)

## Trocar o texto de uma tela

Abra `index.html` e procure o comentário da tela:

```html
<!-- 11 · PEDIDOS A ORÇAR -->
<section class="tela" aria-label="Pedidos que gostaríamos de orçar">
```

Cada tela tem três partes:

| Parte | O que é | Classe |
|---|---|---|
| Olho | etiqueta pequena em cima | `olho` |
| Título | a frase grande | `titulo` (ou `titulo--longo`) |
| Corpo | resumo, lista, fichas, cartões | `resumo`, `linhas`, `fichas`, `cartoes` |

Regra de ouro: **uma ideia por tela, uma frase por linha.**
Se a lista passar de cinco itens, vire duas telas.

## Criar uma tela

Copie um `<section>` inteiro e cole no lugar certo. O contador, a barra de
progresso e os botões de início/fim se ajustam sozinhos.

```html
<section class="tela" aria-label="Assunto">
  <div class="miolo">
    <p class="olho sobe" style="--i:0">Assunto</p>
    <h2 class="titulo sobe" style="--i:1">Frase curta.</h2>
    <ul class="linhas sobe" style="--i:2">
      <li>Primeira linha.</li>
      <li>Segunda linha.</li>
    </ul>
    <p class="folha"><b>Como se confere:</b> o que a pessoa vê.</p>
  </div>
</section>
```

`--i` é a ordem da entrada: 0, 1, 2. Mais que três, o texto demora a aparecer.

## Mudar o tema padrão

No começo do arquivo: `<html lang="pt-BR" data-theme="light">`.
Valores: `light`, `dark`, `high-contrast`, `pequi`, `cerrado`,
`mata-atlantica`, `caatinga`, `pantanal`.

## Mudar a cor primária

Não escreva hexadecimal no CSS do `index.html`. Abra `temas/renap.css`, mude o
token do tema e **remeça**:

```
python docs/medir-contraste.py
```

Se aparecer `ABAIXO`, a cor nova reprovou em algum tema.

## Trocar ou acrescentar fonte

Na tela 23, cada botão tem `data-fonte` (nome da família no Fontshare) e
`data-css` (endereço do CSS). Para acrescentar outra:

1. copie um `div class="fonte-item"` inteiro;
2. troque o nome e o `data-css` pelo da fonte nova;
3. atualize o link de `abrir`.

O CSS da fonte só é baixado quando alguém toca no botão — a página nasce leve.

Fontes brasileiras: a lista da Plau é só link, porque a licença é paga.
Para trocar a fonte de verdade no site, licencie e auto-hospede o `.woff2`.

## Atualizar os preços do anexo E

A tabela está na tela 24. Ao refazer a consulta, mude **três coisas juntas**:
o preço, a data na legenda (`consulta feita em ...`) e a fonte no `LEIA.md`.

Promoção de hospedagem muda toda semana. Preço sem data é boato.

## Gerar PDF para enviar

`Ctrl`+`P` → destino "Salvar como PDF".
O CSS de impressão já deixa uma tela por página, fundo branco e sem as barras.

## Publicar

Só HTML e CSS: qualquer hospedagem estática serve (Cloudflare Pages, GitHub
Pages, Netlify). Não há build. No GitHub Pages: Settings → Pages → branch
`main` → pasta `/`.

## English version

**Summary.** To change a screen, find its `aria-label` in `index.html` and edit
the eyebrow, title and body. To add a screen, copy a whole `<section>` block; the
counter, progress bar and navigation adapt automatically. To change colours, edit
`temas/renap.css` and re-run the contrast meter. Fonts are tested live on the
typography screen; the CSS is fetched only when a font is chosen. Prices in the
cost annex must change together with the date in the caption and the source in
the README. `Ctrl`+`P` exports a PDF, one screen per page.
