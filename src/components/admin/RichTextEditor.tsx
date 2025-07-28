'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import './TiptapEditor.css'; // optional styling

export default function TiptapEditor({
  content,
  setContent,
}: {
  content: string;
  setContent: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Link, Image],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="editor-container">
      <EditorContent editor={editor} />
    </div>
  );
}
