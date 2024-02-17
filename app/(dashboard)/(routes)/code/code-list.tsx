"use client"

import {CopyBlock, dracula} from "react-code-blocks";

interface CodeListProps  {
    codes: Record<string, any>[]
}

export const CodeList = ({codes}: CodeListProps) => {
    return (
        <div className={"flex flex-row gap-3 p-2"}>
            {
                codes.map(code =>
                    <div key={code.id}>
                        <h2 className={"font-semibold"}>{code.title}</h2>
                        <CopyBlock
                            language={code.language}
                            text={code.body}
                            theme={dracula}
                        />
                    </div>
                )
            }
        </div>
    )
}

