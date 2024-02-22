"use client";

import { deleteRequest } from "@/app/action/request";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export const RequestItem = ({ request }) => {
  return (
    <div className="p-2 border border-gray-300 rounded-lg" key={request.id}>
      <div className="flex justify-between">
        <div className="text-sm text-gray-500">{request.method}</div>
        <div className="text-sm text-gray-500">{request.url}</div>
        <Button
          variant="outline"
          onClick={async () => {
            await deleteRequest(request.id);
            toast.success("Request deleted");
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
