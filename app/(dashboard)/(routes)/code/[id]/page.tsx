'use client'

import Editor from "@monaco-editor/react";
import {Button} from "@/components/ui/button";
import { useEffect, useState } from "react";


import axios from "axios";
import {toast} from "react-hot-toast";


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
        setCode({ ...code, [e.target.name]: e.target.value });
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
                                language: code.language
                            });
                        } catch (error) {
                            toast.error("Something went wrong");
                        }

                        toast.success("Code snippet updated");

                       //go to home page
                        window.location.href = "/code";
                    }}
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
                        language={code.language}
                        value={code.body}
                        theme="vs-dark"
                        onChange={handleEditorChange}
                    />
                    <input
                        type="text"
                        name={"title"}
                        value={code.title}
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        placeholder="Title of code snippet."
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name={"language"}
                        value={code.language}
                        className={"border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"}
                        placeholder="Language of code snippet."
                        onChange={handleInputChange}
                    />
                    <textarea
                        name={"body"}
                        value={code.body}
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

export default SingleCodeSnippetPage
