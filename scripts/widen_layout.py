from pathlib import Path

root = Path(r"c:\Users\Sam\Downloads\antitrust")
files = [
    root / "src/components/ConsumerReportWizard.tsx",
    root / "src/components/CompanyDirectory.tsx",
    root / "src/components/RightsWizard.tsx",
    root / "src/app/power/page.tsx",
    root / "src/app/similar/page.tsx",
]
old_open = '<div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">'
new_open = '<PageWrap className="py-10 sm:py-14">'
import_line = 'import { PageWrap } from "@/components/PageWrap";\n'

for p in files:
    t = p.read_text(encoding="utf-8")
    if old_open not in t:
        print("skip open", p.name)
        continue
    if "PageWrap" not in t:
        if t.startswith('"use client"'):
            t = t.replace('"use client";\n\n', '"use client";\n\n' + import_line, 1)
        else:
            lines = t.splitlines(True)
            insert_at = 0
            for i, line in enumerate(lines):
                if line.startswith("import "):
                    insert_at = i + 1
            lines.insert(insert_at, import_line)
            t = "".join(lines)
    t = t.replace(old_open, new_open, 1)
    # Close: find return's PageWrap and change the matching final indent-4 </div> before ");"
    # Heuristic: replace the last occurrence of "\n    </div>\n  );" with PageWrap close
    needle = "\n    </div>\n  );"
    idx = t.rfind(needle)
    if idx != -1:
        t = t[:idx] + "\n    </PageWrap>\n  );" + t[idx + len(needle) :]
        print("closed", p.name)
    else:
        print("NO CLOSE", p.name)
    p.write_text(t, encoding="utf-8")
    print("done", p.name)
