import { Code } from "lucide-react";
import { Heading } from "@/components/heading";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {getCodeSnippets} from "@/app/action/code";
import {CodeList} from "@/app/(dashboard)/(routes)/code/code-list";


const CodePage = async () => {

  const codes = await getCodeSnippets();

  return (
    <div>
      <Heading
        title="Code Snippet"
        description="Save code snippet using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
        <div className="space-y-4 mt-4 px-4">
            <Link href="/code/create">
                <Button>Create New</Button>
            </Link>

            <CodeList codes={codes} />
      </div>
    </div>
   );
}

export default CodePage;

