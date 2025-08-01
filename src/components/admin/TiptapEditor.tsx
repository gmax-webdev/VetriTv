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
}

export default function TiptapEditor({ content, setContent }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Image, Link],
    content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });

  useEffect(() => {
    if (editor) {
      (window as any).editor = editor; // 🟢 Needed for Add Media image injection
    }
  }, [editor]);

  return <EditorContent editor={editor} />;
}
