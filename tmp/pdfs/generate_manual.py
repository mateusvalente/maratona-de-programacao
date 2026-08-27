import io
import json
import keyword
import sys
import tokenize
from collections import defaultdict
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

from manual_programs import PAGES


PRINT_MODE = False


NAVY = colors.HexColor("#07111A")
PANEL = colors.HexColor("#0D1C26")
PANEL_2 = colors.HexColor("#132631")
GREEN = colors.HexColor("#59E3AF")
BLUE = colors.HexColor("#66B8F7")
YELLOW = colors.HexColor("#FFD166")
PURPLE = colors.HexColor("#C7A7FF")
ORANGE = colors.HexColor("#FF9F5A")
RED = colors.HexColor("#FF7B7B")
INK = colors.HexColor("#17232C")
MUTED = colors.HexColor("#52626E")
LIGHT = colors.HexColor("#F4F8FA")
LINE = colors.HexColor("#DCE5EA")
WHITE = colors.white
PRINT_INK = colors.black
PRINT_MUTED = colors.HexColor("#555555")
PRINT_LINE = colors.HexColor("#B8B8B8")


def register_fonts():
    fonts = Path(r"C:\Windows\Fonts")
    pdfmetrics.registerFont(TTFont("Manual", str(fonts / "arial.ttf")))
    pdfmetrics.registerFont(TTFont("ManualBold", str(fonts / "arialbd.ttf")))
    mono = fonts / "consola.ttf"
    mono_bold = fonts / "consolab.ttf"
    if not mono.exists():
        mono = fonts / "cour.ttf"
        mono_bold = fonts / "courbd.ttf"
    pdfmetrics.registerFont(TTFont("ManualMono", str(mono)))
    pdfmetrics.registerFont(TTFont("ManualMonoBold", str(mono_bold)))


register_fonts()


