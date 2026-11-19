# Como editar

## Trocar o texto de uma tela

Abra `index.html`, procure o comentário da tela:

```html
<!-- 7 · DOCUMENTOS E MÍDIA -->
<section class="tela" aria-label="Documentos e mídia">
```

Cada tela tem três partes:

| Parte | O que é | Classe |
|---|---|---|
| Olho | etiqueta pequena em cima | `olho` |
| Título | a frase grande | `titulo` |
| Corpo | resumo, lista ou fichas | `resumo`, `linhas`, `fichas` |

Regra de ouro: **uma ideia por tela, uma frase por linha.**
Se a lista passar de cinco itens, vire duas telas.

## Criar uma tela

Copie um bloco `<section>` inteiro e cole no lugar certo. Depois ajuste o
número do comentário. O contador e a barra de progresso se ajustam sozinhos —
o JavaScript lê quantas telas existem.

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

## Apagar uma tela

Apague o `<section>` inteiro, do `<section` ao `</section>`.
Atualize o número nos comentários, se quiser manter a ordem bonita.

## Mudar o tema padrão

No começo do arquivo:

```html
<html lang="pt-BR" data-theme="light">
```

Valores: `light`, `dark`, `high-contrast`, `pequi`, `cerrado`,
`mata-atlantica`, `caatinga`, `pantanal`.

## Mudar uma cor

Não escreva hexadecimal no meio do CSS. Abra `temas/temas.css` e mude o token
do tema. Depois **remeça**:

```
python docs/medir-contraste.py
```

Se aparecer `ABAIXO`, a cor nova reprovou. Volte uma casa.

## Gerar PDF para enviar

`Ctrl`+`P` no navegador → destino "Salvar como PDF".
O CSS de impressão já deixa uma tela por página, fundo branco e sem a barra.

## Publicar

O site é só um HTML e três CSS. Qualquer hospedagem estática serve:
GitHub Pages, Cloudflare Pages, Netlify. Não há build.

No GitHub Pages, o caminho é: Settings → Pages → branch `main` → pasta `/`.
