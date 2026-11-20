# Plano — ETL e reformulação do site Assessoria Jurídica Popular

> **Resumo em uma frase:** trazer as 790 publicações do blog
> `assessoriajuridicapopular.blogspot.com` para o portal, com citação direta,
> crédito, link canônico e botão para o original e para o autor — começando
> pela página “O que é assessoria jurídica popular?”.
>
> **Medição:** 17/11/2026, com User-Agent `finweejur/github artur colito`,
> depois de ler `robots.txt` (permite leitura, bloqueia `/search` e
> `/share-widget`) e o feed Atom.

---

## 1. O que a fonte é, em números medidos

| Item | Medido |
|---|---|
| Blog | `assessoriajuridicapopular.blogspot.com` (Blogger, template Simple) |
| Posts declarados no feed | **790** |
| Posts que o feed entrega por chamada | 100 (paginação por `start-index`) |
| Anos no recorte do feed | 2015 a 2024 (a página-alvo é de **2009**) |
| Autores no recorte | Luiz Otávio Ribas (46), Unknown (17), AdminblogueAJpopular (11), Ricardo Prestes Pazello (10), Diego A. Diehl (5), Tchenna Maso (5), Assis Oliveira (3), Ana Lia Almeida (1) |
| `robots.txt` | `Allow: /`, `Disallow: /search` e `/share-widget` |
| Sitemap e feed | existem (`/sitemap.xml`, `/feeds/posts/default`) |
| Licença declarada | **não há** — decisão jurídica antes da carga (seção 3) |

### A página-alvo

| Campo | Valor |
|---|---|
| Título | O que é assessoria jurídica popular? |
| Data | domingo, 16 de agosto de 2009 |
| Autor | Luiz Otávio Ribas |
| URL canônica | `https://assessoriajuridicapopular.blogspot.com/2009/08/o-que-e-assessoria-juridica-popular.html` |
| Corpo | 5.646 caracteres, **9 blocos** |
| Links no corpo | **0** |
| Imagens no corpo | 1 (`cartaz.bmp`, hospedada no `blogger.googleusercontent.com`) |
| Rabicho do Blogger | “Mapeamento” e “Colunistas” — **não são conteúdo**, são gadgets |

Os nove blocos, na ordem:

1. Abertura (“O nome desse blog está te parecendo estranho?”)
2. Convite ao comentário
3. Aviso de linguagem formal
4. **Definição** de assessoria jurídica popular (bloco central)
5. Prática jurídica insurgente, décadas de 1960 até hoje
6. Juristas leigos e promotoras legais populares
7. Legenda do cartaz
8. Nova cultura jurídico-social
9. Pergunta “Como formar uma assessoria jurídica popular universitária?”

---

## 2. Princípios que valem para todo o ETL

1. **Nada de texto sem dono.** Cada bloco carrega autor, data, URL, data de
   captura e hash do HTML original.
2. **Citação direta, não paráfrase.** O texto entra como está, entre aspas de
   bloco, com atribuição visível.
3. **Link canônico sempre.** O leitor chega ao original em um clique.
4. **Botão duplo:** “Ler no blog original” e “Sobre Luiz Otávio Ribas”.
5. **Idempotência.** Rodar duas vezes não duplica nem reescreve o que não mudou
   (`post-id` + `updated` + hash do corpo).
6. **Ritmo educado.** 1 a 2 segundos por requisição, cache local, checkpoint,
   nenhuma coleta dentro de CI.
7. **Sem dado pessoal de terceiro.** Comentários não entram; nome de
   comentarista não é publicado.
8. **Revisão humana antes de publicar.** O robô sugere tema e resumo; quem
   assina o acervo decide.

---

## 3. Decisão jurídica (antes da primeira linha de código)

Reproduzir **todo** o conteúdo é cessão de direito, não citação. A Lei 9.610/98
permite citar trechos para estudo e crítica (art. 46, III), com indicação de
autor e origem — não copiar a obra inteira.

