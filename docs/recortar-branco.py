"""Recorta tarja branca nas bordas de um print.

Por que existe: alguns sites deixam uma faixa branca grande de um lado quando
o print é largo. Aqui a coluna (ou linha) só é descartada se for quase toda
branca — o miolo do site, que também tem branco, fica.
"""
import sys

from PIL import Image

caminho = sys.argv[1]
limite = float(sys.argv[2]) if len(sys.argv) > 2 else 0.98

im = Image.open(caminho).convert("RGB")
l, a = im.size
px = im.load()


def quase_branco(p):
    return p[0] > 246 and p[1] > 246 and p[2] > 246


def coluna_vazia(x):
    brancos = sum(1 for y in range(0, a, 6) if quase_branco(px[x, y]))
    return brancos / max(1, len(range(0, a, 6))) >= limite


def linha_vazia(y):
    brancos = sum(1 for x in range(0, l, 6) if quase_branco(px[x, y]))
    return brancos / max(1, len(range(0, l, 6))) >= limite


esq = 0
while esq < l - 1 and coluna_vazia(esq):
    esq += 1
dir_ = l - 1
while dir_ > esq and coluna_vazia(dir_):
    dir_ -= 1
topo = 0
while topo < a - 1 and linha_vazia(topo):
    topo += 1
base = a - 1
while base > topo and linha_vazia(base):
    base -= 1

if (esq, topo, dir_, base) != (0, 0, l - 1, a - 1):
    im = im.crop((esq, topo, dir_ + 1, base + 1))
    im.save(caminho, "JPEG", quality=88, optimize=True)

print("antes", (l, a), "-> depois", im.size)
