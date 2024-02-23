import { Heading } from "@/components/heading";
import { IceCream2Icon } from "lucide-react";
import { RequestForm } from "./components/request-form";
import { deleteRequest, getAllRequests } from "@/app/action/request";
import { RequestItem } from "./components/request-item";

const SendApiRequestPage = async () => {
  const requests = await getAllRequests();

  return (
    <div>
      <Heading
        title="Send API Request"
        description="Manage Api Request with local data."
        icon={IceCream2Icon}
        iconColor="text-pink-500"
        bgColor="bg-pink-700/10"
      />

      <div className="p-6 flex gap-6">
        <div className="max-w-xl w-92 flex flex-col gap-3">
          {requests.map((request) => (
            <RequestItem key={request.id} request={request} />
          ))}
        </div>

        <div className="flex-1 h-full">
          <RequestForm />
        </div>
      </div>
    </div>
  );
};

export default SendApiRequestPage;
