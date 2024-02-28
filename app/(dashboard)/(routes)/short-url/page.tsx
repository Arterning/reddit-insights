import { createShortUrl, getShortUrlMap } from "@/app/action/short-url";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Code } from "lucide-react";
import Link from "next/link";

const ShortUrlPage = async () => {
  const urlMaps = await getShortUrlMap();

  return (
    <div>
      <Heading
        title="Short URL"
        description="Save short URL with local data."
        icon={Code}
        iconColor="text-red-500"
        bgColor="bg-red-700/10"
      />
      <div className="w-full p-4 sm:p-6 lg:p-8 flex gap-5">
        <div className="bg-white shadow-sm rounded-lg flex-1 max-w-lg">
          <form action={createShortUrl} className="space-y-3">
            <Input name="url" placeholder={"url"} className={"p-3"} />
            <Button className="mt-4" type={"submit"}>
              Create
            </Button>
          </form>
        </div>
        <div className="bg-white shadow-sm rounded-lg divide-y flex-1">
          {urlMaps.map((urlMap) => (
            <div key={urlMap.id} className="p-5">
              <Link href={`${urlMap.longUrl}`}>{urlMap.code}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShortUrlPage;
