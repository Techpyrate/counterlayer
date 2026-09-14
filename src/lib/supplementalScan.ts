/** CMS / platform fingerprints from HTML headers and markers. */
export function detectSitePlatform(html: string): string | null {
  const h = html.slice(0, 120_000).toLowerCase();
  if (/cdn\.shopify\.com|shopify\.theme|myshopify\.com/i.test(h)) return "Shopify";
  if (/wp-content|wordpress|wp-includes/i.test(h)) return "WordPress";
  if (/webflow\.js|webflow\.css|created in webflow/i.test(h)) return "Webflow";
  if (/squarespace\.com|squarespace-cdn/i.test(h)) return "Squarespace";
  if (/wix\.com|wixstatic\.com/i.test(h)) return "Wix";
  if (/ghost\.org|powered by ghost/i.test(h)) return "Ghost";
  if (/__next|_next\/static/i.test(h)) return "Next.js";
  return null;
}

export async function fetchSupplementalPage(
  url: string,
  cookieHeader?: string,
): Promise<{ text: string; html: string } | null> {
  try {
    const headers: Record<string, string> = {
      "User-Agent":
        "CounterLayerSiteScan/3.0 (+compliance scan; supplemental)",
      Accept: "text/html,application/xhtml+xml",
    };
    if (cookieHeader?.trim()) {
      headers.Cookie = cookieHeader.trim();
    }
    const res = await fetch(url, {
      redirect: "follow",
      headers,
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const html = (await res.text()).slice(0, 400_000);
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return { text, html };
  } catch {
    return null;
  }
}

/** Fetch public App Store / Play listing text when user supplies store URL. */
export async function fetchAppListingText(url: string): Promise<string | null> {
  const page = await fetchSupplementalPage(url);
  if (!page) return null;
  return page.text.slice(0, 80_000);
}

const CHECKOUT_PATHS = [
  "/pricing",
  "/plans",
  "/signup",
  "/sign-up",
  "/register",
  "/subscribe",
  "/checkout",
  "/cart",
  "/billing",
  "/account",
  "/settings",
  "/cancel",
  "/cancel-subscription",
];

export type CheckoutFlowProbe = {
  pagesChecked: string[];
  cancelLinkFound: boolean;
  refundMentionFound: boolean;
  notes: string[];
};

export async function probeCheckoutPaths(
  origin: string,
  cookieHeader?: string,
): Promise<CheckoutFlowProbe> {
  const pagesChecked: string[] = [];
  const notes: string[] = [];
  let cancelLinkFound = false;
  let refundMentionFound = false;

  for (const path of CHECKOUT_PATHS) {
    const url = new URL(path, origin).toString();
    const page = await fetchSupplementalPage(url, cookieHeader);
    if (!page) continue;
    pagesChecked.push(url);
    const blob = `${page.text} ${page.html}`.toLowerCase();
    if (/cancel.{0,40}(subscription|plan|account|membership)/i.test(blob)) {
      cancelLinkFound = true;
    }
    if (/how to cancel|cancel subscription|refund policy|money.?back/i.test(blob)) {
      refundMentionFound = true;
    }
    if (pagesChecked.length >= 8) break;
  }

  if (pagesChecked.length === 0) {
    notes.push("Checkout-path probe could not reach common signup/billing URLs.");
  } else if (!cancelLinkFound && !refundMentionFound) {
    notes.push(
      "Checkout-path probe: no cancel/refund signals on pricing/signup/billing pages checked.",
    );
  } else {
    notes.push(
      `Checkout-path probe: cancel signal ${cancelLinkFound ? "yes" : "no"}, refund signal ${refundMentionFound ? "yes" : "no"}.`,
    );
  }

  return { pagesChecked, cancelLinkFound, refundMentionFound, notes };
}
