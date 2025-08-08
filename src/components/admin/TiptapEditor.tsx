'use client';

import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import './TiptapEditor.css';

interface Props {
  content: string;
  setContent: (value: string) => void;
  onEditorReady?: (editor: any) => void; // ✅ Add this line
}

export default function TiptapEditor({ content, setContent, onEditorReady }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Image, Link],
    content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });

  useEffect(() => {
    if (editor) {
      (window as any).editor = editor; // ✅ Keep this for Add Media image injection
      if (onEditorReady) {
        onEditorReady(editor); // ✅ Notify parent if provided
      }
    }
  }, [editor, onEditorReady]);

  if (!editor) return <p>Loading editor...</p>;

  return <EditorContent editor={editor} />;
}