| Cenário | Caminho | Consequência |
|---|---|---|
| **A. Autor autoriza** (recomendado) | pedido por e-mail ao Luiz Otávio Ribas e ao blog, guardando a resposta em `docs/autorizacoes/` | publicação integral, com crédito e link |
| **B. Autor não responde** | citação de **até 30%** do texto, com link para o restante | página “trecho + convite a ler no original” |
| **C. Autor nega** | só resumo próprio, com link | nada de citação direta |

Regra de ouro: autorização escrita vale por escrito, com data, e pode ser
revogada. O campo `licenca` do registro guarda `autorizado`, `citacao` ou
`resumo`, e a página se adapta a ele.

---

## 4. Arquitetura do ETL

```
blog (Atom/HTML)
   │  extract        →  raw/  (HTML imutável, 1 arquivo por post)
   ▼
parser de blocos    →  staging/ (JSON por post, schema fixo)
   │  transform
   ▼
validação + revisão →  content/ (versionado no git)
   │  load
   ▼
build (página, índice, busca, PDF, sitemap)
```

### 4.1 Extract

Fonte primária: feed Atom, que já traz `id`, `published`, `updated`, autor,
título, conteúdo HTML e links.

```
GET /feeds/posts/default?alt=json&max-results=150&start-index=1
```

- Paginar até `openSearch$totalResults` (790 → 6 chamadas).
- Esperar 1,5 s entre chamadas; 3 tentativas com espera dobrada.
- Gravar `raw/<post-id>.html` **sem tocar** no conteúdo.
- Guardar `raw/_index.json` com data da coleta, ETag e contagem.
- Fallback: se o feed falhar, buscar o HTML da página do post.
- Nunca usar `/search` (proibido pelo `robots.txt`).

**Critério de saída:** 790 arquivos em `raw/`, `_index.json` com hash de cada
um, zero erro 4xx.

### 4.2 Transform

O parser converte HTML em **blocos tipados**. Nada de HTML cru na saída.

| Entrada no Blogger | Bloco de saída |
|---|---|
| `<h2>/<h3>` | `titulo` (nível 2) |
| `<p>` com texto | `paragrafo` |
| `<blockquote>` | `citacao` |
| `<ul>/<ol>` | `lista` |
| `<img>` | `imagem` (com `src` original, `alt`, crédito) |
| `<a>` | `link` interno ao bloco |
| `<iframe>` YouTube/Vimeo | `video` (id, título, duração) |
| `<div class="separator">` | contêiner de imagem — sobe o `img` |
| “Mapeamento”, “Colunistas”, “Postado por”, “Tecnologia do Blogger” | **descartar** |
| Comentários | **não coletar** |

Regras de limpeza:

1. Normalizar entidades (`&nbsp;`, `&amp;`), aspas curvas e espaços duplos.
2. Preservar **a grafia do autor** (“idéia”, “contigenciamentos”), sem
   “corrigir” o original. Correção só com nota de edição.
3. Toda imagem: baixar o original, gerar `webp` em 1600 px, guardar crédito e
   URL de origem; se não houver licença, entra como **link**, não como arquivo.
4. Slug: `o-que-e-assessoria-juridica-popular` (sem acento, 60 caracteres,
   único; em colisão, sufixo de ano).
5. Tema: 1 principal + até 3 secundários, por regra de palavra-chave e
   conferência humana.
   - `assessoria-juridica-popular`, `educacao-popular`, `movimentos-sociais`,
     `direitos-humanos`, `memoria`, `teoria-critica`.
6. Deduplicação: mesmo título + mesma data + similaridade de texto > 0,9.
7. Links quebrados: verificar cada `href` externo uma vez, com timeout curto;
   marcar `link-morto` e preservar o texto.

**Critério de saída:** `staging/` com 790 JSON válidos contra o schema,
relatório `staging/_relatorio.json` com contagem por bloco, imagem, link, tema
e lista de pendências.

### 4.3 Load

