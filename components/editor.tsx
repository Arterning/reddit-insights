"use client";

import { useState } from "react";
import { BlockNoteEditor, Block } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

interface EditorProps {
  initialContent?: string;
  editable?: boolean;
}

export const GeniusEditor = ({
  initialContent,
  editable,
}: EditorProps) => {
  // Stores the editor's contents as an array of Block objects.
  const [blocks, setBlocks] = useState(null);

  const handleUpload = async (file: File) => {
    console.log(file.name);
    return Promise.resolve(`https://someurl.com/${file.name}`);
  };

  // Creates a new editor instance.
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    onEditorContentChange: (editor) => {
      setBlocks(editor.topLevelBlocks)
    },
    uploadFile: handleUpload,
  });

  // Renders the editor instance using a React component.
  return (
    <div className="">
      <BlockNoteView editor={editor} theme="dark" />
    </div>
  );
};