def wrap_words(text, font, size, max_width):
    lines = []
    current = ""
    for word in text.split():
        candidate = word if not current else current + " " + word
        if pdfmetrics.stringWidth(candidate, font, size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(c, text, x, y, width, font="Manual", size=10, color=INK, leading=None):
    leading = leading or size * 1.35
    c.setFont(font, size)
    c.setFillColor(color)
    for line in wrap_words(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_tag(c, text, x, y, fill, text_color=INK):
    c.setFont("ManualBold", 7.2)
    max_width = 252
    if pdfmetrics.stringWidth(text, "ManualBold", 7.2) > max_width - 18:
        text = text[:62] + "..."
    width = min(max_width, pdfmetrics.stringWidth(text, "ManualBold", 7.2) + 18)
    if PRINT_MODE:
        c.setFillColor(WHITE)
        c.setStrokeColor(colors.HexColor("#A8A8A8"))
        c.roundRect(x, y - 10, width, 18, 9, fill=1, stroke=1)
    else:
        c.setFillColor(fill)
        c.roundRect(x, y - 10, width, 18, 9, fill=1, stroke=0)
    c.setFillColor(PRINT_INK if PRINT_MODE else text_color)
    c.drawString(x + 9, y - 4, text)
    return x + width + 7


def token_color(token_type, token_text):
    if PRINT_MODE:
        if token_type == tokenize.COMMENT:
            return colors.HexColor("#555555")
        if token_type == tokenize.STRING:
            return colors.HexColor("#222222")
        if token_type == tokenize.NUMBER:
            return colors.HexColor("#666666")
        if token_type == tokenize.NAME and keyword.iskeyword(token_text):
            return colors.black
        if token_type == tokenize.NAME and token_text in {
            "print", "input", "int", "float", "str", "len", "range", "enumerate",
            "map", "sum", "min", "max", "abs", "list", "set", "dict", "iter",
            "next", "zip", "sorted", "any", "all",
        }:
            return colors.HexColor("#333333")
        return colors.black
    if token_type == tokenize.COMMENT:
        return GREEN
    if token_type == tokenize.STRING:
        return ORANGE
    if token_type == tokenize.NUMBER:
        return YELLOW
    if token_type == tokenize.NAME and keyword.iskeyword(token_text):
        return PURPLE
    if token_type == tokenize.NAME and token_text in {
        "print", "input", "int", "float", "str", "len", "range", "enumerate",
        "map", "sum", "min", "max", "abs", "list", "set", "dict", "iter",
        "next", "zip", "sorted", "any", "all",
    }:
        return BLUE
    return colors.HexColor("#E8F0F4")


def highlighted_lines(code):
    lines = code.rstrip().splitlines()
    spans = defaultdict(list)
    try:
        for token in tokenize.generate_tokens(io.StringIO(code).readline):
            if token.start[0] == token.end[0] and token.type not in {
                tokenize.ENCODING, tokenize.ENDMARKER, tokenize.NEWLINE,
                tokenize.NL, tokenize.INDENT, tokenize.DEDENT,
            }:
                spans[token.start[0] - 1].append(
                    (token.start[1], token.end[1], token.string, token_color(token.type, token.string))
                )
    except (tokenize.TokenError, IndentationError):
        pass
    return lines, spans


def draw_code(c, code, x, top, width, available_height):
    lines, spans = highlighted_lines(code)
    line_count = max(1, len(lines))
    # O programa precisa aparecer inteiro na mesma página. Para soluções mais
    # longas, reduzimos fonte e entrelinha proporcionalmente, sem cortar linhas.
    leading = min(10.25, (available_height - 36) / line_count)
    leading = max(5.85, leading)
    font_size = min(7.45, leading * 0.76)
    required = 36 + line_count * leading
    if required > available_height:
        leading = (available_height - 36) / line_count
        font_size = min(font_size, leading * 0.76)
        required = available_height

    bottom = top - required
    c.setFillColor(WHITE if PRINT_MODE else NAVY)
    c.roundRect(x, bottom, width, required, 12, fill=1, stroke=0)
    c.setStrokeColor(colors.HexColor("#555555") if PRINT_MODE else colors.HexColor("#27414E"))
    c.roundRect(x, bottom, width, required, 12, fill=0, stroke=1)

    for dot_x, dot_color in [(15, RED), (27, YELLOW), (39, GREEN)]:
        if PRINT_MODE:
            c.setStrokeColor(colors.HexColor("#777777"))
            c.circle(x + dot_x, top - 16, 3.4, fill=0, stroke=1)
        else:
            c.setFillColor(dot_color)
            c.circle(x + dot_x, top - 16, 3.4, fill=1, stroke=0)
    c.setFont("ManualMonoBold", 7.2)
    c.setFillColor(PRINT_INK if PRINT_MODE else BLUE)
    c.drawRightString(x + width - 13, top - 19, "solucao.py")

    char_width = pdfmetrics.stringWidth("M", "ManualMono", font_size)
    y = top - 34
    for index, line in enumerate(lines):
        c.setFont("ManualMono", font_size)
        c.setFillColor(colors.HexColor("#777777") if PRINT_MODE else colors.HexColor("#6E8794"))
        c.drawRightString(x + 23, y, str(index + 1))
        cursor = 0
        for start, end, value, color in sorted(spans.get(index, []), key=lambda item: item[0]):
            if start > cursor:
                c.setFillColor(PRINT_INK if PRINT_MODE else colors.HexColor("#E8F0F4"))
                c.drawString(x + 31 + cursor * char_width, y, line[cursor:start])
            c.setFillColor(color)
            c.drawString(x + 31 + start * char_width, y, value)
            cursor = end
        if cursor < len(line):
            c.setFillColor(PRINT_INK if PRINT_MODE else colors.HexColor("#E8F0F4"))
            c.drawString(x + 31 + cursor * char_width, y, line[cursor:])
        y -= leading
    return bottom


def draw_note(c, title, text, x, y, width, accent):
    lines = wrap_words(text, "Manual", 8.35, width - 24)
    height = 34 + len(lines) * 10.6
    c.setFillColor(WHITE if PRINT_MODE else LIGHT)
    c.setStrokeColor(colors.HexColor("#B8B8B8"))
    c.roundRect(x, y - height, width, height, 10, fill=1, stroke=1 if PRINT_MODE else 0)
    c.setFillColor(colors.HexColor("#444444") if PRINT_MODE else accent)
    c.rect(x, y - height, 4, height, fill=1, stroke=0)
    c.setFont("ManualBold", 7.4)
    c.drawString(x + 13, y - 17, title.upper())
    c.setFont("Manual", 8.35)
    c.setFillColor(PRINT_INK if PRINT_MODE else INK)
    line_y = y - 31
    for line in lines:
        c.drawString(x + 13, line_y, line)
        line_y -= 10.6
    return height


def draw_page(c, page, page_number, total_pages):
    width, height = A4
    c.setFillColor(WHITE)
    c.rect(0, 0, width, height, fill=1, stroke=0)

    if PRINT_MODE:
        c.setStrokeColor(colors.HexColor("#555555"))
        c.setLineWidth(0.8)
        c.line(0, height - 72, width, height - 72)
        c.setLineWidth(1)
    else:
        c.setFillColor(NAVY)
        c.rect(0, height - 72, width, 72, fill=1, stroke=0)
        for x, bar_width, color in [
            (0, 155, GREEN), (155, 155, BLUE), (310, width - 310, YELLOW)
        ]:
            c.setFillColor(color)
            c.rect(x, height - 72, bar_width, 5, fill=1, stroke=0)

    c.setFont("ManualBold", 8)
    c.setFillColor(PRINT_INK if PRINT_MODE else GREEN)
    c.drawString(42, height - 30, page["chapter"])
    c.setFillColor(colors.HexColor("#666666") if PRINT_MODE else colors.HexColor("#AFC0C9"))
    c.drawRightString(width - 42, height - 30, "CURSO DE INVERNO DE PROGRAMAÇÃO")

    y = height - 108
    title_lines = wrap_words(page["title"], "ManualBold", 23, width - 84)
    c.setFont("ManualBold", 23)
    c.setFillColor(PRINT_INK if PRINT_MODE else INK)
    for line in title_lines:
        c.drawString(42, y, line)
        y -= 27
    y -= 3
    y = draw_wrapped(
        c,
        page["summary"],
        42,
        y,
        width - 84,
        size=10.1,
        color=PRINT_MUTED if PRINT_MODE else MUTED,
        leading=13.5,
    )
    y -= 5
    x = draw_tag(c, page["when"], 42, y, colors.HexColor("#DDF7EC"))
    draw_tag(c, page["complexity"], x, y, colors.HexColor("#E4F2FD"))
    y -= 27

    c.setFont("ManualBold", 7.6)
    c.setFillColor(PRINT_MUTED if PRINT_MODE else MUTED)
    c.drawString(42, y, "EXEMPLO DE CÓDIGO")
    y -= 9

    note_preview = max(
        66,
        34 + max(
            len(wrap_words(page["insight"], "Manual", 8.35, 236)),
            len(wrap_words(page["pitfall"], "Manual", 8.35, 236)),
        ) * 10.6,
    )
    code_bottom_limit = 55 + note_preview + 18
    code_bottom = draw_code(c, page["code"], 42, y, width - 84, y - code_bottom_limit)

    note_top = code_bottom - 13
    gap = 10
    note_width = (width - 84 - gap) / 2
    draw_note(c, "Técnica", page["insight"], 42, note_top, note_width, GREEN)
    draw_note(c, "Armadilha", page["pitfall"], 42 + note_width + gap, note_top, note_width, RED)

    c.setStrokeColor(PRINT_LINE if PRINT_MODE else LINE)
    c.line(42, 30, width - 42, 30)
    c.setFont("Manual", 7.3)
    c.setFillColor(PRINT_MUTED if PRINT_MODE else MUTED)
    c.drawString(42, 18, "Manual de técnicas e exemplos em Python")
    c.drawRightString(width - 42, 18, f"{page_number}/{total_pages}")
    c.showPage()


def draw_cover(c, total_pages):
    width, height = A4
    c.setFillColor(NAVY)
    c.rect(0, 0, width, height, fill=1, stroke=0)
    for x, color in [(0, GREEN), (width / 3, BLUE), (2 * width / 3, YELLOW)]:
        c.setFillColor(color)
        c.rect(x, height - 14, width / 3, 14, fill=1, stroke=0)

    c.setFillColor(colors.HexColor("#0B2730"))
    c.circle(width - 55, height - 110, 125, fill=1, stroke=0)
    c.setFillColor(colors.HexColor("#0C1B25"))
    c.circle(width - 10, 105, 185, fill=1, stroke=0)

    c.setFont("ManualMonoBold", 9)
    c.setFillColor(GREEN)
    c.drawString(48, height - 75, "$ UNIBBE · TECNOLOGIA DA INFORMAÇÃO")

    c.setFont("ManualBold", 35)
    c.setFillColor(WHITE)
    c.drawString(48, height - 150, "MANUAL DE MARATONA")
    c.setFillColor(BLUE)
    c.drawString(48, height - 192, "PROGRAMAÇÃO EM PYTHON")

    c.setFont("Manual", 13)
    c.setFillColor(colors.HexColor("#C6D3DA"))
    subtitle = "Técnicas, padrões e exemplos de código para consultar no dia da competição."
    y = height - 230
    for line in wrap_words(subtitle, "Manual", 13, width - 120):
        c.drawString(48, y, line)
        y -= 18

    box_y = 340
    c.setFillColor(PANEL)
    c.roundRect(48, box_y, width - 96, 180, 16, fill=1, stroke=0)
    c.setStrokeColor(colors.HexColor("#2A4653"))
    c.roundRect(48, box_y, width - 96, 180, 16, fill=0, stroke=1)
    c.setFont("ManualMono", 10)
    cover_code = [
        ("def preparar_para_a_maratona():", PURPLE),
        ("    dominar_entrada_saida()", BLUE),
        ("    reconhecer_padroes()", BLUE),
        ("    escolher_estrutura_correta()", BLUE),
        ("    estimar_complexidade()", BLUE),
        ("    testar_bordas_e_formato()", BLUE),
        ("    return \"Accepted\"", ORANGE),
    ]
    cy = box_y + 145
    for line, color in cover_code:
        c.setFillColor(color)
        c.drawString(72, cy, line)
        cy -= 19

    c.setFillColor(GREEN)
    c.roundRect(48, 245, 160, 42, 8, fill=1, stroke=0)
    c.setFont("ManualBold", 10)
    c.setFillColor(INK)
    c.drawCentredString(128, 261, f"{total_pages} PÁGINAS")
    c.setFillColor(PANEL_2)
    c.roundRect(218, 245, 329, 42, 8, fill=1, stroke=0)
    c.setFillColor(colors.HexColor("#C6D3DA"))
    c.setFont("ManualBold", 7.4)
    c.drawCentredString(382.5, 261, "INTRODUÇÃO · ESTRUTURAS · STRINGS · GRAFOS · GEOMETRIA · PARADIGMAS")

    c.setFont("Manual", 8.5)
    c.setFillColor(colors.HexColor("#8FA3AE"))
    c.drawString(48, 62, "Professor Mestre Mateus de Sousa Valente")
    c.drawRightString(width - 48, 62, "Edição 2026")
    c.showPage()


def generate(output_pdf, source_json, print_mode=False):
    global PRINT_MODE
    PRINT_MODE = print_mode
    output_pdf = Path(output_pdf)
    source_json = Path(source_json)
    output_pdf.parent.mkdir(parents=True, exist_ok=True)
    source_json.parent.mkdir(parents=True, exist_ok=True)
    total_pages = len(PAGES)

    source = {
        "metadata": {
            "title": (
                "30 programas comentados para maratona em Python - edição para impressão"
                if PRINT_MODE
                else "30 programas comentados para maratona em Python"
            ),
            "author": "Professor Mestre Mateus de Sousa Valente",
        },
        "cover": {
            "title": PAGES[0]["title"],
            "subtitle": (
                "30 programas completos em edição econômica para impressão"
                if PRINT_MODE
                else "30 programas completos e comentados em Python"
            ),
        },
        "language_exceptions": [
            "nao", "codigo", "pagina", "proximo", "operacao", "operacoes",
            "decisao", "decisoes", "acao", "acoes", "tambem",
        ],
        "sections": [
            {
                "title": page["title"],
                "blocks": [
                    {"type": "paragraph", "text": page["summary"]},
                    {"type": "code", "text": page["code"]},
                    {"type": "callout", "text": page["insight"]},
                    {"type": "warning", "text": page["pitfall"]},
                ],
            }
            for page in PAGES
        ],
    }
    source_json.write_text(json.dumps(source, ensure_ascii=False, indent=2), encoding="utf-8")

    c = canvas.Canvas(
        str(output_pdf),
        pagesize=A4,
        pageCompression=1,
        title=source["metadata"]["title"],
        author=source["metadata"]["author"],
        subject="Manual de programas completos para maratona de programação",
    )
    for index, page in enumerate(PAGES, start=1):
        draw_page(c, page, index, total_pages)
    c.save()


if __name__ == "__main__":
    print_mode = "--print" in sys.argv[1:]
    arguments = [argument for argument in sys.argv[1:] if argument != "--print"]
    if len(arguments) != 2:
        raise SystemExit("Uso: generate_manual.py [--print] saida.pdf fonte.json")
    generate(arguments[0], arguments[1], print_mode=print_mode)
