"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { requestAPI, saveRequest } from "@/app/action/request";
import { CopyBlock } from "react-code-blocks";
import toast from "react-hot-toast";

interface RequestFormProps {
  initUrl?: string;
  initMethod?: string;
}

export const RequestForm = ({ initUrl, initMethod }: RequestFormProps) => {
  const [url, setUrl] = useState<string>(initUrl);
  const [method, setMethod] = useState<string>(initMethod);
  const [response, setResponse] = useState<any>();

  return (
    <div>
      <div className="w-full flex gap-5">
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
              await saveRequest(url, method, {});
              const resp = await requestAPI(url, method, {});
              setResponse(resp);
              toast.success("Request sent");
            } catch (error) {
              setResponse(error);
              toast.error("Request failed");
            }
          }}
        >
          Send
        </Button>
        <Button
          className="flex-1"
          onClick={() => {
            setUrl("");
            setMethod("GET");
            setResponse(null);
          }}
        >
          Clear
        </Button>
      </div>

      <CopyBlock text={JSON.stringify(response, null, 2)} language={"json"} />
    </div>
  );
};
