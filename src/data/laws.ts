import type { LawRef } from "./types";

export const laws: LawRef[] = [
  {
    id: "sherman-1",
    name: "Sherman Act §1",
    jurisdiction: "US",
    citation: "15 U.S.C. §1",
    summary:
      "Prohibits contracts, combinations, or conspiracies that unreasonably restrain trade — including cartels, bid-rigging, and some vertical restraints.",
    url: "https://www.law.cornell.edu/uscode/text/15/1",
  },
  {
    id: "sherman-2",
    name: "Sherman Act §2",
    jurisdiction: "US",
    citation: "15 U.S.C. §2",
    summary:
      "Prohibits monopolization, attempted monopolization, and conspiracies to monopolize. Focuses on exclusionary conduct by firms with monopoly power.",
    url: "https://www.law.cornell.edu/uscode/text/15/2",
  },
  {
    id: "clayton-7",
    name: "Clayton Act §7",
    jurisdiction: "US",
    citation: "15 U.S.C. §18",
    summary:
      "Prohibits mergers and acquisitions whose effect may be substantially to lessen competition or tend to create a monopoly.",
    url: "https://www.law.cornell.edu/uscode/text/15/18",
  },
  {
    id: "clayton-3",
    name: "Clayton Act §3",
    jurisdiction: "US",
    citation: "15 U.S.C. §14",
    summary:
      "Addresses exclusive dealing and tying arrangements in the sale of goods where the effect may substantially lessen competition.",
    url: "https://www.law.cornell.edu/uscode/text/15/14",
  },
  {
    id: "ftc-5",
    name: "FTC Act §5",
    jurisdiction: "US",
    citation: "15 U.S.C. §45",
    summary:
      "Prohibits unfair methods of competition and unfair or deceptive acts or practices. Broader than Sherman Act in some contexts.",
    url: "https://www.law.cornell.edu/uscode/text/15/45",
  },
  {
    id: "hart-scott",
    name: "Hart-Scott-Rodino Act",
    jurisdiction: "US",
    citation: "15 U.S.C. §18a",
    summary:
      "Requires pre-merger notification to DOJ/FTC for deals above certain thresholds, enabling review before closing.",
    url: "https://www.ftc.gov/enforcement/premerger-notification-program",
  },
  {
    id: "tfeu-101",
    name: "TFEU Article 101",
    jurisdiction: "EU",
    citation: "Art. 101 TFEU",
    summary:
      "Prohibits agreements between undertakings that prevent, restrict, or distort competition within the internal market.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:12012E101",
  },
  {
    id: "tfeu-102",
    name: "TFEU Article 102",
    jurisdiction: "EU",
    citation: "Art. 102 TFEU",
    summary:
      "Prohibits abuse of a dominant position — including unfair pricing, limiting production, tying, and refusing access in some circumstances.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:12012E102",
  },
  {
    id: "eu-merger",
    name: "EU Merger Regulation",
    jurisdiction: "EU",
    citation: "Reg. (EC) No 139/2004",
    summary:
      "Controls concentrations with an EU dimension that would significantly impede effective competition.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32004R0139",
  },
  {
    id: "dma",
    name: "Digital Markets Act",
    jurisdiction: "EU",
    citation: "Reg. (EU) 2022/1925",
    summary:
      "Ex-ante rules for designated gatekeepers: self-preferencing, interoperability, data use, sideloading, and fairness obligations — parallel to classic antitrust.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022R1925",
  },
  {
    id: "uk-ca98-ch1",
    name: "UK Competition Act 1998 Chapter I",
    jurisdiction: "Other",
    citation: "Competition Act 1998, Ch. I",
    summary:
      "UK prohibition on agreements and concerted practices that prevent, restrict, or distort competition — the domestic counterpart to TFEU Article 101, enforced by the CMA against firms of any size.",
    url: "https://www.legislation.gov.uk/ukpga/1998/41/part/I/chapter/I",
  },
];

export const lawById = Object.fromEntries(laws.map((l) => [l.id, l])) as Record<
  string,
  LawRef
>;
