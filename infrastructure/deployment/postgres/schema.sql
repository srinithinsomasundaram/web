create table if not exists projects (
    id text primary key,
    name text not null,
    created_at timestamptz not null default now()
);

create table if not exists repositories (
    id text primary key,
    project_id text not null references projects(id) on delete cascade,
    url text not null,
    created_at timestamptz not null default now()
);

create table if not exists scans (
    id text primary key,
    project_id text not null references projects(id) on delete cascade,
    repository_id text not null references repositories(id) on delete cascade,
    score integer not null,
    max_severity text not null,
    scan_type text not null,
    created_at timestamptz not null
);

create table if not exists findings (
    id text primary key,
    scan_id text not null references scans(id) on delete cascade,
    project_id text not null references projects(id) on delete cascade,
    repository_id text not null references repositories(id) on delete cascade,
    scanner text not null,
    rule_id text not null,
    title text not null,
    description text not null,
    severity text not null,
    file_path text not null,
    line_start integer,
    line_end integer,
    fingerprint text not null,
    created_at timestamptz not null
);

create table if not exists fixes (
    id text primary key,
    project_id text not null references projects(id) on delete cascade,
    finding_id text not null,
    provider text not null,
    patch text not null,
    explanation text not null,
    created_at timestamptz not null default now()
);

create table if not exists reviews (
    id text primary key,
    project_id text not null references projects(id) on delete cascade,
    repository_id text not null references repositories(id) on delete cascade,
    source text not null,
    target_label text not null,
    score integer not null,
    severity text not null,
    summary text not null,
    provider text not null,
    created_at timestamptz not null default now()
);

create table if not exists review_comments (
    id bigserial primary key,
    review_id text not null references reviews(id) on delete cascade,
    path text not null,
    line integer not null,
    severity text not null,
    message text not null,
    suggestion text
);

create table if not exists telemetry_events (
    event_id text primary key,
    anonymous_id text not null,
    event_name text not null,
    source text,
    properties jsonb not null,
    created_at timestamptz not null default now()
);
