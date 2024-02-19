'use client';

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export const GeniusEditor = ({ onChange, initialContent, editable }: EditorProps) => {
  const handleUpload = async (file: File) => {
    console.log(file.name);
    return Promise.resolve(`https://someurl.com/${file.name}`);
  };

  // Creates a new editor instance.
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    // initialContent: initialContent
    //   ? (JSON.parse(initialContent))
    //   : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  // Renders the editor instance using a React component.
  return (
    <div className="">
      <BlockNoteView
        editor={editor}
        theme="dark"
      />
    </div>
  )
};
