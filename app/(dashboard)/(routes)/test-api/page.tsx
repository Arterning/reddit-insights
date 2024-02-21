import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { IceCream2Icon } from "lucide-react"

const SendApiRequestPage = () => {

    return (
        <div>
            <Heading
                title="Send API Request"
                description="Manage Api Request with local data."
                icon={IceCream2Icon}
                iconColor="text-pink-500"
                bgColor="bg-pink-700/10"
            />
            <div className="container mx-auto py-10">
                <Button>Send Api Request</Button>
            </div>
        </div>
    )
}

export default SendApiRequestPage