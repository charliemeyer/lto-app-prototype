"use client";

import { Company, Contact, getCompanies, getContacts } from "@/utils/api";
import { useCallback, useEffect, useState } from "react";

export const SearchTabs = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"companies" | "contacts">(
        "companies"
    );

    const fetchData = useCallback(async () => {
        if (companies.length === 0) {
            setLoading(true);
        }
        const [newCompanies, newContacts] = await Promise.all([
            getCompanies(),
            getContacts(),
        ]);
        setCompanies(newCompanies);
        setContacts(newContacts);
        setLoading(false);
    }, [companies, contacts, activeTab]);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    const dataToShow = activeTab === "companies" ? companies : contacts;

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
                <div className="py-1 px-2 text-sm bg-gray-700 mb-2 rounded-full text-white w-fit mx-auto">
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
