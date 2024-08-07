"use client";
import { Header } from "@/components/Header";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { useCompanies, useContacts } from "@/utils/hooks";
import Link from "next/link";
import { format } from "d3-format";

// s format is SI, don't want giga dollars lol
const moneyFormat = (v: number) => format("$~s")(v).replaceAll("G", "B");

const CompanyDetailsView = ({ id }: { id: string }) => {
    const { companies, loading: companiesLoading } = useCompanies();
    const { contacts, loading: contactsLoading } = useContacts();
    const company = companies.find((c) => c.id === id);
    const companyContacts = contacts.filter(
        (co) => co.companyDomain === company?.domain
    );
    if (companiesLoading) {
        return <div>Loading...</div>;
    }
    if (!company) {
        return <div>Company not found</div>;
    }
    return (
        <div className="p-2">
            <h2 className="text-2xl text-center">{company.name}</h2>
            <div className="flex flex-col gap-1">
                <div>Booth {company.boothNumber}</div>
                <Link className="underline" href={company.domain}>
                    {company.domain}
                </Link>
                <div>{moneyFormat(company.annualRevenue)} annual revenue</div>
                <div>Priority {company.priority}</div>
                <div>{company.isAFit}</div>
                <div className="text-sm text-gray-500">{company.preNotes}</div>
            </div>
            <div className="py-1 border-t border-gray-500">
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