| Artefato | Formato | Consumido por |
|---|---|---|
| `content/<slug>.json` | 1 arquivo por post, versionado | build |
| `content/_indice.json` | lista leve (título, data, autor, tema, resumo) | busca e listas |
| `public/acervo/<slug>.html` | página gerada | leitor e buscadores |
| `public/autor/<slug>.html` | página do autor | leitor |
| `public/tema/<slug>.html` | página de tema | leitor |
| `public/acervo.pdf` | texto corrido, mesma identidade | download |
| `sitemap-acervo.xml` | URLs novas | buscadores |

O build é determinístico: mesma entrada, mesma saída. Nada de chamada de rede
no build.

---

## 5. Modelo de dados

```json
{
  "id": "tag:blogger.com,1999:blog-8502620451751951542.post-9102954750362444309",
  "slug": "o-que-e-assessoria-juridica-popular",
  "titulo": "O que é assessoria jurídica popular?",
  "data": "2009-08-16",
  "autor": { "nome": "Luiz Otávio Ribas", "url": "https://www.blogger.com/profile/16853403191296683788" },
  "fonte": {
    "site": "Assessoria Jurídica Popular",
    "url": "https://assessoriajuridicapopular.blogspot.com/2009/08/o-que-e-assessoria-juridica-popular.html",
    "capturado_em": "2026-11-17",
    "licenca": "citacao",
    "hash_html": "sha256:…"
  },
  "resumo": "Definição de assessoria jurídica popular, escrita em 2009 por Luiz Otávio Ribas.",
  "temas": ["assessoria-juridica-popular", "educacao-popular"],
  "blocos": [
    { "tipo": "paragrafo", "texto": "O nome desse blog está te parecendo estranho? Hoje vou tentar apresentar esse conceito." }
  ],
  "imagens": [
    { "origem": "https://blogger.googleusercontent.com/…/cartaz.bmp", "credito": "Divulgação", "licenca": "link" }
  ],
  "revisao": { "por": "GT de Comunicação", "em": "2026-11-17", "estado": "aprovado" }
}
```

Campos obrigatórios: `id`, `slug`, `titulo`, `data`, `autor.nome`, `fonte.url`,
`fonte.capturado_em`, `fonte.licenca`, `blocos`, `revisao.estado`.

---

## 6. Reformulação do site

### 6.1 Arquitetura de informação

```
/                       home do acervo: busca, últimos, temas, linha do tempo
/acervo/                lista filtrável (tema, autor, ano, tipo)
/acervo/<slug>/         o texto, com bloco de citação e botões
/autor/<slug>/          o que a pessoa publicou
/tema/<slug>/           recorte por assunto
/linha-do-tempo/        1960 → hoje, marcos da assessoria jurídica popular
/sobre/                 o que é o acervo, como citar, como corrigir
```

### 6.2 Anatomia da página de texto

1. **Olho:** tema + ano.
2. **Título** do original, sem reescrever.
3. **Ficha de origem:** autor, data, blog, “citação direta” e data de captura.
4. **Corpo:** blocos na ordem do original.
5. **Bloco de citação** (obrigatório, antes do corpo):

```html
<figure class="citacao">
  <blockquote cite="https://assessoriajuridicapopular.blogspot.com/2009/08/o-que-e-assessoria-juridica-popular.html">
    <p>A assessoria jurídica popular, amplamente concebida, consiste no trabalho
    desenvolvido por advogados populares, estudantes, educadores, militantes dos
    direitos humanos em geral…</p>
  </blockquote>
  <figcaption>
    <b>Luiz Otávio Ribas</b>, em “O que é assessoria jurídica popular?”,
    <time datetime="2009-08-16">16 de agosto de 2009</time>,
    <a href="https://assessoriajuridicapopular.blogspot.com/2009/08/o-que-e-assessoria-juridica-popular.html"
       target="_blank" rel="noopener">Assessoria Jurídica Popular</a>.
    Capturado em 17/11/2026.
  </figcaption>
</figure>

<p class="acoes-fonte">
  <a class="botao" href="https://assessoriajuridicapopular.blogspot.com/2009/08/o-que-e-assessoria-juridica-popular.html"
     target="_blank" rel="noopener">Ler no blog original</a>
  <a class="botao secundario" href="https://www.blogger.com/profile/16853403191296683788"
     target="_blank" rel="noopener">Sobre Luiz Otávio Ribas</a>
</p>
```

