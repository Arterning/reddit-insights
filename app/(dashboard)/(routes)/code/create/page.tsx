"use client";

import { createCodeSnippet } from "@/app/action/code";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const CreateSnippetPage = ({ params }) => {
  const [editorCode, setEditorCode] = useState<string>(``);
  const [title, setTitle] = useState<string>("");
  const [language, setLanguage] = useState("javascript");

  function handleEditorChange(value: string, event: any) {
    setEditorCode(value);
  }

  return (
    <div className="px-4 lg:px-8">
      <div>
        <form
          action={createCodeSnippet}
          className="
                            rounded-lg
                            border
                            w-full
                            p-4
                            px-3
                            md:px-6
                            focus-within:shadow-sm
                            "
        >
          <Editor
            height="500px"
            language={language}
            theme="vs-dark"
            onChange={handleEditorChange}
          />
          <div className="flex gap-3">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="mt-4 w-[180px] flex-2">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="c++">C++</SelectItem>
                <SelectItem value="c#">C#</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
                <SelectItem value="swift">Swift</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="scala">Scala</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="bash">Bash</SelectItem>
              </SelectContent>
            </Select>
            <Input
              name={"title"}
              value={title}
              className="mt-4 flex-2"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title of code snippet."
            ></Input>
            {/*代码需要换行 所以我们必须使用textarea*/}
            <textarea name={"body"} value={editorCode} className={"hidden"} />
          </div>

          <Button className="w-full py-2 mt-5" type="submit" size="icon">
            Save
          </Button>

        </form>
      </div>
    </div>
  );
};

export default CreateSnippetPage;
