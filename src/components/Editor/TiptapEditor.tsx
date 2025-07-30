'use client';

import { useState, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import './TiptapEditor.css';

interface Props {
  content: string;
  setContent: (value: string) => void;
}

export default function TiptapEditor({ content, setContent }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      BulletList,
      OrderedList,
      ListItem,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!isClient || !editor) return null;

  return (
    <div className="tiptap-container">
      <div className="toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active' : ''}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active' : ''}>I</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button onClick={() => editor.chain().focus().setParagraph().run()}>P</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>Left</button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>Center</button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>Right</button>
        <button
          onClick={() => {
            const url = prompt('Enter image URL');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          Image
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
