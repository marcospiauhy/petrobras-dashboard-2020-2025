"""Gera o index.html (arquivo único, funciona offline) a partir do template, do código e da base SQLite.

Uso (na raiz do repositório):
    npm install --prefix src      # baixa echarts e sql.js
    python src/build.py
"""
import base64
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
NM = SRC / "node_modules"

def read(p): return Path(p).read_text(encoding="utf-8")
def b64(p): return base64.b64encode(Path(p).read_bytes()).decode()

html = read(SRC / "template.html")
echarts = read(NM / "echarts/dist/echarts.min.js")
sqljs = read(NM / "sql.js/dist/sql-wasm.js")
for lib in (echarts, sqljs):
    assert "</script" not in lib.lower()

parts = {
    "/*__LOGO__*/": b64(SRC / "assets/logo.png"),
    "/*__ECHARTS__*/": echarts,
    "/*__SQLJS__*/": sqljs,
    "/*__WASM__*/": b64(NM / "sql.js/dist/sql-wasm.wasm"),
    "/*__DB__*/": b64(ROOT / "data/petrobras_2020_2025.db"),
    "/*__APP__*/": read(SRC / "recalc.js") + "\n" + read(SRC / "app.js"),
}
for key, value in parts.items():
    assert html.count(key) == 1, key
    html = html.replace(key, value, 1)

out = ROOT / "index.html"
out.write_text(html, encoding="utf-8")
print(f"index.html gerado ({out.stat().st_size // 1024} KB)")
