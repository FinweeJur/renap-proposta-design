"""Mede o contraste dos oito temas do design system usado na apresentação.

Por que existe: a regra é "contraste medido, nunca estimado".
Os valores abaixo são os de `temas/temas.css` (Controle Popular, MIT).
Uso: python medir-contraste.py
"""

TEMAS = {
    "light":          dict(bg="#f7f8fa", surface="#ffffff", text="#0e1726", soft="#4a5568", primary="#12467b", ink="#ffffff", accent="#0e8f6e"),
    "dark":           dict(bg="#0b1220", surface="#141c2b", text="#e6eaf0", soft="#a0aec0", primary="#4a90d9", ink="#08111e", accent="#2fbf9a"),
    "high-contrast":  dict(bg="#ffffff", surface="#ffffff", text="#000000", soft="#000000", primary="#0000cc", ink="#ffffff", accent="#006644"),
    "pequi":          dict(bg="#0d0b08", surface="#171310", text="#f7f0e6", soft="#cbbda9", primary="#f2701d", ink="#140d06", accent="#e4b33c"),
    "cerrado":        dict(bg="#1a1208", surface="#231a0f", text="#f5e6d0", soft="#c4a882", primary="#c97b5a", ink="#1a0e06", accent="#3a6b35"),
    "mata-atlantica": dict(bg="#0a1208", surface="#111a0f", text="#e8f0e4", soft="#a8c4a0", primary="#3a6b35", ink="#ffffff", accent="#ffd700"),
    "caatinga":       dict(bg="#161007", surface="#1e170c", text="#f7ede1", soft="#cbb696", primary="#d97724", ink="#180e04", accent="#2e8b57"),
    "pantanal":       dict(bg="#071318", surface="#0e1e24", text="#e0f2fe", soft="#93c5fd", primary="#0284c7", ink="#ffffff", accent="#10b981"),
}

# (rótulo, frente, fundo, mínimo WCAG, conta como falha?)
# A marca de acento do olho da seção é decorativa: não carrega informação.
CHECAGENS = [
    ("texto / fundo",                  "text", "bg", 4.5, True),
    ("texto / cartão",                 "text", "surface", 4.5, True),
    ("texto suave / fundo",            "soft", "bg", 4.5, True),
    ("texto suave / cartão",           "soft", "surface", 4.5, True),
    ("tinta sobre a primária (botão)", "ink", "primary", 4.5, True),
    ("acento / fundo (marca decorativa)", "accent", "bg", 3.0, False),
]


def luminancia(hexcor):
    h = hexcor.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))

    def canal(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b)


def razao(a, b):
    la, lb = luminancia(a), luminancia(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


falhas = 0
for tema, c in TEMAS.items():
    print("\n" + tema)
    for rotulo, frente, fundo, minimo, conta in CHECAGENS:
        r = razao(c[fundo], c[frente])
        ok = r >= minimo
        if not ok and conta:
            falhas += 1
        aviso = "" if conta or ok else "  (decorativo: só informa)"
        print("  {:36} {:5.2f}:1  piso {:.1f}  {}{}".format(
            rotulo, r, minimo, "ok" if ok else "ABAIXO", aviso))

print("\nfalhas:", falhas)
