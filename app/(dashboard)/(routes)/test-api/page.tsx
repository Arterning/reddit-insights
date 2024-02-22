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

      <div className="p-6 flex">
        <div className="flex-1 gap-3">
          {requests.map((request) => (
            <RequestItem key={request.id} request={request} />
          ))}
        </div>

        <div className="flex-2">
          <div className="w-full flex gap-5 p-5">
            {/* Write Select Field can choose GET POST PUT DELETE */}
            <RequestForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendApiRequestPage;
