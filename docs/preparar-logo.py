"""Gera o logo da RENAP com fundo transparente, em duas versões.

Por que existe: os arquivos oficiais vêm com fundo chapado (preto ou branco).
No site precisamos das duas versões e com recorte justo.
Entrada: assets/logo-renap-branco.png (logo branco sobre preto, limpo).

Saída:
  assets/logo-renap-escuro.png  — branco com alfa (para tema escuro)
  assets/logo-renap-claro.png   — preto com alfa  (para tema claro)
"""
from PIL import Image

ORIGEM = "assets/logo-renap-branco.png"

im = Image.open(ORIGEM).convert("RGB")
largura, altura = im.size
origem = im.load()

# O desenho é branco sobre preto: a luminância vira alfa. Isso preserva o
# antisserrilhado das bordas em vez de cortar com limiar duro.
alfa = Image.new("L", (largura, altura))
destino_alfa = alfa.load()
for y in range(altura):
    for x in range(largura):
        r, g, b = origem[x, y]
        destino_alfa[x, y] = int(round(0.2126 * r + 0.7152 * g + 0.0722 * b))

# Recorta a margem vazia para o logo ocupar o espaço que recebe.
caixa = alfa.getbbox()
alfa = alfa.crop(caixa)

for cor, nome in (((255, 255, 255), "escuro"), ((0, 0, 0), "claro")):
    camada = Image.new("RGBA", alfa.size, cor + (0,))
    camada.putalpha(alfa)
    saida = f"assets/logo-renap-{nome}.png"
    camada.save(saida)
    print(saida, camada.size)
