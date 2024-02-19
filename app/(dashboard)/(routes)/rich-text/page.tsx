"use client";

import { GeniusEditor } from "@/components/editor";
import { Heading } from "@/components/heading";
import { Edit3Icon } from "lucide-react";

function RichTextPage() {
  return (
    <div>
      <Heading
        title="RichText"
        description="Rich text editor powered by genius editor."
        icon={Edit3Icon}
        iconColor="indigo-500"
        bgColor="bg-indigo-700/10"
      />
      <div className="w-full h-screen p-4">
        <GeniusEditor
          onChange={() => {}}
          initialContent="good"
          editable={true}
        />
      </div>
    </div>
  );
}

export default RichTextPage;
