"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import Editor from "@monaco-editor/react";
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
import { RequestType } from "./request-type";

interface RequestFormProps {
  request: RequestType;
  setSelectedRequest: (request: RequestType) => void;
}


export const RequestForm = ({ request, setSelectedRequest }: RequestFormProps) => {
  const { id, url, method } = request;
  const [response, setResponse] = useState<any>();

  return (
    <div>
      <div className="w-full flex gap-5">
        {/* Write Select Field can choose GET POST PUT DELETE */}
        <Select value={method} onValueChange={(value) => setSelectedRequest({ ...request, method: value })}>
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
          placeholder="request url"
          name="url"
          value={url}
          onChange={(e) => {
            setSelectedRequest({ ...request, url: e.target.value });
          }}
          // onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          className="flex-1"
          onClick={async () => {
            try {
              await saveRequest(id, url, method, {});
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
            setSelectedRequest({ ...request, url: "", method: "GET" });
            setResponse({

            });
          }}
        >
          Clear
        </Button>
      </div>

      <div className="w-full mt-8">
        <Editor
            height="500px"
            language={"json"}
            value={JSON.stringify(response, null, 2)}
            theme="vs-dark"
          />
      </div>
    </div>
  );
};
