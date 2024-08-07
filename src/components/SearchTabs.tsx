"use client";

import { Company, Contact, getCompanies, getContacts } from "@/utils/api";
import { useCompanies, useContacts } from "@/utils/hooks";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { LoadingIndicator } from "./LoadingIndicator";

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
            {loading && <LoadingIndicator />}
            <div className="flex flex-col gap-2">
                {dataToShow.map((record, index) => (
                    <Link href={`/${activeTab}/${record.id}`} key={record.id}>
                        <div className="flex flex-row gap-2 px-4 py-2 border border-gray-400 rounded-full hover:border-black cursor-pointer">
                            {record.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
