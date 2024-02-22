import { Code } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCodeSnippets } from "@/app/action/code";
import { CodeCardView } from "@/app/(dashboard)/(routes)/code/_components/code-card-view";
import Pagination from "@/components/pagination";
import { LangButton } from "./_components/lang-button";
import SearchField from "@/components/search";

const CodePage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const language = searchParams?.language;
  const pageSize = 15;

  const {
    data: codes,
    count,
    lang,
  } = await getCodeSnippets(q, page, pageSize, language);

  return (
    <div>
      <Heading
        title="Code"
        description="Save code snippet using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="space-y-4 mt-4 px-4">
        <Link href="/code/create">
          <Button>Create New</Button>
        </Link>

        <div className="flex gap-2">
          <SearchField placeholder="Search for a code..." />
          <LangButton key={"all"} language={"All"} count={count} />
          {lang.map((lang) => (
            <LangButton
              key={lang.language}
              language={lang.language}
              count={lang._count.language}
            />
          ))}
        </div>

        <CodeCardView codes={codes} />

        <div className="max-w-[1200px]">
          <Pagination count={count} pageSize={pageSize} />
        </div>
      </div>
    </div>
  );
};

export default CodePage;
