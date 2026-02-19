┌─────────────────────────────────────┐
│ USERS │
├─────────────────────────────────────┤
│ PK id (INTEGER) │
│ email (TEXT) UNIQUE │
│ password (TEXT) │
│ name (TEXT) │
│ role (TEXT) │
│ ↳ 'admin' | 'homeowner' │
│ phone (TEXT) │
│ address (TEXT) │
│ position (TEXT) │
│ community (TEXT) │
│ profile_image (TEXT) │
│ created_at (DATETIME) │
│ updated_at (DATETIME) │
└─────────────────────────────────────┘
│ │
│ 1 │ 1
│ │
│ │
│ N │ N
▼ ▼
┌────────────────────────────────────--─┐ ┌─────────────────────────────────────┐
│ MAINTENANCE_REQUESTS │ │ NOTIFICATIONS │
├─────────────────────────────────────┤ ├─────────────────────────────────────┤
│ PK id (TEXT) │ │ PK id (INTEGER) │
│ FK user_id (INTEGER) ────────┐ │ │ FK user_id (INTEGER) ────────┐ │
│ type (TEXT) │ │ │ type (TEXT) │ │
│ description (TEXT) │ │ │ title (TEXT) │ │
│ unit (TEXT) │ │ │ message (TEXT) │ │
│ address (TEXT) │ │ │ is_read (BOOLEAN) │ │
│ priority (TEXT) │ │ │ created_at (DATETIME) │ │
│ ↳ 'High'|'Medium'|'Low' │ │ └────────────────────────────────────┘
│ status (TEXT) │ │
│ ↳ 'pending'|'in-progress'| │
│ 'completed' │ │
│ assigned_technician (TEXT) │ │
│ technician_notes (TEXT) │ │
│ completion_notes (TEXT) │ │
│ completed_date (DATE) │ │
│ created_at (DATETIME) │ │
│ updated_at (DATETIME) │ │
└─────────────────────────────────────┘
│
│ 1
│
│
│ N
▼
┌─────────────────────────────────────┐
│ MESSAGES │
├─────────────────────────────────────┤
│ PK id (INTEGER) │
│ FK request_id (TEXT) ──────────┐ │
│ sender (TEXT) │ │
│ ↳ 'admin' | 'homeowner' │ │
│ message (TEXT) │ │
│ created_at (DATETIME) │ │
└─────────────────────────────────────┘
