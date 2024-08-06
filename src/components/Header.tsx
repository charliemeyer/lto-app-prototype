"use client";

import { addCompany, addContact } from "@/utils/api";

export const Header = () => {
    return (
        <div className="flex py-1 px-2 bg-black text-white items-center sticky top-0 right-0 left-0">
            <h1>[Name of Conference]</h1>
            <button
                className="py-1 px-4 border border-gray-500 rounded-full ml-auto text-2xl flex items-center justify-center"
                onClick={addCompany}
            >
                +
            </button>
        </div>
    );
};
