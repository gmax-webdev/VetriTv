'use client';

import React, { useRef, useState } from 'react';

interface SimpleEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SimpleEditor({ value, onChange }: SimpleEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Apply formatting command
  function format(command: string, value?: string) {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }

  // Handle input event on contentEditable
  function handleInput() {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }

  // Optional: sanitize or strip HTML on output if needed

  return (
    <div className="simple-editor">
      <div className="toolbar">
        <button type="button" onClick={() => format('bold')} title="Bold"><b>B</b></button>
        <button type="button" onClick={() => format('italic')} title="Italic"><i>I</i></button>
        <button type="button" onClick={() => format('underline')} title="Underline"><u>U</u></button>
        <button type="button" onClick={() => format('insertUnorderedList')} title="Bullet List">• List</button>
        <button
          type="button"
          onClick={() => {
            const url = prompt('Enter link URL:', 'https://');
            if (url) format('createLink', url);
          }}
          title="Insert Link"
        >
          🔗 Link
        </button>
        <button type="button" onClick={() => format('removeFormat')} title="Remove formatting">✖ Clear</button>
      </div>
      <div
        ref={editorRef}
        className={`editor-area ${isFocused ? 'focused' : ''}`}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        dangerouslySetInnerHTML={{ __html: value }}
        spellCheck={true}
        style={{
          minHeight: '150px',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '5px',
          outline: 'none',
          overflowY: 'auto',
        }}
      ></div>
      <style jsx>{`
        .toolbar {
          margin-bottom: 5px;
        }
        .toolbar button {
          margin-right: 5px;
          padding: 5px 8px;
          font-size: 14px;
          cursor: pointer;
          border: 1px solid #ccc;
          background-color: white;
          border-radius: 3px;
          user-select: none;
          transition: background-color 0.2s ease;
        }
        .toolbar button:hover {
          background-color: #eee;
        }
        .editor-area.focused {
          border-color: #106b01; /* green accent */
          box-shadow: 0 0 5px rgba(16, 107, 1, 0.5);
        }
      `}</style>
    </div>
  );
}
