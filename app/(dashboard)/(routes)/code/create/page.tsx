'use client'

import {createCodeSnippet} from "@/app/action/code";
import Editor from "@monaco-editor/react";
import {Button} from "@/components/ui/button";
import {useState} from "react";


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
                    <input
                        type="text"
                        name={"title"}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        placeholder="Title of code snippet."
                    />
                    <input
                        type="text"
                        name={"language"}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={"border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"}
                        placeholder="Language of code snippet."
                    />
                    {/*代码需要换行 所以我们必须使用textarea*/}
                    <textarea
                        name={"body"}
                        value={editorCode}
                        className={"hidden"}
                    />
                    <Button className="w-full py-2 mt-5" type="submit" size="icon">
                        Save
                    </Button>
                </form>
            </div>
        </div>
    )

}

export default CreateSnippetPage
