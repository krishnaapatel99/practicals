import React from "react";
import { Folder, FileCode, BookOpen, Layers, ChevronDown } from "lucide-react";
import { EXPERIMENTS_LIST } from "../practicalsData";

export function Sidebar({ isOpen, onJumpToExperiment, activeFileName }) {
  if (!isOpen) return null;

  return (
    <div className={`sidebar-container ${isOpen ? "" : "collapsed"}`}>
      <div className="sidebar-header">
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Layers size={13} />
          ML Practicals (1-8)
        </span>
      </div>

      <div className="sidebar-section">
        {EXPERIMENTS_LIST.map((exp) => (
          <div
            key={exp.id}
            className="experiment-item"
            onClick={() => onJumpToExperiment(exp.num)}
            title={`Click to navigate to Experiment ${exp.num} in editor`}
          >
            <div className="experiment-badge">Exp {exp.num}</div>
            <div className="experiment-details">
              <div className="experiment-title">{exp.title}</div>
              <div className="experiment-desc">
                {exp.dataset} • {exp.metric}
              </div>
            </div>
          </div>
        ))}

        <div style={{ margin: "16px 0 8px 0", borderTop: "1px solid var(--border-subtle)" }} />

        <div className="sidebar-header" style={{ padding: "6px 4px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Folder size={13} />
            Workspace
          </span>
        </div>

        <div
          className="experiment-item"
          style={{ padding: "6px 8px" }}
        >
          <FileCode size={14} color="var(--accent-primary)" />
          <div className="experiment-details">
            <span style={{ fontSize: 12, color: "var(--text-main)" }}>exp/exps.py</span>
            <span style={{ fontSize: 10, color: "var(--color-success)" }}>Active File</span>
          </div>
        </div>
      </div>
    </div>
  );
}
