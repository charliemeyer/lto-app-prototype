"use client";

import { Company, Contact, getCompanies, getContacts } from "@/utils/api";
import { useCompanies, useContacts } from "@/utils/hooks";
import { useCallback, useEffect, useState } from "react";

export const SearchTabs = () => {
    const { loading: loadingCompanies, companies } = useCompanies();
    const { loading: loadingContacts, contacts } = useContacts();
    const [activeTab, setActiveTab] = useState<"companies" | "contacts">(
        "companies"
    );

    const dataToShow = activeTab === "companies" ? companies : contacts;
    const loading = loadingCompanies || loadingContacts;

    return (
        <div className="p-2">
            <div className="flex flex-row  w-fit mx-auto my-2">
                <div
                    className={`rounded-l-full border-r border border-gray-300 py-1 pl-4 pr-3 cursor-pointer ${
                        activeTab === "companies" ? "bg-black text-white" : ""
                    }`}
                    onClick={() => setActiveTab("companies")}
                >
                    Companies
                </div>
                <div
                    className={`rounded-r-full border border-gray-300 py-1 pr-4 pl-3 cursor-pointer ${
                        activeTab === "contacts" ? "bg-black text-white" : ""
                    }`}
                    onClick={() => setActiveTab("contacts")}
                >
                    Contacts
                </div>
            </div>
            {loading && (
                <div className="py-1 px-4 text-sm bg-black mb-2 rounded-full text-white w-fit mx-auto">
                    Loading...
                </div>
            )}
            <div className="flex flex-col gap-2">
                {dataToShow.map((record, index) => (
                    <div
                        key={index}
                        className="flex flex-row gap-2 px-4 py-2 border border-gray-300 rounded-full hover:border-black cursor-pointer"
                    >
                        {record.name}
                    </div>
                ))}
            </div>
        </div>
    );
};
