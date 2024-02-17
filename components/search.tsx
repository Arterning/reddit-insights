"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchField = ({ placeholder }) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const handleSearch = useDebouncedCallback((e) => {
        // @ts-ignore
        const params = new URLSearchParams(searchParams);

        params.set("page", "1");

        if (e.target.value) {
            e.target.value.length > 1 && params.set("q", e.target.value);
        } else {
            params.delete("q");
        }
        replace(`${pathname}?${params}`);
    }, 100);

    return (
        <div className="flex p-10">
            <Search />
            <input
                type="text"
                placeholder={placeholder}
                className=""
                onChange={handleSearch}
            />
        </div>
    );
};

export default SearchField;
