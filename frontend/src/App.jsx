import React, { useState, useEffect, useRef } from "react";
import { TitleBar } from "./components/TitleBar";
import { MenuBar } from "./components/MenuBar";
import { TabBar } from "./components/TabBar";
import { Editor } from "./components/Editor";
import { StatusBar } from "./components/StatusBar";
import { ShortcutsModal } from "./components/ShortcutsModal";
import { INITIAL_FILES } from "./practicalsData";
import { CheckCircle2 } from "lucide-react";

export default function App() {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [activeFileId, setActiveFileId] = useState("exp1.py");
  const [theme, setTheme] = useState("fluent-dark");
  const [wordWrap, setWordWrap] = useState(false);
  const [cursor, setCursor] = useState({ line: 1, col: 1 });
  const [showFind, setShowFind] = useState(false);
  const [toast, setToast] = useState(null);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [zoom, setZoom] = useState(100);

  const editorRef = useRef(null);

  // Active file reference
  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Toast notification
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // Content change handler
  const handleContentChange = (newContent) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === activeFileId ? { ...f, content: newContent, isModified: true } : f
      )
    );
  };

  // Expand to screen dimension function (triggered by 'F11' / 'F' key or maximize button)
  const expandToScreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement
          .requestFullscreen()
          .then(() => {
            showToast("Expanded to full screen dimension (Press F11 / F or Esc to exit)");
          })
          .catch((err) => {
            console.log("Fullscreen request failed:", err);
          });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
          .then(() => {
            showToast("Restored screen dimension");
          })
          .catch((err) => {
            console.log("Exit fullscreen failed:", err);
          });
      }
    }
  };

  // Save active file
  const handleSave = () => {
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, isModified: false } : f))
    );
    showToast(`Saved ${activeFile.name} successfully!`);
  };

  // Download active file
  const handleDownload = () => {
    const blob = new Blob([activeFile.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = activeFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${activeFile.name}`);
  };

  // Copy all content
  const handleCopyAll = () => {
    navigator.clipboard.writeText(activeFile.content);
    showToast("Copied script to clipboard!");
  };

  // Select all content
  const handleSelectAll = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      editorRef.current.select();
    }
  };

  // New tab
  const handleNewTab = () => {
    const newId = `code_${files.length + 1}.py`;
    const newFile = {
      id: newId,
      name: newId,
      language: "python",
      isModified: false,
      content: `# Python script\n\n`
    };
    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newId);
    showToast(`Created ${newId}`);
  };

  // Close tab
  const handleCloseTab = (idToClose) => {
    if (files.length <= 1) return;
    const nextFiles = files.filter((f) => f.id !== idToClose);
    setFiles(nextFiles);
    if (activeFileId === idToClose) {
      setActiveFileId(nextFiles[0].id);
    }
  };

  // Jump to experiment in editor: switches directly to that tab!
  const handleJumpToExperiment = (expNum) => {
    const targetId = `exp${expNum}.py`;
    const found = files.find((f) => f.id === targetId);
    if (found) {
      setActiveFileId(targetId);
      showToast(`Switched to Exp ${expNum}`);
    }
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeys = (e) => {
      // 'F11' or 'f' / 'F' key expands to screen dimensions
      if (
        (e.key === "F11" || e.key === "f" || e.key === "F") &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        if (e.key === "F11") {
          e.preventDefault();
        }
        expandToScreen();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSave();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setShowFind(true);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        handleNewTab();
      } else if (e.altKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        setWordWrap((prev) => !prev);
      } else if (e.key === "F1") {
        e.preventDefault();
        setShortcutsOpen(true);
      } else if (e.key === "Escape") {
        setShowFind(false);
        setShortcutsOpen(false);
      }
    };

    window.addEventListener("keydown", handleGlobalKeys);
    return () => window.removeEventListener("keydown", handleGlobalKeys);
  }, [activeFile, files]);

  return (
    <div
      className="app-container"
      style={{
        transform: `scale(${zoom / 100})`,
        transformOrigin: "top left",
        width: "100vw",
        height: "100vh"
      }}
    >
      {/* 1. Clean Title Bar (without top left python exp.py-notepad text) */}
      <TitleBar
        theme={theme}
        setTheme={setTheme}
        onExpandToScreen={expandToScreen}
      />

      {/* 2. Menu Bar */}
      <MenuBar
        onNewFile={handleNewTab}
        onSave={handleSave}
        onDownload={handleDownload}
        onCopyAll={handleCopyAll}
        onSelectAll={handleSelectAll}
        onToggleWordWrap={() => setWordWrap((prev) => !prev)}
        wordWrap={wordWrap}
        theme={theme}
        setTheme={setTheme}
        onJumpToExperiment={handleJumpToExperiment}
        onOpenShortcuts={() => setShortcutsOpen(true)}
        onExpandToScreen={expandToScreen}
      />

      {/* 3. Multi-Tab Bar (8 tabs for each experiment code: exp1.py to exp8.py) */}
      <TabBar
        files={files}
        activeFileId={activeFileId}
        onSelectTab={setActiveFileId}
        onCloseTab={handleCloseTab}
        onNewTab={handleNewTab}
      />

      {/* 4. Center Workspace (Editor filling full width without line numbering) */}
      <div className="workspace-container">
        <Editor
          content={activeFile.content}
          onChange={handleContentChange}
          wordWrap={wordWrap}
          onCursorChange={setCursor}
          showFind={showFind}
          onCloseFind={() => setShowFind(false)}
          editorRef={editorRef}
        />
      </div>

      {/* 5. Status Bar */}
      <StatusBar
        cursor={cursor}
        content={activeFile.content}
        activeFileName={activeFile.name}
        zoom={zoom}
        onZoomIn={() => setZoom((z) => Math.min(z + 10, 150))}
        onZoomOut={() => setZoom((z) => Math.max(z - 10, 70))}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="toast-alert">
          <CheckCircle2 size={15} color="var(--accent-primary)" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </div>
  );
}
