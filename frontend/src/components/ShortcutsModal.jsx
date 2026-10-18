import React from "react";
import { X, Keyboard } from "lucide-react";

export function ShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: "F11 / F", desc: "Expand to full screen dimension" },
    { key: "Ctrl + S", desc: "Save current file" },
    { key: "Ctrl + F", desc: "Open Find & Replace bar" },
    { key: "Ctrl + N", desc: "Create a new file tab" },
    { key: "Alt + Z", desc: "Toggle Word Wrap" },
    { key: "Tab", desc: "Insert 4-space Python indentation" },
    { key: "Esc", desc: "Close find bar or dialog / exit full screen" }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Keyboard size={18} color="var(--accent-primary)" />
            Keyboard Shortcuts
          </span>
          <button className="window-ctrl-btn" onClick={onClose}>
            <X size={14} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {shortcuts.map((s, idx) => (
            <div key={idx} className="shortcut-row">
              <span style={{ color: "var(--text-muted)" }}>{s.desc}</span>
              <kbd className="key-badge">{s.key}</kbd>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, textAlign: "right" }}>
          <button className="action-btn primary" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
