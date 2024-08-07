"use client";

import {
    CompanyFields,
    ContactFields,
    getSortedAndFilteredItems,
} from "@/utils/fields";
import { useCompanies, useContacts } from "@/utils/hooks";
import {
    AdjustmentsHorizontalIcon,
    BarsArrowDownIcon,
    MagnifyingGlassIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useMemo, useState } from "react";
import FilterForm, { FilterConfig } from "./FilterForm";
import { LoadingIndicator } from "./LoadingIndicator";
import SortForm, { SortConfig } from "./SortForm";
import { Modal } from "./Modal";

export const SearchTabs = () => {
    const { loading: loadingCompanies, companies } = useCompanies();
    const { loading: loadingContacts, contacts } = useContacts();
    const [activeTab, setActiveTab] = useState<"companies" | "contacts">(
        "companies"
    );
    const [filterTerm, setFilterTerm] = useState("");
    const [companySorts, setCompanySorts] = useState<SortConfig[]>([
        { field: "name", direction: "ascending" },
        {
            field: "boothNumber",
            direction: "none",
        },
        {
            field: "annualRevenue",
            direction: "none",
        },
    ]);

    const [showFilters, setShowFilters] = useState(false);
    const [showSorts, setShowSorts] = useState(false);

    const [contactSorts, setContactSorts] = useState<SortConfig[]>([
        { field: "lastName", direction: "ascending" },
    ]);

    const [companyFilters, setCompanyFilters] = useState<FilterConfig[]>([
        { field: "isAFit", values: [] },
        { field: "priority", values: [] },
        { field: "met", values: [] },
    ]);
    const [contactFilters, setContactFilters] = useState<FilterConfig[]>([
        { field: "status", values: [] },
    ]);

    const companiesToShow = useMemo(() => {
        return getSortedAndFilteredItems(
            companies,
            companyFilters,
            companySorts,
            filterTerm
        );
    }, [companyFilters, companySorts, filterTerm, companies]);

    const contactsToShow = useMemo(() => {
        return getSortedAndFilteredItems(
            contacts,
            contactFilters,
            contactSorts,
            filterTerm
        );
    }, [contactFilters, contactSorts, filterTerm, contacts]);
    const loading = loadingCompanies || loadingContacts;
    const dataToShow =
        activeTab === "companies" ? companiesToShow : contactsToShow;

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
            <div className="rounded-lg border border-gray-500 px-2 py-1 flex items-center gap-1 mb-2">
                <MagnifyingGlassIcon className="w-4 h-4" />
                <input
                    type="text"
                    value={filterTerm}
                    onChange={(e) => setFilterTerm(e.currentTarget.value)}
                    className="w-full focus:outline-none"
                    placeholder="Search..."
                />
                {filterTerm.length > 0 && (
                    <XCircleIcon
                        className="w-6 h-6"
                        onClick={() => setFilterTerm("")}
                    />
                )}
            </div>
            <div className="flex gap-1 mb-2">
                <button
                    onClick={() => setShowFilters(true)}
                    className="px-2 py-0.5 border rounded-lg border-gray-700 text-gray-700 flex items-center gap-0.5"
                >
                    <AdjustmentsHorizontalIcon className="h-4 w-4" />
                    Filter
                </button>
                <button
                    onClick={() => setShowSorts(true)}
                    className="px-2 py-0.5 border rounded-lg border-gray-700 text-gray-700 flex items-center gap-0.5"
                >
                    <BarsArrowDownIcon className="h-4 w-4" />
                    Sort
                </button>
            </div>
            {showFilters && (
                <Modal onClose={() => setShowFilters(false)}>
                    {activeTab === "companies" ? (
                        <FilterForm
                            fieldConfigs={CompanyFields}
                            filters={companyFilters}
                            setFilters={setCompanyFilters}
                        />
                    ) : (
                        <FilterForm
                            fieldConfigs={ContactFields}
                            filters={contactFilters}
                            setFilters={setContactFilters}
                        />
                    )}
                </Modal>
            )}
            {showSorts && (
                <Modal onClose={() => setShowSorts(false)}>
                    {activeTab === "companies" ? (
                        <SortForm
                            fieldConfigs={CompanyFields}
                            sorts={companySorts}
                            setSorts={setCompanySorts}
                        />
                    ) : (
                        <SortForm
                            fieldConfigs={ContactFields}
                            sorts={contactSorts}
                            setSorts={setContactSorts}
                        />
                    )}
                </Modal>
            )}
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
