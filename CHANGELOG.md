# Histórico de mudanças

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e versionamento [SemVer](https://semver.org/lang/pt-BR/).

## [Não publicado]

### Adicionado

- Uma foto de fundo por tela: 27 imagens, do encontro de novembro de 2026 na
  OAB Paraíba e do histórico da RENAP (2018 a 2025), cada tela com a sua.
- Tela "Fotos: o que a RENAP precisa enviar": movimentos sociais, histórico da
  RENAP, territórios, flora e fauna, cultura popular e referências brasileiras
  e latino-americanas das lutas.
- Sumário na tela 2: sete blocos numerados, cada um levando à primeira tela.
- Dicas nos links e botões, dizendo o destino do clique.

### Alterado

- Cinco fusões: sigilo + proteções; funções + API; acervo + movimentos;
  cinco decisões + fechamento; catálogo + laboratório. De 32 para 27 telas.
- Foto inteira (contain), com camada desfocada atrás, sem cortar gente.
- Foto mais apagada e a cor do tema mais predominante.
- Cartões do tamanho do texto, com respiro menor entre título, lista e cartão.
- Fundo carregado só na tela aberta e nas vizinhas, para não baixar 6 MB de uma vez.

## [1.0.0] — 2026-11-20

Primeira versão completa e publicada.

### Adicionado

- Deck em 27 telas, página única, sem build.
- Nove temas de cor, incluindo o tema Brasil (verde e amarelo).
- Player de rádio com 52 estações públicas do Controle Popular, filtro por
  região, volume, botão de parar e HLS sob demanda.
- Proposta de página inicial (`proposta-home.html`) com navbar, biblioteca com
  filtros, banco de peças, notícias, encontros e rodapé.
- Laboratório com seis efeitos e dez efeitos de cursor.
- Telas de memória e cultura (encontros, cartas políticas, documentários,
  poesia) e de teorias críticas do direito.
- Calendário e mística do dia, com as fontes do Controle Popular.
- Fotos de fundo em todas as telas, com brilho baixo e véu do tema.
- Setas grandes nas laterais, teclado, deslize e botões de rolagem.
- Links em azul sublinhado; imagens de referência clicáveis.

### Corrigido

- Contador e barra do anexo A, que não animavam.
- Troca de estação de rádio, que deixava dois áudios tocando.
- Conteúdo cortado em janela baixa (flex encolhendo o miolo).
- Grid Motion parado, por mover exatamente um tile do padrão.
- Frase repetida na tela 2 e contagem de telas desatualizada.
- Logo escura sobre tema escuro no Brasil.

### Segurança

- Todo `target="_blank"` com `rel="noopener"`.
- Emojis com `aria-hidden`; `inert` nas telas fora de cena.

## [0.1.0] — 2026-11-19

### Adicionado

- Primeira montagem do deck, com o design system do Controle Popular.
- Conteúdo inicial do briefing de 19/11/2026.
