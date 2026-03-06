import { css } from 'lit';

export const baseStyles = css`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :host {
    display: block;
    width: 100%;
    /* Surfaces */
    --msc-bg:           #0f0f13;
    --msc-surface:      #1a1a24;
    --msc-surface-2:    #22222f;
    --msc-surface-3:    #2a2a3a;
    --msc-border:       rgba(255,255,255,0.07);

    /* Text */
    --msc-text-primary:   #f0f0ff;
    --msc-text-secondary: rgba(240,240,255,0.55);
    --msc-text-disabled:  rgba(240,240,255,0.25);

    /* Neon accents */
    --msc-cyan:    #00e5ff;
    --msc-pink:    #ff4081;
    --msc-lime:    #c6ff00;
    --msc-orange:  #ff9100;
    --msc-purple:  #d500f9;
    --msc-green:   #00e676;
    --msc-yellow:  #ffea00;
    --msc-blue:    #2979ff;

    /* Accent (primary interactive) */
    --msc-accent:        var(--msc-cyan);
    --msc-accent-glow:   rgba(0,229,255,0.18);
    --msc-accent-dim:    rgba(0,229,255,0.10);

    /* Today highlight */
    --msc-today-bg:      rgba(0,229,255,0.12);
    --msc-today-border:  var(--msc-cyan);

    /* Radii */
    --msc-radius-sm:  6px;
    --msc-radius-md:  12px;
    --msc-radius-lg:  18px;
    --msc-radius-xl:  28px;

    /* Shadows */
    --msc-shadow-sm:  0 2px 8px rgba(0,0,0,0.4);
    --msc-shadow-md:  0 4px 20px rgba(0,0,0,0.6);
    --msc-shadow-glow: 0 0 16px var(--msc-accent-glow);

    /* Transitions */
    --msc-transition: 160ms cubic-bezier(0.4,0,0.2,1);
    --msc-transition-slow: 280ms cubic-bezier(0.4,0,0.2,1);

    /* Typography */
    --msc-font: -apple-system, 'Inter', 'Segoe UI', system-ui, sans-serif;
    --msc-font-size-xs:  10px;
    --msc-font-size-sm:  12px;
    --msc-font-size-md:  13px;
    --msc-font-size-lg:  15px;
    --msc-font-size-xl:  20px;
    --msc-font-size-2xl: 26px;

    display: block;
    font-family: var(--msc-font);
  }

  /* ── Root card wrapper ─────────────────────────────────────────────────── */
  .card {
    background: var(--msc-bg);
    border: 1px solid var(--msc-border);
    border-radius: var(--msc-radius-lg);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: var(--msc-shadow-md);
    height: 100%;
    min-height: 420px;
    color: var(--msc-text-primary);
    position: relative;
  }

  /* ── Header ────────────────────────────────────────────────────────────── */
  .header {
    background: var(--msc-surface);
    border-bottom: 1px solid var(--msc-border);
    padding: 12px 16px 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
  }

  .header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .header-title {
    font-size: var(--msc-font-size-xl);
    font-weight: 700;
    color: var(--msc-text-primary);
    letter-spacing: -0.3px;
    margin: 0;
    flex: 1;
  }

  .header-period {
    font-size: var(--msc-font-size-lg);
    font-weight: 600;
    color: var(--msc-accent);
    letter-spacing: -0.2px;
    cursor: pointer;
    transition: opacity var(--msc-transition);
  }
  .header-period:hover { opacity: 0.8; }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .header-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  /* ── Pill button (nav, view switcher) ──────────────────────────────────── */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border: none;
    background: var(--msc-surface-2);
    color: var(--msc-text-primary);
    border-radius: var(--msc-radius-xl);
    cursor: pointer;
    font-family: var(--msc-font);
    font-size: var(--msc-font-size-sm);
    font-weight: 500;
    transition: background var(--msc-transition), color var(--msc-transition), box-shadow var(--msc-transition);
    white-space: nowrap;
    padding: 6px 12px;
    height: 32px;
  }
  .btn:hover {
    background: var(--msc-surface-3);
  }
  .btn.active {
    background: var(--msc-accent-dim);
    color: var(--msc-accent);
    box-shadow: inset 0 0 0 1px var(--msc-accent);
  }
  .btn.icon-only {
    width: 32px;
    padding: 0;
  }
  .btn.btn-primary {
    background: var(--msc-accent);
    color: #000;
    font-weight: 700;
  }
  .btn.btn-primary:hover {
    box-shadow: var(--msc-shadow-glow);
  }

  /* ── View switcher group ────────────────────────────────────────────────── */
  .view-switcher {
    display: flex;
    background: var(--msc-surface-2);
    border-radius: var(--msc-radius-xl);
    padding: 3px;
    gap: 2px;
  }
  .view-switcher .btn {
    background: transparent;
    border-radius: var(--msc-radius-xl);
    font-size: var(--msc-font-size-sm);
    height: 26px;
    padding: 0 10px;
  }
  .view-switcher .btn.active {
    background: var(--msc-accent);
    color: #000;
    font-weight: 700;
    box-shadow: none;
  }

  /* ── Calendar badges/toggles ───────────────────────────────────────────── */
  .calendar-badges {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .calendar-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: var(--msc-radius-xl);
    font-size: var(--msc-font-size-sm);
    font-weight: 500;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all var(--msc-transition);
    color: var(--msc-text-primary);
    background: var(--msc-surface-2);
    user-select: none;
  }
  .calendar-badge:hover {
    background: var(--msc-surface-3);
  }
  .calendar-badge.active {
    border-color: var(--badge-color, var(--msc-accent));
    background: color-mix(in srgb, var(--badge-color, var(--msc-accent)) 12%, transparent);
    color: var(--badge-color, var(--msc-accent));
  }
  .calendar-badge .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--badge-color, var(--msc-accent));
    flex-shrink: 0;
    transition: opacity var(--msc-transition);
  }
  .calendar-badge:not(.active) .dot {
    opacity: 0.3;
  }

  /* ── Navigation arrows ─────────────────────────────────────────────────── */
  .nav-group {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: var(--msc-surface-2);
    color: var(--msc-text-primary);
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    transition: background var(--msc-transition), color var(--msc-transition);
  }
  .nav-btn:hover {
    background: var(--msc-surface-3);
    color: var(--msc-accent);
  }
  .today-btn {
    height: 30px;
    padding: 0 12px;
    border-radius: var(--msc-radius-xl);
    border: 1px solid var(--msc-border);
    background: transparent;
    color: var(--msc-text-secondary);
    font-family: var(--msc-font);
    font-size: var(--msc-font-size-sm);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--msc-transition);
  }
  .today-btn:hover {
    border-color: var(--msc-accent);
    color: var(--msc-accent);
  }

  /* ── Calendar body ─────────────────────────────────────────────────────── */
  .calendar-body {
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  /* ── Day headers row ───────────────────────────────────────────────────── */
  .day-headers {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-bottom: 1px solid var(--msc-border);
    padding: 0 2px;
  }
  .day-header-cell {
    text-align: center;
    padding: 8px 0 6px;
    font-size: var(--msc-font-size-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--msc-text-secondary);
  }

  /* ── Month grid ────────────────────────────────────────────────────────── */
  .month-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: minmax(80px, 1fr);
    gap: 1px;
    background: var(--msc-border);
    height: 100%;
    overflow-y: auto;
  }

  .day-cell {
    background: var(--msc-bg);
    padding: 5px 6px;
    overflow: hidden;
    cursor: pointer;
    transition: background var(--msc-transition);
    position: relative;
    min-height: 80px;
  }
  .day-cell:hover {
    background: var(--msc-surface-2);
  }
  .day-cell.other-month {
    background: color-mix(in srgb, var(--msc-bg) 60%, transparent);
  }
  .day-cell.other-month .day-number {
    color: var(--msc-text-disabled);
  }
  .day-cell.today {
    background: var(--msc-today-bg);
  }
  .day-cell.today .day-number {
    color: var(--msc-accent);
    font-weight: 800;
  }
  .day-cell.selected {
    background: var(--msc-surface-2);
    box-shadow: inset 0 0 0 1.5px var(--msc-accent);
  }

  .day-number {
    font-size: var(--msc-font-size-sm);
    font-weight: 600;
    color: var(--msc-text-secondary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-bottom: 3px;
    transition: all var(--msc-transition);
  }
  .day-cell.today .day-number {
    background: var(--msc-accent);
    color: #000;
    font-weight: 800;
  }

  /* ── Event pill (month view) ───────────────────────────────────────────── */
  .event-pill {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 1px 5px;
    border-radius: 4px;
    font-size: var(--msc-font-size-xs);
    font-weight: 500;
    margin-bottom: 2px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: opacity var(--msc-transition), transform var(--msc-transition);
    color: #000;
    will-change: opacity, transform;
    animation: event-in var(--msc-transition-slow) ease both;
  }
  .event-pill:hover {
    filter: brightness(1.15);
    transform: translateY(-1px);
  }
  .event-pill.all-day {
    border-radius: 4px;
  }
  .event-pill.timed::before {
    content: '';
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(0,0,0,0.35);
    flex-shrink: 0;
  }
  .event-pill.removed {
    animation: event-out var(--msc-transition-slow) ease forwards;
  }

  .more-events-label {
    font-size: var(--msc-font-size-xs);
    color: var(--msc-text-secondary);
    cursor: pointer;
    padding: 1px 5px;
    border-radius: 4px;
    transition: background var(--msc-transition);
  }
  .more-events-label:hover {
    background: var(--msc-surface-2);
    color: var(--msc-accent);
  }

  /* ── Week view ─────────────────────────────────────────────────────────── */
  .week-grid {
    display: grid;
    grid-template-columns: 48px repeat(7, 1fr);
    height: 100%;
    overflow-y: auto;
    position: relative;
  }

  .week-time-gutter {
    grid-column: 1;
    position: sticky;
    left: 0;
    background: var(--msc-bg);
    z-index: 2;
    border-right: 1px solid var(--msc-border);
  }

  .week-time-label {
    height: 48px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 2px 8px 0 0;
    font-size: var(--msc-font-size-xs);
    color: var(--msc-text-disabled);
    font-weight: 500;
  }

  .week-day-column {
    border-right: 1px solid var(--msc-border);
    position: relative;
    min-height: 100%;
  }
  .week-day-column:last-child { border-right: none; }

  .week-day-header {
    position: sticky;
    top: 0;
    background: var(--msc-surface);
    border-bottom: 1px solid var(--msc-border);
    z-index: 1;
    text-align: center;
    padding: 8px 4px;
  }
  .week-day-name {
    font-size: var(--msc-font-size-xs);
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--msc-text-secondary);
  }
  .week-day-number {
    font-size: var(--msc-font-size-lg);
    font-weight: 700;
    color: var(--msc-text-primary);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-top: 2px;
    transition: all var(--msc-transition);
  }
  .week-day-number.today {
    background: var(--msc-accent);
    color: #000;
  }

  .week-hour-row {
    height: 48px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--msc-border);
    position: relative;
  }
  .week-hour-row.half::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: 1px dashed var(--msc-border);
    transform: translateY(24px);
  }

  .week-event {
    position: absolute;
    left: 2px;
    right: 2px;
    border-radius: var(--msc-radius-sm);
    padding: 2px 5px;
    font-size: var(--msc-font-size-xs);
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
    z-index: 1;
    color: #000;
    transition: filter var(--msc-transition), transform var(--msc-transition), opacity var(--msc-transition);
    animation: event-in var(--msc-transition-slow) ease both;
    will-change: opacity, transform;
  }
  .week-event:hover {
    filter: brightness(1.15);
    z-index: 2;
  }
  .week-event.removed {
    animation: event-out var(--msc-transition-slow) ease forwards;
  }

  .now-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--msc-pink);
    z-index: 3;
    pointer-events: none;
  }
  .now-line::before {
    content: '';
    position: absolute;
    left: -4px;
    top: -4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--msc-pink);
    box-shadow: 0 0 8px var(--msc-pink);
  }

  /* ── List / Schedule view ──────────────────────────────────────────────── */
  .list-view {
    overflow-y: auto;
    height: 100%;
    padding: 8px 0;
  }

  .list-date-group {
    padding: 0 16px;
  }

  .list-date-heading {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 0 6px;
    position: sticky;
    top: 0;
    background: var(--msc-bg);
    z-index: 1;
  }
  .list-date-heading .date-num {
    font-size: var(--msc-font-size-2xl);
    font-weight: 800;
    color: var(--msc-text-primary);
    line-height: 1;
    min-width: 36px;
  }
  .list-date-heading .date-meta {
    display: flex;
    flex-direction: column;
  }
  .list-date-heading .date-weekday {
    font-size: var(--msc-font-size-sm);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--msc-accent);
  }
  .list-date-heading .date-month {
    font-size: var(--msc-font-size-sm);
    color: var(--msc-text-secondary);
  }
  .list-date-heading.today .date-num {
    color: var(--msc-accent);
  }
  .list-date-heading.today .date-weekday {
    color: var(--msc-accent);
  }

  .list-event {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 10px;
    border-radius: var(--msc-radius-md);
    cursor: pointer;
    transition: background var(--msc-transition), transform var(--msc-transition);
    margin-bottom: 3px;
    animation: event-in var(--msc-transition-slow) ease both;
    will-change: opacity, transform;
  }
  .list-event:hover {
    background: var(--msc-surface-2);
  }
  .list-event.removed {
    animation: event-out var(--msc-transition-slow) ease forwards;
  }

  .list-event-color-bar {
    width: 4px;
    border-radius: 2px;
    align-self: stretch;
    flex-shrink: 0;
    min-height: 28px;
  }

  .list-event-content {
    flex: 1;
    overflow: hidden;
  }
  .list-event-title {
    font-size: var(--msc-font-size-md);
    font-weight: 600;
    color: var(--msc-text-primary);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .list-event-meta {
    font-size: var(--msc-font-size-sm);
    color: var(--msc-text-secondary);
    margin-top: 2px;
  }

  .list-empty {
    text-align: center;
    padding: 32px 16px;
    color: var(--msc-text-disabled);
    font-size: var(--msc-font-size-md);
  }

  /* ── Loading / spinner ─────────────────────────────────────────────────── */
  .loading-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15,15,19,0.6);
    backdrop-filter: blur(4px);
    z-index: 10;
    pointer-events: none;
    transition: opacity var(--msc-transition-slow);
  }
  .loading-overlay.hidden {
    opacity: 0;
  }
  .spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--msc-surface-3);
    border-top-color: var(--msc-accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  /* ── Event dialog ──────────────────────────────────────────────────────── */
  .dialog-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(6px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fade-in var(--msc-transition) ease;
  }

  .dialog {
    background: var(--msc-surface);
    border: 1px solid var(--msc-border);
    border-radius: var(--msc-radius-lg);
    box-shadow: var(--msc-shadow-md);
    width: min(480px, calc(100vw - 32px));
    max-height: calc(100vh - 64px);
    overflow-y: auto;
    animation: dialog-in var(--msc-transition-slow) cubic-bezier(0.34,1.56,0.64,1);
  }

  .dialog-header {
    padding: 20px 20px 12px;
    border-bottom: 1px solid var(--msc-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dialog-title {
    font-size: var(--msc-font-size-lg);
    font-weight: 700;
    color: var(--msc-text-primary);
    margin: 0;
  }

  .dialog-body {
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .dialog-footer {
    padding: 12px 20px 20px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    border-top: 1px solid var(--msc-border);
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .form-label {
    font-size: var(--msc-font-size-sm);
    font-weight: 600;
    color: var(--msc-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .form-input {
    background: var(--msc-surface-2);
    border: 1px solid var(--msc-border);
    border-radius: var(--msc-radius-sm);
    color: var(--msc-text-primary);
    font-family: var(--msc-font);
    font-size: var(--msc-font-size-md);
    padding: 8px 12px;
    transition: border-color var(--msc-transition);
    width: 100%;
    box-sizing: border-box;
  }
  .form-input:focus {
    outline: none;
    border-color: var(--msc-accent);
    box-shadow: 0 0 0 3px var(--msc-accent-glow);
  }
  .form-input option {
    background: var(--msc-surface-2);
  }

  /* ── Animations ────────────────────────────────────────────────────────── */
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes event-in {
    from { opacity: 0; transform: translateY(4px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes event-out {
    from { opacity: 1; transform: scale(1); max-height: 40px; margin-bottom: 2px; }
    to   { opacity: 0; transform: scale(0.9); max-height: 0; margin-bottom: 0; overflow: hidden; }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes dialog-in {
    from { opacity: 0; transform: translateY(20px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── Scrollbar styling ─────────────────────────────────────────────────── */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--msc-surface-3); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--msc-text-disabled); }
`;
