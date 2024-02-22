"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { IceCream2Icon } from "lucide-react";

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { requestAPI, saveRequest } from "@/app/action/request";
import toast from "react-hot-toast";
import { CopyBlock } from 'react-code-blocks';


const SendApiRequestPage = () => {
  const [url, setUrl] = useState<string>("");
  const [method, setMethod] = useState<string>("GET");
  const [response, setResponse] = useState<any>();

  return (
    <div>
      <Heading
        title="Send API Request"
        description="Manage Api Request with local data."
        icon={IceCream2Icon}
        iconColor="text-pink-500"
        bgColor="bg-pink-700/10"
      />

      <div className="w-full flex gap-5 p-5">
        {/* Write Select Field can choose GET POST PUT DELETE */}
        <Select value={method} onValueChange={(value) => setMethod(value)}>
          <SelectTrigger className="flex-1" value={method}>
            {method}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>
        <Input
          className="flex-2"
          placeholder="url"
          name="url"
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          className="flex-1"
          onClick={async () => {
            try {
              const response = await requestAPI(url, method, {});
              console.log(response);
              setResponse(response);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Send
        </Button>
        <Button
          className="flex-1"
          onClick={async () => {
            const response = await saveRequest(url, method, {});
            toast.success(response);
          }}
        >
          Save
        </Button>
      </div>

      <div className="container mx-auto py-10">
        {/* Result Area of API */}

        <CopyBlock
          text={JSON.stringify(response, null, 2)}
          language={"json"}
        />
      </div>
    </div>
  );
};

export default SendApiRequestPage;
