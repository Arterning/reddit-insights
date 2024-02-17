"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {cn} from "@/lib/utils";

const Pagination = ({ count }) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const page = searchParams.get("page") || "1";

    // @ts-ignore
    const params = new URLSearchParams(searchParams);
    const ITEM_PER_PAGE = 10;

    const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
    const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

    const handleChangePage = (type) => {
        type === "prev"
            ? params.set("page", (parseInt(page) - 1) + '')
            : params.set("page", (parseInt(page) + 1) + '');
        replace(`${pathname}?${params}`);
    };

    const handleJumpPage = (pageNum) => {
        params.set("page", pageNum);
        replace(`${pathname}?${params}`);
    }

    const pageNums = Array.from({ length: Math.ceil(count / ITEM_PER_PAGE) }, (_, i) => i + 1);

    return (
        <div className="p-10 flex justify-between">
            <button
                className={cn("px-5 py-10", hasPrev ? "cursor-pointer" : "cursor-not-allowed")}
                disabled={!hasPrev}
                onClick={() => handleChangePage("prev")}
            >
                Previous
            </button>

            {
                pageNums.map(pageNum =>
                    <button
                        key={pageNum}
                        className={cn("px-5 py-10")}
                        onClick={() => handleJumpPage(pageNum)}
                    >
                        {pageNum}
                    </button>
                )
            }

            <button
                className={cn("px-5 py-10", hasNext ? "cursor-pointer" : "cursor-not-allowed")}
                disabled={!hasNext}
                onClick={() => handleChangePage("next")}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
