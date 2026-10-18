import React, { useRef, useEffect, useState } from "react";
import { Search, X, ChevronDown, Replace } from "lucide-react";

export function Editor({
  content,
  onChange,
  wordWrap,
  onCursorChange,
  showFind,
  onCloseFind,
  editorRef
}) {
  const textareaRef = editorRef || useRef(null);

  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [matchCount, setMatchCount] = useState(0);

  // Update cursor line & col
  const handleCursorMovement = () => {
    if (!textareaRef.current) return;
    const { selectionStart, value } = textareaRef.current;
    const textBeforeCursor = value.substring(0, selectionStart);
    const lineIndex = textBeforeCursor.split("\n").length;
    const colIndex = selectionStart - textBeforeCursor.lastIndexOf("\n");
    onCursorChange({ line: lineIndex, col: colIndex });
  };

  // Support Tab key (4 spaces)
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newContent = content.substring(0, start) + "    " + content.substring(end);
      onChange(newContent);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  // Find matches count
  useEffect(() => {
    if (!findText) {
      setMatchCount(0);
      return;
    }
    try {
      const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      const matches = content.match(regex);
      setMatchCount(matches ? matches.length : 0);
    } catch {
      setMatchCount(0);
    }
  }, [findText, content]);

  // Find next occurrence
  const handleFindNext = () => {
    if (!findText || !textareaRef.current) return;
    const textarea = textareaRef.current;
    const currentPos = textarea.selectionEnd;
    const idx = content.toLowerCase().indexOf(findText.toLowerCase(), currentPos);

    if (idx !== -1) {
      textarea.focus();
      textarea.setSelectionRange(idx, idx + findText.length);
    } else {
      const wrapIdx = content.toLowerCase().indexOf(findText.toLowerCase(), 0);
      if (wrapIdx !== -1) {
        textarea.focus();
        textarea.setSelectionRange(wrapIdx, wrapIdx + findText.length);
      }
    }
  };

  // Replace one
  const handleReplace = () => {
    if (!findText || !textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);

    if (selected.toLowerCase() === findText.toLowerCase()) {
      const newContent = content.substring(0, start) + replaceText + content.substring(end);
      onChange(newContent);
      setTimeout(handleFindNext, 0);
    } else {
      handleFindNext();
    }
  };

  // Replace all
  const handleReplaceAll = () => {
    if (!findText) return;
    try {
      const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
      const newContent = content.replace(regex, replaceText);
      onChange(newContent);
    } catch {
      // Ignore regex error
    }
  };

  return (
    <div className="editor-main-container">
      {/* Floating Find & Replace Bar */}
      {showFind && (
        <div className="find-bar">
          <Search size={14} color="var(--text-dim)" />
          <input
            className="find-input"
            type="text"
            placeholder="Find..."
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFindNext()}
            autoFocus
          />
          <input
            className="find-input"
            type="text"
            placeholder="Replace..."
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
          />
          <span className="find-count">
            {findText ? `${matchCount} match${matchCount === 1 ? "" : "es"}` : ""}
          </span>
          <button className="window-ctrl-btn" title="Find Next" onClick={handleFindNext}>
            <ChevronDown size={14} />
          </button>
          <button className="window-ctrl-btn" title="Replace" onClick={handleReplace}>
            <Replace size={14} />
          </button>
          <button
            className="action-btn"
            style={{ padding: "2px 6px", fontSize: 11 }}
            title="Replace All"
            onClick={handleReplaceAll}
          >
            All
          </button>
          <button className="window-ctrl-btn" title="Close" onClick={onCloseFind}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Editor Scroller (Without Line Numbering Gutter) */}
      <div className="editor-scroller">
        <div className="editor-textarea-wrapper">
          <textarea
            ref={textareaRef}
            className={`editor-textarea ${wordWrap ? "wrap-enabled" : ""}`}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            onKeyUp={handleCursorMovement}
            onClick={handleCursorMovement}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
        </div>
      </div>
    </div>
  );
}
