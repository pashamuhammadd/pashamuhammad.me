"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type RichTextEditorProps = {
  content: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap-editor-content",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentHTML = editor.getHTML();

    if (content && content !== currentHTML) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  function syncContent() {
  setTimeout(() => {
    if (!editor) return;
    onChange(editor.getHTML());
  }, 0);
}

  const buttonClass = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition ${
      active
        ? "border-emerald-400 bg-emerald-400/10 text-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.18)]"
        : "border-white/10 text-gray-300 hover:border-emerald-400 hover:text-emerald-400"
    }`;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleBold().run();
            syncContent();
          }}
          className={buttonClass(editor.isActive("bold"))}
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
            syncContent();
          }}
          className={buttonClass(editor.isActive("italic"))}
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
            syncContent();
          }}
          className={buttonClass(editor.isActive("heading", { level: 2 }))}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleBulletList().run();
            syncContent();
          }}
          className={buttonClass(editor.isActive("bulletList"))}
        >
          Bullet
        </button>

        <button
          type="button"
          onClick={() => {
            editor.chain().focus().toggleBlockquote().run();
            syncContent();
          }}
          className={buttonClass(editor.isActive("blockquote"))}
        >
          Quote
        </button>
      </div>

      <div className="rounded-2xl border border-emerald-400/20 bg-white/[0.04] px-5 py-4 focus-within:border-emerald-400">
        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .tiptap-editor-content {
          min-height: 320px;
          outline: none;
          color: #d1d5db;
        }

        .tiptap-editor-content p {
          margin-bottom: 1rem;
          line-height: 1.8;
        }

        .tiptap-editor-content h2 {
          margin-top: 1.5rem;
          margin-bottom: 0.8rem;
          font-size: 2rem;
          line-height: 1.2;
          font-weight: 800;
          color: white;
        }

        .tiptap-editor-content ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
          list-style-type: disc;
        }

        .tiptap-editor-content li {
          margin-bottom: 0.5rem;
          display: list-item;
        }

        .tiptap-editor-content blockquote {
          margin: 1.5rem 0;
          border-left: 4px solid #34d399;
          padding: 1rem 1.25rem;
          background: rgba(52, 211, 153, 0.08);
          border-radius: 0 1rem 1rem 0;
          color: #d1d5db;
          font-style: italic;
        }

        .tiptap-editor-content blockquote::before {
          content: "“";
          color: #34d399;
          font-size: 2.5rem;
          line-height: 1;
          margin-right: 0.4rem;
          vertical-align: -0.4rem;
        }

        .tiptap-editor-content strong {
          color: white;
          font-weight: 800;
        }

        .tiptap-editor-content em {
          color: #e5e7eb;
        }
      `}</style>
    </div>
  );
}