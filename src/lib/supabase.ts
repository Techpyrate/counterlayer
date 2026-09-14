import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return client;
}

export type CaseStats = {
  case_id: string;
  likes: number;
  dislikes: number;
  reads: number;
};

export type CaseComment = {
  id: string;
  case_id: string;
  visitor_id: string;
  author_name: string;
  body: string;
  created_at: string;
};

const LOCAL_PREFIX = "cw-case-";

function localStatsKey(caseId: string) {
  return `${LOCAL_PREFIX}stats-${caseId}`;
}
function localVoteKey(caseId: string, visitorId: string) {
  return `${LOCAL_PREFIX}vote-${caseId}-${visitorId}`;
}
function localCommentsKey(caseId: string) {
  return `${LOCAL_PREFIX}comments-${caseId}`;
}

function readLocalStats(caseId: string): CaseStats {
  if (typeof window === "undefined") {
    return { case_id: caseId, likes: 0, dislikes: 0, reads: 0 };
  }
  try {
    const raw = localStorage.getItem(localStatsKey(caseId));
    if (!raw) return { case_id: caseId, likes: 0, dislikes: 0, reads: 0 };
    return JSON.parse(raw) as CaseStats;
  } catch {
    return { case_id: caseId, likes: 0, dislikes: 0, reads: 0 };
  }
}

function writeLocalStats(stats: CaseStats) {
  localStorage.setItem(localStatsKey(stats.case_id), JSON.stringify(stats));
}

export function getVisitorId(): string {
  if (typeof window === "undefined") return "server";
  const key = "cw-visitor-id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export async function fetchCaseEngagement(caseId: string): Promise<{
  stats: CaseStats;
  comments: CaseComment[];
  myVote: "like" | "dislike" | null;
  backend: "supabase" | "local";
}> {
  const visitorId = getVisitorId();
  const supabase = getSupabase();

  if (supabase) {
    const [{ data: statsRow }, { data: comments }, { data: voteRow }] =
      await Promise.all([
        supabase.from("case_stats").select("*").eq("case_id", caseId).maybeSingle(),
        supabase
          .from("case_comments")
          .select("*")
          .eq("case_id", caseId)
          .order("created_at", { ascending: false })
          .limit(50),
        supabase
          .from("case_votes")
          .select("vote")
          .eq("case_id", caseId)
          .eq("visitor_id", visitorId)
          .maybeSingle(),
      ]);

    return {
      stats: (statsRow as CaseStats) ?? {
        case_id: caseId,
        likes: 0,
        dislikes: 0,
        reads: 0,
      },
      comments: (comments as CaseComment[]) ?? [],
      myVote: (voteRow?.vote as "like" | "dislike" | undefined) ?? null,
      backend: "supabase",
    };
  }

  const stats = readLocalStats(caseId);
  const vote = localStorage.getItem(localVoteKey(caseId, visitorId)) as
    | "like"
    | "dislike"
    | null;
  let comments: CaseComment[] = [];
  try {
    comments = JSON.parse(localStorage.getItem(localCommentsKey(caseId)) || "[]");
  } catch {
    comments = [];
  }
  return { stats, comments, myVote: vote, backend: "local" };
}

export async function recordCaseRead(caseId: string): Promise<CaseStats> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.rpc("increment_case_read", {
      p_case_id: caseId,
    });
    if (!error && data) return data as CaseStats;
  }
  const stats = readLocalStats(caseId);
  stats.reads += 1;
  writeLocalStats(stats);
  return stats;
}

export async function castCaseVote(
  caseId: string,
  vote: "like" | "dislike",
): Promise<{ stats: CaseStats; myVote: "like" | "dislike" | null }> {
  const visitorId = getVisitorId();
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.rpc("apply_case_vote", {
      p_case_id: caseId,
      p_visitor_id: visitorId,
      p_vote: vote,
    });
    if (!error && data) {
      const { data: voteRow } = await supabase
        .from("case_votes")
        .select("vote")
        .eq("case_id", caseId)
        .eq("visitor_id", visitorId)
        .maybeSingle();
      return {
        stats: data as CaseStats,
        myVote: (voteRow?.vote as "like" | "dislike" | undefined) ?? null,
      };
    }
  }

  const stats = readLocalStats(caseId);
  const key = localVoteKey(caseId, visitorId);
  const prev = localStorage.getItem(key) as "like" | "dislike" | null;

  if (prev === vote) {
    localStorage.removeItem(key);
    if (vote === "like") stats.likes = Math.max(0, stats.likes - 1);
    else stats.dislikes = Math.max(0, stats.dislikes - 1);
    writeLocalStats(stats);
    return { stats, myVote: null };
  }

  if (prev === "like") stats.likes = Math.max(0, stats.likes - 1);
  if (prev === "dislike") stats.dislikes = Math.max(0, stats.dislikes - 1);
  if (vote === "like") stats.likes += 1;
  else stats.dislikes += 1;
  localStorage.setItem(key, vote);
  writeLocalStats(stats);
  return { stats, myVote: vote };
}

export async function postCaseComment(
  caseId: string,
  authorName: string,
  body: string,
): Promise<CaseComment> {
  const visitorId = getVisitorId();
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("case_comments")
      .insert({
        case_id: caseId,
        visitor_id: visitorId,
        author_name: authorName.slice(0, 60),
        body: body.slice(0, 2000),
      })
      .select("*")
      .single();
    if (!error && data) return data as CaseComment;
  }

  const comment: CaseComment = {
    id: crypto.randomUUID(),
    case_id: caseId,
    visitor_id: visitorId,
    author_name: authorName.slice(0, 60) || "Reader",
    body: body.slice(0, 2000),
    created_at: new Date().toISOString(),
  };
  const existing: CaseComment[] = JSON.parse(
    localStorage.getItem(localCommentsKey(caseId)) || "[]",
  );
  existing.unshift(comment);
  localStorage.setItem(localCommentsKey(caseId), JSON.stringify(existing.slice(0, 50)));
  return comment;
}
