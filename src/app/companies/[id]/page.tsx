"use client";
import { Header } from "@/components/Header";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { useCompanies, useContacts } from "@/utils/hooks";
import Link from "next/link";
import { format } from "d3-format";
import { patchCompany } from "@/utils/api";
import { useEffect, useState } from "react";

// s format is SI, don't want giga dollars lol
const moneyFormat = (v: number) => format("$~s")(v).replaceAll("G", "B");

const CompanyDetailsView = ({ id }: { id: string }) => {
    const { companies, loading: companiesLoading } = useCompanies();
    const { contacts, loading: contactsLoading } = useContacts();
    const company = companies.find((c) => c.id === id);
    const [status, setStatus] = useState("");
    const [fit, setFit] = useState("");
    const [duringNotes, setDuringNotes] = useState("");

    const companyContacts = contacts.filter(
        (co) => co.companyDomain === company?.domain
    );
    useEffect(() => {
        if (company) {
            setStatus(company.status);
            setFit(company.isAFit);
            setDuringNotes(company.duringNotes);
        }
    }, [company]);
    if (companiesLoading) {
        return <LoadingIndicator />;
    }
    if (!company) {
        return <div>Company not found</div>;
    }
    return (
        <div className="p-2">
            <h2 className="text-2xl text-center">{company.name}</h2>
            <div className="flex flex-col gap-1">
                <div>Booth {company.boothNumber}</div>
                <Link
                    className="underline"
                    href={`https://${company.domain}`}
                    target="_blank"
                >
                    {company.domain}
                </Link>
                <div>{moneyFormat(company.annualRevenue)} annual revenue</div>
                <div>Priority {company.priority}</div>
                <select
                    onChange={async (e) => {
                        const newValue = e.currentTarget.value;
                        await patchCompany(company.id, {
                            isAFit: newValue,
                        });
                        setFit(newValue);
                    }}
                    value={fit}
                    className="border border-gray-500 rounded-lg w-fit px-2 py-0.5"
                >
                    <option value="Fit">Is a fit</option>
                    <option value="Not a fit">Not a fit</option>
                </select>
                <select
                    onChange={async (e) => {
                        const newValue = e.currentTarget.value;
                        await patchCompany(company.id, {
                            status: newValue,
                        });
                        setStatus(newValue);
                    }}
                    value={status}
                    className="border border-gray-500 rounded-lg w-fit px-2 py-0.5"
                >
                    <option value="Met">Met</option>
                    <option value="Not Met">Not Met</option>
                </select>
                <div>
                    <span className="text-sm text-gray-400">
                        Pre-show notes
                    </span>
                    <br></br>
                    {company.preNotes}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-400">During show notes</span>
                <textarea
                    value={duringNotes}
                    onBlur={() => {
                        patchCompany(company.id, {
                            duringNotes,
                        });
                    }}
                    onChange={(e) => setDuringNotes(e.currentTarget.value)}
                    className="rounded-lg border border-gray-500 px-2 py-0.5 w-full h-36"
                />
            </div>
            <div className="py-1">
                <h2 className="text-lg mb-2">Employees</h2>
                <div className="flex flex-col gap-1">
                    {contactsLoading && <LoadingIndicator />}
                    {!contactsLoading && companyContacts.length === 0 && (
                        <div>No contacts for {company.name} found</div>
                    )}
                    {companyContacts.map((contact) => {
                        return (
                            <Link
                                href={`/contacts/${contact.id}`}
                                className="underline"
                                key={contact.id}
                            >
                                {contact.name} ({contact.jobTitle})
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const CompanyPage = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <Header />
            <CompanyDetailsView id={params.id} />
        </>
    );
};

export default CompanyPage;
