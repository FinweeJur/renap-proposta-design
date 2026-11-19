# Design system da apresentação

> Se um número aparecer aqui, ele foi medido. Rodar: `python docs/medir-contraste.py`.

## 1. Direção de arte

**Editorial cívico.** Parece ata de reunião, não anúncio de software.

| Elemento | Escolha | Por quê |
|---|---|---|
| Título | Clash Display | geométrica, aguenta corpo grande |
| Corpo | General Sans | leitura confortável em 1,5 |
| Primária | vermelho da RENAP | a marca manda; o tom muda por fundo |
| Acento | cor do bioma | território, não enfeite |
| Raia esquerda | 4 faixas de 10 px | dá território sem pesar |
| Logo | canto em todas as telas, grande na capa | reconhecimento imediato |

**Âncora:** a apresentação demonstra o que promete — troca de tema, sanfona,
busca, robô e rádio funcionam de verdade (anexos A a C).

## 2. Marca RENAP sobre o design system

O design system manda trocar o **valor** do token, nunca o nome. É o que
`temas/renap.css` faz, e só com `--cp-primary`, `--cp-primary-ink` e `--cp-focus`:

| Fundo | Primária | Tinta sobre ela | Por quê |
|---|---|---|---|
| claro | `#b00020` | `#ffffff` | 7,33:1 |
| escuro e biomas | `#f2666a` | `#1a0505` | 5,02:1 |
| alto contraste | `#990000` | `#ffffff` | 8,92:1 |

O vermelho escuro reprovava no fundo escuro (4,36:1). Por isso o tom claro
nos temas escuros — medido, não escolhido no olho.

## 3. Tipografia

Tudo em `clamp`, celular primeiro, piso de **12 px**.

| Papel | Tamanho |
|---|---|
| Capa | `clamp(2rem, 6.6vw, 4rem)` |
| Título de tela | `clamp(1.45rem, 4.2vw, 2.4rem)` |
| Título longo (tela 11) | `clamp(1.25rem, 3.5vw, 1.9rem)` |
| Corpo | `clamp(1rem, 2.3vw, 1.14rem)` |
| Menor texto aceito | `.75rem` = 12 px |

Troca de fonte ao vivo na tela 23: botão carrega o CSS do Fontshare só quando
tocado e reescreve `--font-display`. Seis opções gratuitas; a lista brasileira
(Plau) é só link, porque a licença é paga.

## 4. Movimento

Personagem **corporativo premium**: entra rápido, assenta sem quique.

| Uso | Duração | Curva |
|---|---|---|
| Troca de tela | 420 ms | `cubic-bezier(.2, 0, 0, 1)` |
| Entrada de conteúdo | 420 ms, 70 ms entre itens | a mesma |
| Hover, pulso, ímã | 160–320 ms | do design system |

Regras: no máximo três elementos se movem juntos; nada atravessa a tela;
`prefers-reduced-motion` zera tudo; movimento nunca é o único sinal.

## 5. Contraste medido (19/11/2026)

| Tema | Texto | Suave | Botão | Situação |
|---|---|---|---|---|
| Claro | 16,9 | 7,1 | 7,3 | ok |
| Escuro | 15,5 | 8,3 | 5,0 | ok |
| Alto contraste | 21,0 | 21,0 | 8,9 | ok |
| Pequi | 17,4 | 10,7 | 5,0 | ok |
| Cerrado | 15,1 | 8,2 | 5,0 | ok |
| Mata Atlântica | 16,3 | 10,0 | 5,0 | ok |
| Caatinga | 16,3 | 9,6 | 5,0 | ok |
| Pantanal | 16,4 | 10,4 | 5,0 | ok |

Uma falha conhecida e assumida: o acento do Cerrado (`#3a6b35`) dá 2,94:1
sobre o fundo. É decorativo — o texto do olho é quem informa.

## 6. Componentes emprestados

| Peça | Onde aparece | Arquivo |
|---|---|---|
| Sanfona (`<details>`) | anexo B | `componentes/sanfona.css` |
| Pulso, brilho, ímã, contador | anexo A | `efeitos/` |
| Robô de conversa | anexo C | `componentes/shell.js` |
| Tabela | anexo E | `componentes/shell.css` |
| Select com respiro na seta | barra do topo | `componentes/select.css` |

O robô do design system nasce flutuante. Aqui ele entra na tela: a classe
`robo--tela` desfaz o `position: fixed`. É a única adaptação feita.

## 7. Checklist para tela nova

1. Cabe em 390 px sem rolagem lateral?
2. O olho tem texto, não só cor?
3. O texto mais fraco passa de 4,5:1 no tema claro e no escuro?
4. Funciona com `Tab`, `Enter` e `Escape`?
5. Alvo de toque com 36 px ou mais?
6. Sem `prefers-reduced-motion`, ainda faz sentido?
7. Com o zoom de 200%, o texto não é cortado?