Regras do bloco:

- `blockquote` com `cite` apontando para a URL canônica.
- Nome do autor em **negrito**, sempre antes do veículo.
- Data legível e `datetime` ISO.
- “Capturado em” com a data da coleta — prova de fidelidade.
- Os dois botões ficam **acima e abaixo** do texto (no topo e no rodapé).

### 6.3 Design (o que já está decidido nesta sessão)

| Elemento | Regra |
|---|---|
| Cartão | sem fundo, sem desfoque, borda clara a 22%, raio 12 px |
| Foto de fundo | uma por página, canto direito, brilho 0,38, opacidade 0,42 |
| Véu do tema | 40 / 28 / 18% (claro: 92 / 84 / 74%) |
| Tipografia | Clash Display no título, General Sans no texto, ambas locais |
| Fonte mínima | 12 px de interface; corpo em 1,06–1,2 rem |
| Celular | régua de 390 px, sem rolagem lateral |
| Contraste | medido por `docs/medir-contraste.py`, meta `falhas: 0` |
| Temas | nove, incluindo alto contraste (foto sai de cena) |
| PDF | texto corrido, seções separadas, interativos viram nota com link |

### 6.4 SEO e citação por máquina

- `link rel="canonical"` **para o original** enquanto a licença for `citacao`;
  para a página nova quando for `autorizado`.
- Schema.org `Article` + `isBasedOn` (URL do blog) + `author` (Luiz Otávio
  Ribas) + `datePublished` (2009-08-16).
- Open Graph com o mesmo título e a mesma data.
- `robots` liberado; `sitemap-acervo.xml` próprio.

### 6.5 Acessibilidade

- Bloco de citação com `figure/figcaption`, leitor de tela anuncia autor e data.
- Botões com 44 px de altura mínima e foco visível na cor do tema.
- Link externo com aviso textual (“abre em outra aba”), não só ícone.
- Leitura em voz e alto contraste herdados da casca do portal.

---

## 7. Exemplo aplicado à página-alvo

| Bloco do original | Destino na página nova |
|---|---|
| 1–3 (abertura, convite, aviso) | parágrafos de abertura, sem corte |
| 4 (definição) | **citação de destaque**, no topo, com os dois botões |
| 5–6 (prática insurgente, promotoras) | parágrafos do corpo |
| 7 (legenda do cartaz) | `figura` com legenda; imagem como link até haver licença |
| 8 (nova cultura jurídico-social) | parágrafo de fecho |
| 9 (“Como formar…?”) | link interno para o post correspondente do acervo |
| “Mapeamento” e “Colunistas” | descartados (gadgets) |

---

## 8. Fases, entregáveis e aceite

| Fase | O que entrega | Prazo | Aceite |
|---|---|---|---|
| **0 · Autorização** | pedido ao autor e ao blog, registro em `docs/autorizacoes/` | 3 dias | resposta arquivada ou decisão pelo cenário B |
| **1 · Piloto** | 1 post (esta página), parser, JSON, página, PDF de 1 folha | 4 dias | texto idêntico ao original, contraste 0 falhas, 390 px ok |
| **2 · Lote 2009–2015** | 300 posts, relatório de qualidade | 8 dias | 0 bloco vazio, 0 link morto não marcado |
| **3 · Acervo completo** | 790 posts, índice, busca, páginas de autor e tema | 12 dias | busca acha por autor, ano e tema; tempo de página < 1,5 s |
| **4 · Publicação** | sitemap, feed próprio, PDF do acervo, monitoramento | 3 dias | `npm test`, `tsc --noEmit`, contraste 0, acessibilidade AA |

Total: **cerca de 30 dias corridos**, com revisão humana em cada lote.

---

## 9. Verificação (roda a cada entrega)

```bash
npx tsc --noEmit
npx vitest run lib/sem-cpf-no-repo.test.ts
python docs/medir-contraste.py | grep falhas      # meta: falhas: 0
rg "text-\[(9|10|11)px\]" apps/web/app            # fonte mínima 12 px
python scripts/validar-documentacao.py            # se mexeu em docs
```

