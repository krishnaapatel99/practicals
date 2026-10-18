import React, { useState } from "react";
import { Terminal as TermIcon, BarChart2, Trash2, Copy, ChevronUp, ChevronDown, Check } from "lucide-react";

export function Terminal({
  isOpen,
  onToggle,
  logs,
  plots,
  onClear,
  onCopyLogs,
  copied
}) {
  const [activeTab, setActiveTab] = useState("console"); // "console" | "plots"

  if (!isOpen) return null;

  return (
    <div className="terminal-container">
      {/* Terminal Title Bar */}
      <div className="terminal-header">
        <div className="terminal-tabs">
          <button
            className={`terminal-tab-btn ${activeTab === "console" ? "active" : ""}`}
            onClick={() => setActiveTab("console")}
          >
            <TermIcon size={13} />
            Terminal Output
          </button>

          <button
            className={`terminal-tab-btn ${activeTab === "plots" ? "active" : ""}`}
            onClick={() => setActiveTab("plots")}
          >
            <BarChart2 size={13} />
            Matplotlib Plots ({plots.length})
          </button>
        </div>

        <div className="terminal-actions">
          {activeTab === "console" && (
            <>
              <button className="window-ctrl-btn" title="Copy Output" onClick={onCopyLogs}>
                {copied ? <Check size={13} color="var(--color-success)" /> : <Copy size={13} />}
              </button>
              <button className="window-ctrl-btn" title="Clear Console" onClick={onClear}>
                <Trash2 size={13} />
              </button>
            </>
          )}

          <button
            className="window-ctrl-btn"
            title="Collapse Terminal"
            onClick={onToggle}
          >
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      {activeTab === "console" ? (
        <div className="terminal-body">
          {logs || "Ready. Click 'Run (F5)' or use menu to execute the script."}
        </div>
      ) : (
        <div className="plots-container">
          {plots.length === 0 ? (
            <div style={{ color: "var(--text-dim)", fontSize: 13, padding: 12 }}>
              No visual figures generated yet. Run scripts containing Matplotlib plots (Exp 2, 5, 6A, 6B, 7).
            </div>
          ) : (
            plots.map((plot, idx) => (
              <div key={idx} className="plot-card">
                <div className="plot-card-title">{plot.title}</div>

                {plot.type === "scatter" && (
                  <svg width="290" height="180" viewBox="0 0 290 180" style={{ background: "rgba(0,0,0,0.3)", borderRadius: 4 }}>
                    {/* Grid lines */}
                    <line x1="30" y1="20" x2="30" y2="150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="30" y1="150" x2="270" y2="150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                    {/* Scatter points */}
                    {plot.data.map((pt, pIdx) => {
                      const cx = 40 + (pt.x / 11) * 210;
                      const cy = 145 - (pt.y / 11) * 120;
                      const color = pt.cluster === 0 ? "#3b82f6" : pt.cluster === 1 ? "#10b981" : "#ef4444";

                      return (
                        <g key={pIdx}>
                          <circle cx={cx} cy={cy} r="6" fill={color} stroke="#ffffff" strokeWidth="1.5" />
                          <text x={cx + 8} y={cy + 3} fill="#a1a1aa" fontSize="9" fontFamily="monospace">
                            ({pt.x},{pt.y})
                          </text>
                        </g>
                      );
                    })}

                    <text x="35" y="170" fill="#71717a" fontSize="10">X-Axis</text>
                    <text x="240" y="170" fill="#71717a" fontSize="10">Y-Axis</text>
                  </svg>
                )}

                {plot.type === "dendrogram" && (
                  <svg width="290" height="180" viewBox="0 0 290 180" style={{ background: "rgba(0,0,0,0.3)", borderRadius: 4 }}>
                    {/* Tree branches */}
                    <path d="M 50 140 L 50 80 L 100 80 L 100 140" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    <path d="M 160 140 L 160 60 L 220 60 L 220 140" fill="none" stroke="#34d399" strokeWidth="2" />
                    <path d="M 75 80 L 75 30 L 190 30 L 190 60" fill="none" stroke="#f472b6" strokeWidth="2" />

                    {/* Leaf labels */}
                    {["P0", "P1", "P2", "P3", "P4", "P5"].map((lbl, lIdx) => (
                      <text key={lIdx} x={45 + lIdx * 35} y="160" fill="#e4e4e7" fontSize="10" fontFamily="monospace">
                        {lbl}
                      </text>
                    ))}
                    <text x="10" y="20" fill="#a1a1aa" fontSize="10">Dist: 2.0</text>
                    <text x="10" y="75" fill="#a1a1aa" fontSize="10">Dist: 1.4</text>
                  </svg>
                )}

                {plot.type === "tree" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11 }}>
                    {plot.nodes.map((node, nIdx) => (
                      <div
                        key={nIdx}
                        style={{
                          background: "rgba(59, 130, 246, 0.15)",
                          border: "1px solid var(--accent-primary)",
                          borderRadius: 4,
                          padding: "6px 8px"
                        }}
                      >
                        <div style={{ fontWeight: 600, color: "#93c5fd" }}>{node.name}</div>
                        <div style={{ color: "var(--text-muted)", fontSize: 10 }}>
                          gini = {node.gini} | samples = {node.samples} | class = {node.class}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {plot.type === "pca" && (
                  <svg width="290" height="180" viewBox="0 0 290 180" style={{ background: "rgba(0,0,0,0.3)", borderRadius: 4 }}>
                    {/* Axes */}
                    <line x1="145" y1="20" x2="145" y2="160" stroke="rgba(255,255,255,0.15)" strokeDasharray="3,3" />
                    <line x1="20" y1="90" x2="270" y2="90" stroke="rgba(255,255,255,0.15)" strokeDasharray="3,3" />

                    {/* Synthetic PCA Clusters: Setosa, Versicolor, Virginica */}
                    {Array.from({ length: 15 }).map((_, i) => (
                      <circle key={`s-${i}`} cx={60 + (i % 5) * 14 + Math.sin(i) * 8} cy={90 + Math.cos(i) * 25} r="3.5" fill="#ef4444" opacity="0.85" />
                    ))}
                    {Array.from({ length: 15 }).map((_, i) => (
                      <circle key={`ve-${i}`} cx={145 + (i % 5) * 14 + Math.sin(i) * 10} cy={75 + Math.cos(i) * 20} r="3.5" fill="#10b981" opacity="0.85" />
                    ))}
                    {Array.from({ length: 15 }).map((_, i) => (
                      <circle key={`vi-${i}`} cx={200 + (i % 5) * 12 + Math.sin(i) * 12} cy={110 + Math.cos(i) * 22} r="3.5" fill="#3b82f6" opacity="0.85" />
                    ))}

                    <text x="235" y="85" fill="#93c5fd" fontSize="10">PC1</text>
                    <text x="150" y="25" fill="#93c5fd" fontSize="10">PC2</text>
                    <text x="25" y="170" fill="#a1a1aa" fontSize="10">{plot.variance}</text>
                  </svg>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
