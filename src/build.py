# يبني index.html و mobile.html من الملفات المقسّمة: python3 src/build.py
import pathlib
src = pathlib.Path(__file__).resolve().parent
css = (src / 'style.css').read_text(encoding='utf-8')
js = (src / 'game.js').read_text(encoding='utf-8')
for shell_name, out_name in (('shell.html', 'index.html'), ('shell-mobile.html', 'mobile.html')):
    shell = (src / shell_name).read_text(encoding='utf-8')
    out = shell.replace('/*STYLE*/', css, 1).replace('/*GAME*/', js, 1)
    (src.parent / out_name).write_text(out, encoding='utf-8')
    print(out_name, len(out.encode('utf-8')), 'bytes')
