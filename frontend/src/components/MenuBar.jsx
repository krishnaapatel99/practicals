import React, { useState, useRef, useEffect } from "react";
import { Check } from "lucide-react";

export function MenuBar({
  onNewFile,
  onSave,
  onDownload,
  onCopyAll,
  onSelectAll,
  onToggleWordWrap,
  wordWrap,
  theme,
  setTheme,
  onOpenShortcuts,
  onExpandToScreen
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <div className="menubar-container" ref={menuRef}>
      <div className="menubar-menus">
        {/* File Menu */}
        <div className="menu-item">
          <button
            className={`menu-button ${openMenu === "file" ? "active" : ""}`}
            onClick={() => toggleMenu("file")}
          >
            File
          </button>
          {openMenu === "file" && (
            <div className="menu-dropdown">
              <button
                className="dropdown-item"
                onClick={() => { onNewFile(); setOpenMenu(null); }}
              >
                <span>New Tab</span>
                <span className="dropdown-shortcut">Ctrl+N</span>
              </button>
              <button
                className="dropdown-item"
                onClick={() => { onSave(); setOpenMenu(null); }}
              >
                <span>Save</span>
                <span className="dropdown-shortcut">Ctrl+S</span>
              </button>
              <button
                className="dropdown-item"
                onClick={() => { onDownload(); setOpenMenu(null); }}
              >
                <span>Save As / Export</span>
                <span className="dropdown-shortcut">Ctrl+Shift+S</span>
              </button>
              <div className="dropdown-divider" />
              <button
                className="dropdown-item"
                onClick={() => { onCopyAll(); setOpenMenu(null); }}
              >
                <span>Copy Entire Script</span>
                <span className="dropdown-shortcut">Ctrl+A & C</span>
              </button>
            </div>
          )}
        </div>

        {/* Edit Menu */}
        <div className="menu-item">
          <button
            className={`menu-button ${openMenu === "edit" ? "active" : ""}`}
            onClick={() => toggleMenu("edit")}
          >
            Edit
          </button>
          {openMenu === "edit" && (
            <div className="menu-dropdown">
              <button
                className="dropdown-item"
                onClick={() => { onSelectAll(); setOpenMenu(null); }}
              >
                <span>Select All</span>
                <span className="dropdown-shortcut">Ctrl+A</span>
              </button>
              <button
                className="dropdown-item"
                onClick={() => { onCopyAll(); setOpenMenu(null); }}
              >
                <span>Copy</span>
                <span className="dropdown-shortcut">Ctrl+C</span>
              </button>
            </div>
          )}
        </div>

        {/* View Menu */}
        <div className="menu-item">
          <button
            className={`menu-button ${openMenu === "view" ? "active" : ""}`}
            onClick={() => toggleMenu("view")}
          >
            View
          </button>
          {openMenu === "view" && (
            <div className="menu-dropdown">
              <button
                className="dropdown-item"
                onClick={() => { onToggleWordWrap(); setOpenMenu(null); }}
              >
                <span>Word Wrap {wordWrap ? "(On)" : "(Off)"}</span>
                <span className="dropdown-shortcut">Alt+Z</span>
              </button>
              <button
                className="dropdown-item"
                onClick={() => { onExpandToScreen(); setOpenMenu(null); }}
              >
                <span>Full Screen (Expand)</span>
                <span className="dropdown-shortcut">F</span>
              </button>
              <div className="dropdown-divider" />
              <div style={{ padding: "4px 14px", fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase" }}>
                Theme
              </div>
              {[
                { id: "fluent-dark", name: "Fluent Dark" },
                { id: "fluent-light", name: "Fluent Light" },
                { id: "vscode-dark", name: "VS Code Dark+" },
                { id: "monokai", name: "Monokai Pro" }
              ].map(t => (
                <button
                  key={t.id}
                  className="dropdown-item"
                  onClick={() => { setTheme(t.id); setOpenMenu(null); }}
                >
                  <span>{t.name}</span>
                  {theme === t.id && <Check size={13} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div className="menu-item">
          <button
            className={`menu-button ${openMenu === "help" ? "active" : ""}`}
            onClick={() => toggleMenu("help")}
          >
            Help
          </button>
          {openMenu === "help" && (
            <div className="menu-dropdown">
              <button
                className="dropdown-item"
                onClick={() => { onOpenShortcuts(); setOpenMenu(null); }}
              >
                <span>Keyboard Shortcuts</span>
                <span className="dropdown-shortcut">F1</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
