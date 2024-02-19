"use client";

import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "react-hot-toast";

const SingleCodeSnippetPage = ({ params }) => {
  const { id } = params;

  const [code, setCode] = useState<Record<string, any>>({});

  async function fetchData() {
    try {
      const response = await axios.get(`/api/code`, { params: { id } });
      return response.data;
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    fetchData().then(setCode);
  }, []);

  function handleEditorChange(value: string, event: any) {
    setCode({ ...code, body: value });
  }

  function handleInputChange(e: any) {
    setCode({ ...code, [e.target?.name]: e.target.value });
  }

  return (
    <div className="px-4 lg:px-8">
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await axios.put(`/api/code`, {
                id: code.id,
                title: code.title,
                body: code.body,
                language: code.language,
              });
            } catch (error) {
              toast.error("Something went wrong");
            }

            toast.success("Code snippet updated");

            //go to home page
            window.location.href = "/code";
          }}
          className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm"
        >
          <Editor
            height="500px"
            language={code.language}
            value={code.body}
            theme="vs-dark"
            onChange={handleEditorChange}
          />
          <div className="flex gap-3">
            {/*TODO - How to get the value from the Select component */}
            <Select name="language" value={code.language}>
              <SelectTrigger className="mt-4 w-[180px] flex-2">
                <SelectValue placeholder="Select language"/>
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
              value={code.title}
              className="mt-4 flex-2"
              onChange={handleInputChange}
              placeholder="Title of code snippet."
            ></Input>
            {/*代码需要换行 所以我们必须使用textarea*/}
            <textarea name={"body"} value={code.body} className={"hidden"} />
          </div>
          <Button className="w-full py-2 mt-5" type="submit" size="icon">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SingleCodeSnippetPage;
