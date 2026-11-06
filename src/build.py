# يبني index.html من الملفات المقسّمة: python3 src/build.py
import pathlib
src = pathlib.Path(__file__).resolve().parent
shell = (src / 'shell.html').read_text(encoding='utf-8')
css = (src / 'style.css').read_text(encoding='utf-8')
js = (src / 'game.js').read_text(encoding='utf-8')
out = shell.replace('/*STYLE*/', css, 1).replace('/*GAME*/', js, 1)
(src.parent / 'index.html').write_text(out, encoding='utf-8')
print('index.html', len(out.encode('utf-8')), 'bytes')
