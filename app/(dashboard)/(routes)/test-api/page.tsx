import { Heading } from "@/components/heading";
import { IceCream2Icon } from "lucide-react";
import { deleteRequest, getAllRequests } from "@/app/action/request";
import { RequestArea } from "./components/request-area";

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

      <RequestArea requests={requests}/>
    </div>
  );
};

export default SendApiRequestPage;
