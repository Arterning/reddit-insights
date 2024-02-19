import {StickyNote} from "lucide-react";
import {Heading} from "@/components/heading";
import {createNote, getNotes} from "@/app/action/note";
import {Button} from "@/components/ui/button";
import Chirp from "@/components/chirp";
import React from "react";
import Pagination from "@/components/pagination";
import SearchField from "@/components/search";
import {Input} from "../../../../components/ui/input";
import { Textarea } from "@/components/ui/textarea";


const NotePage = async ({ searchParams }) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;

    const {notes, count} =  await getNotes(q, page);

    return (
        <div>
            <Heading
                title="Write Simple Note"
                description="Write simple note or code."
                icon={StickyNote}
                iconColor="text-green-700"
                bgColor="bg-green-700/10"
            />
            <div className="w-full p-4 sm:p-6 lg:p-8 flex gap-5">
                
                <div className="bg-white shadow-sm rounded-lg flex-1 max-w-lg">
                    <form action={createNote} className="space-y-3">
                        <Input name="title" placeholder={"title"} className={"p-3"}/>
                        <Textarea
                            name="body"
                            rows={35}
                            placeholder="What's on your mind?"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        />
                        <Button className="mt-4" type={"submit"}>Chirp</Button>
                    </form>
                </div>

                <div className="bg-white shadow-sm rounded-lg divide-y flex-1">
                    <SearchField placeholder="Search for a chirps..." />
                    {notes.map(note =>
                        <Chirp key={note.id} chirp={note} />
                    )}
                    <Pagination count={count}/>
                </div>
            </div>

        </div>
    )
}

export default NotePage
