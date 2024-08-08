"use client";

import { useState } from "react";

export const AddNewForm = () => {
    const [activeTab, setActiveTab] = useState<"companies" | "contacts">(
        "companies"
    );

    return (
        <div className="p-2">
            <div className="flex flex-row  w-fit mx-auto mb-2">
                <div
                    className={`rounded-l-full border-r-0 border border-gray-400 py-1 pl-4 pr-3 cursor-pointer ${
                        activeTab === "companies" ? "bg-black text-white" : ""
                    }`}
                    onClick={() => setActiveTab("companies")}
                >
                    Companies
                </div>
                <div
                    className={`rounded-r-full border-l-0 border border-gray-400 py-1 pr-4 pl-3 cursor-pointer ${
                        activeTab === "contacts" ? "bg-black text-white" : ""
                    }`}
                    onClick={() => setActiveTab("contacts")}
                >
                    Contacts
                </div>
            </div>
        </div>
    );
};
