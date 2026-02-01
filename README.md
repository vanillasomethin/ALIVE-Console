# alive-signage-console

## Purpose
Modern minimal ops console for managing screens at scale: devices, stores, groups, content, playlists, schedules, monitoring, proof-of-play reporting + CSV exports.

## Tech stack
- Next.js
- Tailwind + shadcn/ui
- TanStack Table + virtualization
- Auth: your admin auth (JWT/session)
- API: talks to backend alive-signage-backend

## Folder structure (spec)
```
alive-signage-console/
  src/
    app/
      (auth)/
      dashboard/
      screens/
      stores/
      content/
      playlists/
      schedules/
      monitoring/
      reports/
    components/
      tables/
      filters/
      layout/
      forms/
    lib/
      api.ts
      auth.ts
      utils.ts
```

## UI modules (minimal but scalable)
### Dashboard
- Online/offline/needs attention counters
- Recent incidents

### Screens
- Virtualized table (5,000+ rows)
- Filters: status, group, store, city
- Bulk actions: assign playlist, force resync, move group

### Content
- Upload, tag, list
- Show duration/resolution/sha

### Playlists
- Simple ordering + weights
- Assign to campaign (optional)

### Schedules
- Assign playlist to group/device
- Daypart rules

### Monitoring
- Needs-attention queue: offline during hours, low storage, crash loops

### Reports
- Proof-of-play totals by campaign + date range
- Per-store breakdown
- Export CSV

## Acceptance tests (must pass)
- Screens table loads 5,000 devices fast (virtualized)
- Filters + bulk actions work
- Report totals match backend
- CSV export downloads and matches UI totals
