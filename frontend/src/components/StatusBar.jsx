import React from "react";
import { CheckCircle2, Terminal } from "lucide-react";

export function StatusBar({
  cursor,
  content,
  activeFileName,
  zoom,
  onZoomIn,
  onZoomOut
}) {
  const lineCount = content.split("\n").length;
  const charCount = content.length;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <div className="statusbar-container linux-statusbar">
      <div className="statusbar-left">
        <div className="statusbar-item" style={{ fontFamily: "var(--font-code)", color: "var(--accent-primary)" }}>
          <Terminal size={12} />
          <span>~/practicals/{activeFileName}</span>
        </div>

        <div className="statusbar-item">
          <span>Ln {cursor.line}, Col {cursor.col}</span>
        </div>

        <div className="statusbar-item">
          <span>{lineCount} lines</span>
        </div>

        <div className="statusbar-item">
          <span>{charCount} chars ({wordCount} words)</span>
        </div>
      </div>

      <div className="statusbar-right">
        <div className="statusbar-item" title="Zoom level">
          <span onClick={onZoomOut} style={{ cursor: "pointer", padding: "0 2px" }}>-</span>
          <span>{zoom}%</span>
          <span onClick={onZoomIn} style={{ cursor: "pointer", padding: "0 2px" }}>+</span>
        </div>

        <div className="statusbar-item">
          <span>Linux (LF)</span>
        </div>

        <div className="statusbar-item">
          <span>UTF-8</span>
        </div>

        <div className="statusbar-item" style={{ color: "var(--color-success)", fontWeight: 500 }}>
          <CheckCircle2 size={12} />
          <span>python3</span>
        </div>
      </div>
    </div>
  );
}
