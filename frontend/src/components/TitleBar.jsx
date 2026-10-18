import React from "react";
import { Minus, Square, X, Sun, Moon } from "lucide-react";

export function TitleBar({ theme, setTheme, onExpandToScreen }) {
  const themes = [
    { id: "linux-gnome", name: "Ubuntu / GNOME Dark" },
    { id: "fluent-dark", name: "Dark Modern" },
    { id: "fluent-light", name: "Adwaita Light" },
    { id: "monokai", name: "Terminal Monokai" }
  ];

  return (
    <div className="window-titlebar">
      <div className="window-title-left"></div>

      <div className="window-title-center">
        usr@linux:~/practicals$
      </div>

      <div className="window-controls linux-controls">
        {/* Quick Theme Switcher */}
        <button
          className="window-ctrl-btn"
          title={`Switch Theme (Current: ${theme})`}
          onClick={() => {
            const nextIdx = (themes.findIndex(t => t.id === theme) + 1) % themes.length;
            setTheme(themes[nextIdx].id);
          }}
        >
          {theme === "fluent-light" ? <Moon size={13} /> : <Sun size={13} />}
        </button>

        {/* Linux Desktop Window Control Circles (Minimize, Maximize/Expand, Close) */}
        <button
          className="linux-btn linux-btn-min"
          title="Minimize"
        >
          <Minus size={9} strokeWidth={2.5} />
        </button>
        <button
          className="linux-btn linux-btn-max"
          title="Expand to Full Dimension (F11 / F)"
          onClick={onExpandToScreen}
        >
          <Square size={8} strokeWidth={2.5} />
        </button>
        <button
          className="linux-btn linux-btn-close"
          title="Close"
        >
          <X size={9} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
