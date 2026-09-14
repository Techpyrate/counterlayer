from pathlib import Path
import re
import sys

# Prefer importing via a tiny node script for accuracy
root = Path(r"c:\Users\Sam\Downloads\antitrust\src\data")
files = list((root / "cases").glob("*.ts"))
text = "\n".join(p.read_text(encoding="utf-8") for p in files if p.name != "index.ts")
# crude: only top-level case ids in objects - count status ongoing in all case files
ids = re.findall(r'^\s+id:\s*"([^"]+)"', text, re.M)
# filter false positives from keyDates etc - case ids usually appear after companies or as first field
# Better count unique ids that look like case ids (have hyphen and aren't dates)
print("raw id fields", len(ids), "unique", len(set(ids)))
print("ongoing statuses", len(re.findall(r'status:\s*"ongoing"', text)))
print("appealed statuses", len(re.findall(r'status:\s*"appealed"', text)))
co = (root / "companies-expanded.ts").read_text(encoding="utf-8")
print("expanded companies", len(re.findall(r'^\s+id:\s*"([^"]+)"', co, re.M)))
