import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../styles/index.js';
import type { HomeAssistant, ResolvedEntityConfig, EventDialogState } from '../types/index.js';
import { dayjs } from '../utils/index.js';

@customElement('msc-event-dialog')
export class EventDialog extends LitElement {
  static styles = [baseStyles];

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) entities: ResolvedEntityConfig[] = [];
  @property({ attribute: false }) state!: EventDialogState;

  @state() private _title = '';
  @state() private _description = '';
  @state() private _location = '';
  @state() private _startDate = '';
  @state() private _startTime = '';
  @state() private _endDate = '';
  @state() private _endTime = '';
  @state() private _allDay = false;
  @state() private _entityId = '';
  @state() private _saving = false;
  @state() private _deleting = false;

  updated(changed: Map<string, unknown>) {
    if (changed.has('state') && this.state?.open) {
      this._populate();
    }
  }

  private _populate() {
    const { event, defaultDate, defaultEntityId } = this.state;
    const writableEntities = this.entities.filter(e => !e.readonly);

    if (event) {
      // Edit mode
      this._title = event.summary;
      this._description = event.description || '';
      this._location = event.location || '';
      this._entityId = event.entityId;
      this._allDay = event.allDay;
      if (event.allDay) {
        this._startDate = event.start.date || '';
        this._endDate = event.end.date || '';
        this._startTime = '';
        this._endTime = '';
      } else {
        const s = dayjs(event.start.dateTime);
        const e = dayjs(event.end.dateTime);
        this._startDate = s.format('YYYY-MM-DD');
        this._startTime = s.format('HH:mm');
        this._endDate = e.format('YYYY-MM-DD');
        this._endTime = e.format('HH:mm');
      }
    } else {
      // Add mode
      const base = defaultDate ? dayjs(defaultDate) : dayjs();
      this._title = '';
      this._description = '';
      this._location = '';
      this._entityId = defaultEntityId || writableEntities[0]?.entityId || '';
      this._allDay = false;
      this._startDate = base.format('YYYY-MM-DD');
      this._startTime = base.hour(9).minute(0).format('HH:mm');
      this._endDate = base.format('YYYY-MM-DD');
      this._endTime = base.hour(10).minute(0).format('HH:mm');
    }
  }

  private _close() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  private _backdrop(e: Event) {
    if (e.target === e.currentTarget) this._close();
  }

  private async _save() {
    if (!this._title.trim()) return;
    this._saving = true;

    const entityId = this._entityId;
    const isEdit = !!this.state.event;

    let startDt: string;
    let endDt: string;

    if (this._allDay) {
      startDt = this._startDate;
      endDt = this._endDate || this._startDate;
    } else {
      startDt = `${this._startDate}T${this._startTime}:00`;
      endDt = `${this._endDate}T${this._endTime}:00`;
    }

    try {
      if (isEdit && this.state.event) {
        const serviceData: Record<string, unknown> = {
          entity_id: entityId,
          uid: this.state.event.uid,
          summary: this._title.trim(),
          description: this._description || undefined,
          location: this._location || undefined,
          start_date_time: this._allDay ? undefined : startDt,
          end_date_time: this._allDay ? undefined : endDt,
          start_date: this._allDay ? startDt : undefined,
          end_date: this._allDay ? endDt : undefined,
        };
        if (this.state.event.recurrenceId) serviceData.recurrence_id = this.state.event.recurrenceId;

        // Try WebSocket first (dtstart/dtend format), fall back to callService
        try {
          const wsPayload: Record<string, unknown> = {
            type: 'calendar/event/update',
            entity_id: entityId,
            uid: this.state.event.uid,
            event: {
              summary: this._title.trim(),
              dtstart: startDt,
              dtend: endDt,
              ...(this._description ? { description: this._description } : {}),
              ...(this._location ? { location: this._location } : {}),
            },
          };
          if (this.state.event.recurrenceId) wsPayload.recurrence_id = this.state.event.recurrenceId;
          await this.hass.connection.sendMessagePromise(wsPayload);
        } catch {
          await this.hass.callService('calendar', 'update_event', serviceData);
        }
      } else {
        // Try WebSocket API first
        const wsPayload: Record<string, unknown> = {
          type: 'calendar/event/create',
          entity_id: entityId,
          event: {
            summary: this._title.trim(),
            description: this._description || undefined,
            location: this._location || undefined,
            ...(this._allDay
              ? { start: { date: startDt }, end: { date: endDt } }
              : { start: { dateTime: startDt }, end: { dateTime: endDt } }),
          },
        };

        try {
          await this.hass.connection.sendMessagePromise(wsPayload);
        } catch {
          // Fallback to service call
          const data: Record<string, unknown> = {
            entity_id: entityId,
            summary: this._title.trim(),
            description: this._description || undefined,
            location: this._location || undefined,
            start_date_time: this._allDay ? undefined : startDt,
            end_date_time: this._allDay ? undefined : endDt,
            start_date: this._allDay ? startDt : undefined,
            end_date: this._allDay ? endDt : undefined,
          };
          await this.hass.callService('calendar', 'create_event', data);
        }
      }

      this.dispatchEvent(new CustomEvent('saved', { detail: { entityId } }));
      this._close();
    } catch (e) {
      console.error('[msc-event-dialog] save error', e);
    } finally {
      this._saving = false;
    }
  }

  private async _delete() {
    if (!this.state.event) return;
    this._deleting = true;
    const entityId = this.state.event.entityId;
    const uid = this.state.event.uid;
    const recurrenceId = this.state.event.recurrenceId;

    try {
      // Try WebSocket API first (works for Google Calendar)
      const wsPayload: Record<string, unknown> = {
        type: 'calendar/event/delete',
        entity_id: entityId,
        uid,
      };
      if (recurrenceId) wsPayload.recurrence_id = recurrenceId;

      try {
        await this.hass.connection.sendMessagePromise(wsPayload);
      } catch {
        // Fallback to service call
        const data: Record<string, unknown> = { entity_id: entityId, uid };
        if (recurrenceId) data.recurrence_id = recurrenceId;
        await this.hass.callService('calendar', 'delete_event', data);
      }

      this.dispatchEvent(new CustomEvent('saved', { detail: { entityId } }));
      this._close();
    } catch (e) {
      console.error('[msc-event-dialog] delete error', e);
    } finally {
      this._deleting = false;
    }
  }

  render() {
    if (!this.state?.open) return nothing;
    const isEdit = this.state.mode === 'edit';
    const writableEntities = this.entities.filter(e => !e.readonly);
    const canSave = this._title.trim().length > 0 && !this._saving;

    return html`
      <div class="dialog-backdrop" @click=${this._backdrop}>
        <div class="dialog" role="dialog" aria-modal="true">
          <div class="dialog-header">
            <h2 class="dialog-title">${isEdit ? 'Edit Event' : 'New Event'}</h2>
            <button class="btn icon-only" @click=${this._close} title="Close">✕</button>
          </div>

          <div class="dialog-body">
            <div class="form-field">
              <label class="form-label">Title</label>
              <input
                class="form-input"
                type="text"
                placeholder="Event title"
                .value=${this._title}
                @input=${(e: Event) => this._title = (e.target as HTMLInputElement).value}
                @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && canSave && this._save()}
                autofocus
              />
            </div>

            ${writableEntities.length > 1 ? html`
              <div class="form-field">
                <label class="form-label">Calendar</label>
                <select class="form-input" .value=${this._entityId}
                  @change=${(e: Event) => this._entityId = (e.target as HTMLSelectElement).value}>
                  ${writableEntities.map(ent => html`
                    <option value=${ent.entityId} ?selected=${ent.entityId === this._entityId}>
                      ${ent.name}
                    </option>
                  `)}
                </select>
              </div>
            ` : nothing}

            <div class="form-field">
              <label class="form-label">
                <input
                  type="checkbox"
                  .checked=${this._allDay}
                  @change=${(e: Event) => this._allDay = (e.target as HTMLInputElement).checked}
                />
                All day
              </label>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
              <div class="form-field">
                <label class="form-label">Start date</label>
                <input class="form-input" type="date" .value=${this._startDate}
                  @change=${(e: Event) => this._startDate = (e.target as HTMLInputElement).value} />
              </div>
              ${!this._allDay ? html`
                <div class="form-field">
                  <label class="form-label">Start time</label>
                  <input class="form-input" type="time" .value=${this._startTime}
                    @change=${(e: Event) => this._startTime = (e.target as HTMLInputElement).value} />
                </div>
              ` : nothing}
              <div class="form-field">
                <label class="form-label">End date</label>
                <input class="form-input" type="date" .value=${this._endDate}
                  @change=${(e: Event) => this._endDate = (e.target as HTMLInputElement).value} />
              </div>
              ${!this._allDay ? html`
                <div class="form-field">
                  <label class="form-label">End time</label>
                  <input class="form-input" type="time" .value=${this._endTime}
                    @change=${(e: Event) => this._endTime = (e.target as HTMLInputElement).value} />
                </div>
              ` : nothing}
            </div>

            <div class="form-field">
              <label class="form-label">Description</label>
              <textarea class="form-input" rows="2" placeholder="Optional description"
                .value=${this._description}
                @input=${(e: Event) => this._description = (e.target as HTMLTextAreaElement).value}
              ></textarea>
            </div>

            <div class="form-field">
              <label class="form-label">Location</label>
              <input class="form-input" type="text" placeholder="Optional location"
                .value=${this._location}
                @input=${(e: Event) => this._location = (e.target as HTMLInputElement).value} />
            </div>
          </div>

          <div class="dialog-footer">
            ${isEdit ? html`
              <button class="btn" style="color:var(--msc-pink);margin-right:auto"
                @click=${this._delete} ?disabled=${this._deleting}>
                ${this._deleting ? '…' : 'Delete'}
              </button>
            ` : nothing}
            <button class="btn" @click=${this._close}>Cancel</button>
            <button class="btn btn-primary" @click=${this._save} ?disabled=${!canSave}>
              ${this._saving ? '…' : isEdit ? 'Save' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'msc-event-dialog': EventDialog;
  }
}
