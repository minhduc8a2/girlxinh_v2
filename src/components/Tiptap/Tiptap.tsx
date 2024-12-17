"use client"

import { Color } from "@tiptap/extension-color"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React from "react"
import MenuBar from "./MenuBar"
import { useTheme } from "next-themes"

const extensions = [Color, StarterKit]

export default function TiptapEditor({
  initialContent = "",
  onChange = () => {},
}: {
  initialContent: string
  onChange: (value: string) => void
}) {
  const { theme } = useTheme()
  const editorProps = {
    attributes: {
      class: `prose ${
        theme?.includes("dark") ? "prose-invert" : ""
      }   text-color-high-emphasis  focus:outline-none  `,
    },
    handleKeyDown: () => {},
  }
  const editor = useEditor({
    extensions,
    content: initialContent,
    editorProps,

    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })
  return (
    <div className="w-[500px] max-w-full border rounded-xl p-4 bg-content2">
      <MenuBar editor={editor} />
      <div className="mt-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