Checklist manual:

- [ ] Título, data e autor iguais ao original.
- [ ] Bloco de citação com nome do autor em negrito e link canônico.
- [ ] Dois botões no topo e no rodapé.
- [ ] “Capturado em” preenchido.
- [ ] Imagem com crédito ou só link.
- [ ] Celular de 390 px sem rolagem lateral.
- [ ] Leitor de tela anuncia autor e data da citação.
- [ ] PDF gerado e com a mesma fidelidade.

---

## 10. Riscos e mitigação

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Autor não responder | média | cenário B: trecho de até 30% + link |
| Imagem sem licença | alta | não copiar arquivo; exibir link “ver o cartaz no original” |
| Post apagado no blog | baixa | guardar `raw/` e citar a data de captura |
| Texto com erro de digitação do original | certa | manter e, se preciso, nota de edição |
| 790 posts com HTML quebrado | média | parser tolerante + relatório de pendências |
| Duplicação de conteúdo (SEO) | média | canonical para o original no regime de citação |

---

## 11. Anexo A — o texto integral, citado

> Transcrição direta de **“O que é assessoria jurídica popular?”**, de
> **Luiz Otávio Ribas**, publicado em **16 de agosto de 2009** no blog
> [Assessoria Jurídica Popular](https://assessoriajuridicapopular.blogspot.com/2009/08/o-que-e-assessoria-juridica-popular.html).
> Capturado em 17/11/2026. Reprodução condicionada à autorização do autor
> (seção 3).
>
> O nome desse blog está te parecendo estranho? Hoje vou tentar apresentar esse conceito.
>
> Aguardo comentários sobre o quanto me fiz entender.
>
> A linguagem a seguir é formal, mas a idéia é ser mais preciso.
>
> A assessoria jurídica popular, amplamente concebida, consiste no trabalho desenvolvido por advogados populares, estudantes, educadores, militantes dos direitos humanos em geral, entre outros; de assistência, orientação jurídica e/ou educação popular com movimentos sociais; com o objetivo de viabilizar um diálogo sobre os principais problemas enfrentados pelo povo para a realização de direitos fundamentais para uma vida com dignidade; seja por meio dos mecanismos oficiais, institucionais, jurídicos, extrajurídicos, políticos e da conscientização.
>
> É uma prática jurídica insurgente desenvolvida principalmente no Brasil, nas décadas de 1960 até hoje, por advogados, estudantes e militantes de direitos humanos, voltada para a realização de ações para o acesso à justiça, num trabalho que mescla assistência jurídica e atividades de educação popular em direitos humanos, organização comunitária e participação popular, com grupos e movimentos populares.
>
> Além de advogados e estudantes, outros militantes dos direitos humanos desenvolvem atividades neste sentido. É o caso dos juristas leigos e das promotoras legais populares, que atuam em projetos voltados para a conscientização de direitos e que não possuem formação jurídica formal.
>
> Esse cartaz é de um curso das promotoras legais populares de Brasília:
>
> A assessoria jurídica popular pode propiciar uma nova cultura jurídico-social, na qual prevaleça o respeito à diversidade, às identidades, aos contingenciamentos, às necessidades, às limitações e ao desejo por mudança.
>
> Como formar uma assessoria jurídica popular universitária?

**Fonte:** <https://assessoriajuridicapopular.blogspot.com/2009/08/o-que-e-assessoria-juridica-popular.html>
**Autor:** <https://www.blogger.com/profile/16853403191296683788>

---

## 12. Anexo B — regras de slug e de nome de arquivo

| Regra | Exemplo |
|---|---|
| minúsculas, sem acento | `o-que-e-assessoria-juridica-popular` |
| no máximo 60 caracteres | `assessoria-juridica-popular-universitaria` |
| sem ano no slug (o ano é campo) | não usar `2009-…` |
| colisão | sufixo `-2`, `-3` |
| arquivo bruto | `raw/9102954750362444309.html` (id do post) |
| arquivo de conteúdo | `content/o-que-e-assessoria-juridica-popular.json` |
