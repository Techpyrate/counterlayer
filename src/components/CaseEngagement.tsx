"use client";

import { useEffect, useState } from "react";
import {
  castCaseVote,
  fetchCaseEngagement,
  postCaseComment,
  recordCaseRead,
  type CaseComment,
  type CaseStats,
} from "@/lib/supabase";

export function CaseEngagement({ caseId }: { caseId: string }) {
  const [stats, setStats] = useState<CaseStats>({
    case_id: caseId,
    likes: 0,
    dislikes: 0,
    reads: 0,
  });
  const [myVote, setMyVote] = useState<"like" | "dislike" | null>(null);
  const [comments, setComments] = useState<CaseComment[]>([]);
  const [backend, setBackend] = useState<"supabase" | "local">("local");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const readStats = await recordCaseRead(caseId);
        const engagement = await fetchCaseEngagement(caseId);
        if (cancelled) return;
        setStats({ ...engagement.stats, reads: Math.max(engagement.stats.reads, readStats.reads) });
        setComments(engagement.comments);
        setMyVote(engagement.myVote);
        setBackend(engagement.backend);
      } catch {
        if (!cancelled) setError("Could not load engagement data.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [caseId]);

  async function onVote(vote: "like" | "dislike") {
    setBusy(true);
    setError(null);
    try {
      const result = await castCaseVote(caseId, vote);
      setStats(result.stats);
      setMyVote(result.myVote);
    } catch {
      setError("Vote failed. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function onComment(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const comment = await postCaseComment(
        caseId,
        name.trim() || "Reader",
        body.trim(),
      );
      setComments((prev) => [comment, ...prev]);
      setBody("");
    } catch {
      setError("Comment failed. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-14 space-y-8 border-t border-[var(--line)] pt-10">
      <div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
          Reader signals
        </h2>
        <p className="mt-2 text-sm text-mute">
          {stats.reads.toLocaleString()} read{stats.reads === 1 ? "" : "s"}
          {" · "}
          synced via {backend === "supabase" ? "Supabase" : "local demo storage"}
          {backend === "local" && (
            <>
              {" "}
              — add <code className="text-xs">NEXT_PUBLIC_SUPABASE_*</code> to
              enable shared likes and comments
            </>
          )}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={busy}
          onClick={() => onVote("like")}
          className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
            myVote === "like"
              ? "border-ink bg-ink text-fog"
              : "border-[var(--line)] hover:bg-fog"
          }`}
        >
          Helpful · {stats.likes}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => onVote("dislike")}
          className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
            myVote === "dislike"
              ? "border-ink bg-ink text-fog"
              : "border-[var(--line)] hover:bg-fog"
          }`}
        >
          Not helpful · {stats.dislikes}
        </button>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-mute">
          Comments
        </h3>
        <form onSubmit={onComment} className="mt-4 space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Display name (optional)"
            className="w-full rounded-xl border border-[var(--line)] bg-paper/80 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-signal/30"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder="Share a question, correction, or why this case matters to you…"
            className="w-full rounded-xl border border-[var(--line)] bg-paper/80 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-signal/30"
          />
          <button
            type="submit"
            disabled={busy || !body.trim()}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-fog disabled:opacity-40"
          >
            Post comment
          </button>
        </form>
        {error && <p className="mt-3 text-sm text-danger">{error}</p>}

        <ul className="mt-6 space-y-4">
          {comments.map((c) => (
            <li
              key={c.id}
              className="border-t border-[var(--line)] pt-4 text-sm text-ink-soft"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-semibold text-ink">{c.author_name}</span>
                <time className="text-xs text-mute">
                  {new Date(c.created_at).toLocaleString()}
                </time>
              </div>
              <p className="mt-2 leading-relaxed whitespace-pre-wrap">{c.body}</p>
            </li>
          ))}
          {comments.length === 0 && (
            <p className="text-sm text-mute">No comments yet — start the thread.</p>
          )}
        </ul>
      </div>
    </section>
  );
}
