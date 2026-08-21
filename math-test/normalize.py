from pathlib import Path
import re

root=Path('/tmp/pqc-order')
for f in [root/'foundations/algebra.html',*sorted((root/'isogeny').glob('*.html'))]:
    s=f.read_text(encoding='utf-8')
    s2,n=re.subn(r'<nav class="subject-tabs".*?</nav>','',s,count=1,flags=re.S)
    if n!=1: raise RuntimeError(f'subject tabs not found in {f}')
    f.write_text(s2,encoding='utf-8')
