# CounterLayer

Diligence tools and practical guides for competition, consumer protection, and public compliance.

## What it does

- **Report a problem** — consumer report pack with agency links and draft
- **Scan My Business** — founder/SMB/developer questionnaire + optional public website risk scan
- **My Rights** — role + situation intake → laws, pathways, evidence, similar cases
- **What Can I File?** — same engine focused on agency / private avenues
- **Similar Cases** — conduct-tag matching to curated precedent
- **Precedent desk** — searchable/filterable case library with long-form plain-English explainers
- **Company History** — competition records for seed companies
- **Live Cases** — ongoing matters in the dataset
- **Consumer Power / Before You Buy** — lock-in and switching scores
- **Creator scripts** — YouTube / Short / Newsletter / LinkedIn from an analysis brief
- **Reader signals** — likes, dislikes, comments, and read counts (Supabase or local demo)

**Positioning:** CounterLayer is a diligence and guidance platform — not a law firm, and not a substitute for counsel on your specific facts.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase (likes / comments / reads)

1. Create a Supabase project.
2. Run the SQL in [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor.
3. Copy `.env.local.example` → `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

4. Restart `npm run dev`.

Without env vars, engagement still works on **this browser** via localStorage so you can demo the UI.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Supabase · curated case library (100+ matters, 100+ companies)

Responsive layout works in mobile and desktop browsers. There is no separate native or desktop app.
