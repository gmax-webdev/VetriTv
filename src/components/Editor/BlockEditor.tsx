'use client';

import { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import { supabase } from '@/lib/supabaseClient';

interface BlockEditorProps {
  onChange: (data: OutputData) => void;
  initialData?: string;
  triggerImageUpload: boolean;
  resetTrigger: () => void;
}

export default function BlockEditor({ onChange, initialData, triggerImageUpload, resetTrigger }: BlockEditorProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: holderRef.current!,
      autofocus: true,
      data: initialData ? JSON.parse(initialData) : undefined,
      tools: {
        header: Header,
        list: List,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                const ext = file.name.split('.').pop();
                const filePath = `inline/${Date.now()}.${ext}`;
                const { error } = await supabase.storage.from('posts').upload(filePath, file);
                if (error) {
                  console.error('Upload failed', error);
                  return { success: 0 };
                }
                const { data } = supabase.storage.from('posts').getPublicUrl(filePath);
                return {
                  success: 1,
                  file: { url: data.publicUrl },
                };
              },
            },
          },
        },
      },
      onChange: async () => {
        const saved = await editor.save();
        onChange(saved);
      },
    });

    editorRef.current = editor;

    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (triggerImageUpload && editorRef.current) {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = async () => {
        const file = fileInput.files?.[0];
        if (file) {
          const imageTool = editorRef.current?.blocks.getCurrentBlockIndex();
          await editorRef.current?.blocks.insert('image', { file });
        }
      };
      fileInput.click();
      resetTrigger();
    }
  }, [triggerImageUpload]);

  return <div ref={holderRef} />;
}
