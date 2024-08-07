"use client";

import { addCompany, addContact } from "@/utils/api";
import {
    MagnifyingGlassCircleIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const Header = ({
    title,
    hideSearch,
    hideBack,
}: {
    title?: string;
    hideBack?: string;
    hideSearch?: string;
}) => {
    return (
        <div className="flex py-1 p-1 border-b border-gray-300 bg-white items-center sticky top-0 right-0 left-0">
            {!hideBack && (
                <button
                    className="rounded-full absolute left-0.5 text-gray-800 flex items-center justify-center"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeftCircleIcon className="h-8 w-8 stroke-1" />
                </button>
            )}
            <span className="mx-auto">LTO App</span>
            {!hideSearch && (
                <Link
                    href={"/"}
                    className="rounded-full absolute right-8 ml-auto text-gray-800 flex items-center justify-center"
                >
                    <MagnifyingGlassCircleIcon className="h-8 w-8 stroke-1" />
                </Link>
            )}
            <button className="rounded-full absolute right-0.5 text-gray-800">
                <PlusCircleIcon className="h-8 w-8 stroke-1" />
            </button>
        </div>
    );
};
