# Política de segurança

**Resumo.** Este repositório é um site estático, sem servidor, sem banco e sem
login. Ainda assim, há três superfícies que merecem cuidado: links externos,
conteúdo embutido e imagem publicada.

**Palavras-chave:** segurança, vulnerabilidade, relato privado, dado pessoal,
conteúdo de terceiro.

---

## Como relatar

Não abra issue pública com detalhe de falha ou dado pessoal. Escreva para o
mantenedor pelo perfil [@FinweeJur](https://github.com/FinweeJur), informando:

1. arquivo e linha;
2. o que acontece;
3. como reproduzir;
4. impacto (o que uma pessoa mal-intencionada conseguiria).

Resposta esperada em até 7 dias. Correção publicada é registrada no
[CHANGELOG.md](CHANGELOG.md).

## Escopo

| Superfície | Risco | Cuidado |
|---|---|---|
| `index.html` e `proposta-home.html` | XSS por HTML copiado | nunca interpolar texto de fora sem escapar |
| `componentes/radio.js` | stream de terceiro | só HTTPS; erro tratado e visível |
| `assets/` | imagem com dado pessoal | varredura antes do commit |
| Links externos | destino malicioso | `rel="noopener"` em todo `target="_blank"` |
| Prints de sites | direito de imagem | só página pública, com fonte e data |

## O que este projeto não faz

- Não coleta dado de visitante; não há analytics.
- Não guarda credencial: nenhum segredo mora no repositório.
- Não executa código de servidor.

## Versões suportadas

Apenas a branch `main` publicada em
<https://finweejur.github.io/renap-proposta-design/>.
