-- CounterLayer: case engagement (run in Supabase SQL editor)
-- Enables likes, dislikes, read counts, and comments for precedent desk cases.

create table if not exists case_stats (
  case_id text primary key,
  likes integer not null default 0,
  dislikes integer not null default 0,
  reads integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists case_votes (
  case_id text not null,
  visitor_id text not null,
  vote text not null check (vote in ('like', 'dislike')),
  created_at timestamptz not null default now(),
  primary key (case_id, visitor_id)
);

create table if not exists case_comments (
  id uuid primary key default gen_random_uuid(),
  case_id text not null,
  visitor_id text not null,
  author_name text not null,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

create index if not exists case_comments_case_id_idx on case_comments (case_id, created_at desc);
create index if not exists case_votes_case_id_idx on case_votes (case_id);

alter table case_stats enable row level security;
alter table case_votes enable row level security;
alter table case_comments enable row level security;

-- Public read
create policy "case_stats_read" on case_stats for select using (true);
create policy "case_votes_read" on case_votes for select using (true);
create policy "case_comments_read" on case_comments for select using (true);

-- Anon write (tighten later with auth if needed)
create policy "case_stats_upsert" on case_stats for insert with check (true);
create policy "case_stats_update" on case_stats for update using (true);
create policy "case_votes_upsert" on case_votes for insert with check (true);
create policy "case_votes_update" on case_votes for update using (true);
create policy "case_votes_delete" on case_votes for delete using (true);
create policy "case_comments_insert" on case_comments for insert with check (true);

-- Atomic helpers
create or replace function increment_case_read(p_case_id text)
returns case_stats
language plpgsql
as $$
declare
  result case_stats;
begin
  insert into case_stats (case_id, reads)
  values (p_case_id, 1)
  on conflict (case_id) do update
    set reads = case_stats.reads + 1,
        updated_at = now()
  returning * into result;
  return result;
end;
$$;

create or replace function apply_case_vote(p_case_id text, p_visitor_id text, p_vote text)
returns case_stats
language plpgsql
as $$
declare
  prev text;
  result case_stats;
begin
  if p_vote not in ('like', 'dislike') then
    raise exception 'invalid vote';
  end if;

  select vote into prev from case_votes
  where case_id = p_case_id and visitor_id = p_visitor_id;

  insert into case_stats (case_id) values (p_case_id)
  on conflict (case_id) do nothing;

  if prev is null then
    insert into case_votes (case_id, visitor_id, vote) values (p_case_id, p_visitor_id, p_vote);
    if p_vote = 'like' then
      update case_stats set likes = likes + 1, updated_at = now() where case_id = p_case_id;
    else
      update case_stats set dislikes = dislikes + 1, updated_at = now() where case_id = p_case_id;
    end if;
  elsif prev = p_vote then
    delete from case_votes where case_id = p_case_id and visitor_id = p_visitor_id;
    if p_vote = 'like' then
      update case_stats set likes = greatest(likes - 1, 0), updated_at = now() where case_id = p_case_id;
    else
      update case_stats set dislikes = greatest(dislikes - 1, 0), updated_at = now() where case_id = p_case_id;
    end if;
  else
    update case_votes set vote = p_vote where case_id = p_case_id and visitor_id = p_visitor_id;
    if p_vote = 'like' then
      update case_stats
        set likes = likes + 1,
            dislikes = greatest(dislikes - 1, 0),
            updated_at = now()
      where case_id = p_case_id;
    else
      update case_stats
        set dislikes = dislikes + 1,
            likes = greatest(likes - 1, 0),
            updated_at = now()
      where case_id = p_case_id;
    end if;
  end if;

  select * into result from case_stats where case_id = p_case_id;
  return result;
end;
$$;

grant execute on function increment_case_read(text) to anon, authenticated;
grant execute on function apply_case_vote(text, text, text) to anon, authenticated;
