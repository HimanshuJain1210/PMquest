"use client";
import { useState, useEffect } from "react";
import { Icon } from "./Icon";
import { CURRICULUM } from "@/data/questions";
import {
  loadLocalNotes, saveLocalNotes,
  fetchRemoteNotes, upsertRemoteNote, deleteRemoteNote,
} from "@/lib/store";
import { track } from "@/lib/analytics";

export default function Notes({ user, onToast }) {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null); // note object or null
  const [loading, setLoading] = useState(true);

  async function reload() {
    setLoading(true);
    if (user) {
      const rows = await fetchRemoteNotes(user.id);
      setNotes(rows || []);
    } else {
      const obj = loadLocalNotes();
      setNotes(Object.values(obj).sort((a, b) => (b.updated_at || "").localeCompare(a.updated_at || "")));
    }
    setLoading(false);
  }
  useEffect(() => { reload(); }, [user]); // eslint-disable-line

  async function save(note) {
    const now = new Date().toISOString();
    if (user) {
      const saved = await upsertRemoteNote(user.id, note);
      if (saved) { setEditing(null); await reload(); }
    } else {
      const obj = loadLocalNotes();
      const id = note.id || `local_${Date.now()}`;
      obj[id] = { ...note, id, updated_at: now, created_at: note.created_at || now };
      saveLocalNotes(obj);
      setEditing(null);
      reload();
    }
    track("note_saved", { unit: note.unit || null, lesson: note.lesson || null });
    onToast?.("Note saved");
  }

  async function remove(note) {
    if (user) { await deleteRemoteNote(user.id, note.id); }
    else { const obj = loadLocalNotes(); delete obj[note.id]; saveLocalNotes(obj); }
    setEditing(null); reload();
  }

  if (editing) {
    return <Editor note={editing} onSave={save} onCancel={() => setEditing(null)} onDelete={editing.id ? remove : null} />;
  }

  return (
    <div className="wrap">
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontFamily: "var(--font-display)", margin: 0, fontSize: 24 }}>My notes</h2>
        <button className="btn sm" style={{ marginLeft: "auto" }} onClick={() => setEditing({ title: "", body: "", unit: "", lesson: "" })}>
          + New note
        </button>
      </div>
      {!user && (
        <div style={{ background: "#fff1ec", border: "1px solid var(--line)", borderRadius: 12, padding: 12, fontSize: 13, marginBottom: 16 }}>
          Notes are saved on this device. Sign in to sync them everywhere.
        </div>
      )}
      {loading ? (
        <div className="skel" style={{ height: 80 }} />
      ) : notes.length === 0 ? (
        <div className="empty">
          <div className="big-emoji">📓</div>
          <p>No notes yet. Capture your own takeaways as you learn — active recall sticks better when it's in your words.</p>
        </div>
      ) : (
        notes.map((n) => {
          const unit = CURRICULUM.find((u) => u.id === n.unit);
          return (
            <div className="note-item" key={n.id} onClick={() => setEditing(n)} style={{ cursor: "pointer" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: unit?.color || "var(--ink)", color: "#fff", display: "grid", placeItems: "center", flex: "none" }}>
                <Icon name="pencil" style={{ width: 18, height: 18 }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4>{n.title || "Untitled note"}</h4>
                <p style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{n.body}</p>
                <div className="note-meta">{unit ? unit.title : "General"} · {new Date(n.updated_at).toLocaleDateString()}</div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function Editor({ note, onSave, onCancel, onDelete }) {
  const [title, setTitle] = useState(note.title || "");
  const [body, setBody] = useState(note.body || "");
  const [unit, setUnit] = useState(note.unit || "");
  return (
    <div className="wrap">
      <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
        <button className="btn ghost sm" onClick={onCancel}>← Back</button>
        {onDelete && <button className="btn ghost sm" style={{ marginLeft: "auto", color: "var(--rose)" }} onClick={() => onDelete(note)}>Delete</button>}
      </div>
      <input className="input" placeholder="Note title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <select className="input" value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="">General</option>
        {CURRICULUM.map((u) => <option key={u.id} value={u.id}>{u.title}</option>)}
      </select>
      <textarea className="recall" style={{ minHeight: 240 }} placeholder="Write your notes…" value={body} onChange={(e) => setBody(e.target.value)} />
      <button className="btn" style={{ width: "100%", marginTop: 14 }} disabled={!title.trim() && !body.trim()} onClick={() => onSave({ ...note, title: title.trim() || "Untitled note", body, unit })}>
        Save note
      </button>
    </div>
  );
}
