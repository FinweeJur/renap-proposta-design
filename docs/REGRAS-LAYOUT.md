# Regras de layout, respiro e janelas pequenas

> Vale para esta apresentação e para qualquer página feita a partir dela.
> Escrito em 20/11/2026, a pedido do dono, depois de o player de rádio estourar
> em uma janela de metade da tela.

## 1. Nada encosta em nada

| Onde | Mínimo |
|---|---|
| Entre cartões | 12 px (`--e3`) |
| Entre prints de referência | 12 px |
| Entre blocos do player e a lista | 12 px |
| Do conteúdo até a borda da tela | 20 px (`--e4`) |
| Do conteúdo até a barra do topo | 12 px, além da altura da barra |
| Do conteúdo até o rodapé | 18 px, além da altura do rodapé |

Regra prática: se dois elementos têm borda, a distância entre bordas **nunca**
é menor que 12 px. Respiro maior é escolha; menor que isso é erro.

## 2. A janela manda, não o dispositivo

O layout testa **largura e altura**, não o nome do aparelho.

| Largura | O que muda |
|---|---|
| até 560 px | uma coluna, rótulos de botão encurtados |
| 560 a 759 px | duas colunas onde couber, sem texto abaixo de 12 px |
| 760 a 1099 px | três colunas nas referências, duas nos cartões |
| 1100 px ou mais | quatro colunas nas referências |

| Altura | O que muda |
|---|---|
| até 660 px | respiro de cima encurtado, listas com limite menor, print em 16:9 |
| até 520 px | o mesmo, e a lista do rádio cai para 180 px |

Metade da tela no computador costuma dar ~700×500. É o caso que mais quebra:
por isso o player vira **uma coluna** abaixo de 900 px de largura.

## 3. Texto e imagem se adaptam, não o contrário

- Tudo em `clamp`, com piso de 12 px e teto definido.
- Imagem sempre com `max-width: 100%` e `aspect-ratio` fixo: a caixa não pula
  quando a imagem carrega.
- Texto longo quebra com `overflow-wrap: anywhere` dentro de cartão e lista.
- Nunca reduzir a fonte para caber: encurtar o texto ou reduzir o respiro.

## 4. Nada fica embaixo do menu

- A tela reserva a altura do rodapé no `padding-bottom`.
- A rolagem acontece **dentro** da tela, nunca na página.
- Rolagem lateral é proibida: se aparecer, é bug.

## 5. Como medir

```
npx playwright ...  # ou, no navegador, este trecho no console:
document.querySelectorAll('.tela').forEach(t => t.scrollWidth > t.clientWidth && console.warn(t))
```

Checklist rápido, em cada largura:

1. `document.documentElement.scrollWidth === clientWidth` (sem rolagem lateral).
2. Nenhum texto abaixo de 12 px.
3. Nenhum card com menos de 12 px do vizinho.
4. O último elemento da tela visível acima do rodapé.
5. Com a janela em 700×500, o player do rádio em uma coluna e o botão de parar
   visível sem rolar.

## 6. Onde isso mora no CSS

Bloco **10. RESPIRO E JANELAS PEQUENAS**, antes das regras de impressão:
larguras mínimas com `minmax(0, 1fr)`, quebra de linha na barra do topo,
`padding-bottom` reservando o rodapé e as consultas por altura.

## 7. Poucos elementos pedem mais ar

Tela com quatro linhas não deve parecer rascunho encostado no topo.

| Situação | Respiro |
|---|---|
| Tela com 1 a 3 blocos | conteúdo centralizado na vertical, com no mínimo 72 px abaixo da barra |
| Título e resumo | 32 px entre um e outro |
| Entre linhas de lista | 20 px |
| Antes do rodapé da tela | 56 px |
| Entre cartões | 20 px |
| Antes das fichas (chips) | 32 px |

Regra de bolso: se sobra metade da tela vazia embaixo, o conteúdo está no lugar
errado — centralize. O texto não preenche espaço; o espaço é parte do desenho.
