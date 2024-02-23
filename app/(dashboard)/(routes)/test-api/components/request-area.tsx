"use client"

import { RequestForm } from "./request-form";
import { RequestItem } from "./request-item";
import { useState } from "react";
import { RequestType } from "./request-type";


export const RequestArea = ({requests} : {requests: RequestType[]}) => {

    const [selectedRequest, setSelectedRequest] = useState<RequestType>(
        {
            id: "",
            url: "http://lcoalhost:3000",
            method: "GET",
        }
    );
    

    return (
        <div className="p-6 flex gap-6">
        <div className="max-w-xl w-92 flex flex-col gap-3">
          {requests.map((request) => (
            <RequestItem key={request.id} request={request} setSelectedRequest={setSelectedRequest}/>
          ))}
        </div>

        <div className="flex-1 h-full">
          <RequestForm request={selectedRequest} setSelectedRequest={setSelectedRequest}/>
        </div>
      </div>
    )
}