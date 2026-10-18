import React, { useRef, useEffect } from "react";
import { FileCode, FileText, Plus, X } from "lucide-react";

export function TabBar({ files, activeFileId, onSelectTab, onCloseTab, onNewTab }) {
  const tabstripRef = useRef(null);

  // Enable horizontal mouse wheel scrolling
  useEffect(() => {
    const el = tabstripRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="tabstrip-container" ref={tabstripRef}>
      {files.map((file) => {
        const isActive = file.id === activeFileId;
        const isPython = file.name.endsWith(".py");

        return (
          <div
            key={file.id}
            className={`tab-item ${isActive ? "active" : ""}`}
            onClick={() => onSelectTab(file.id)}
            title={file.name}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
              {isPython ? (
                <FileCode size={15} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
              ) : (
                <FileText size={15} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              )}
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: isActive ? 600 : 400 }}>
                {file.name}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {file.isModified && <div className="tab-dirty-dot" title="Unsaved changes" />}

              {files.length > 1 && (
                <button
                  className="tab-close-btn"
                  title="Close Tab"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(file.id);
                  }}
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>
        );
      })}

      <button
        className="tab-new-btn"
        title="New Tab (Ctrl+N)"
        onClick={onNewTab}
        style={{ flexShrink: 0, margin: "0 8px" }}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
