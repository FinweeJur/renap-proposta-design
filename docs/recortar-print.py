"""Recorta a moldura vazia de um print de site.

Por que existe: alguns sites têm fundo escuro com muito espaço morto em volta
do conteúdo; no slide isso vira tarja preta. Aqui o recorte é por brilho:
linhas e colunas totalmente escuras são descartadas.

Uso: python recortar-print.py <arquivo.jpg> [limiar=40]
"""
import sys

from PIL import Image, ImageStat

caminho = sys.argv[1]
limiar = int(sys.argv[2]) if len(sys.argv) > 2 else 40

im = Image.open(caminho).convert("RGB")
largura, altura = im.size
cinza = im.convert("L")
px = cinza.load()

# Colunas e linhas com algum pixel acima do limiar contam como conteúdo.
colunas = [x for x in range(largura) if max(px[x, y] for y in range(0, altura, 4)) > limiar]
linhas = [y for y in range(altura) if max(px[x, y] for x in range(0, largura, 4)) > limiar]

if not colunas or not linhas:
    raise SystemExit("imagem toda escura; nada a recortar")

caixa = (min(colunas), min(linhas), max(colunas) + 1, max(linhas) + 1)
recorte = im.crop(caixa)
recorte.save(caminho, "JPEG", quality=88, optimize=True)

print("antes", (largura, altura), "-> depois", recorte.size, "| caixa", caixa)
