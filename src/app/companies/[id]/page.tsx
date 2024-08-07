"use client";
import { Header } from "@/components/Header";
import { useCompanies, useContacts } from "@/utils/hooks";
import Link from "next/link";

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
            <h2 className="text-xl">{company.name}</h2>
            <div className="flex flex-col gap-2">
                <div>{company.boothNumber}</div>
                <div>{company.preNotes}</div>
            </div>
            <div className="p-2 border border-gray-500 rounded-lg">
                <h2 className="text-lg">Employees</h2>
                <div className="flex flex-col gap-2">
                    {contactsLoading && <div>Loading...</div>}
                    {!contactsLoading && companyContacts.length === 0 && (
                        <div>No contacts for {company.name} found</div>
                    )}
                    {companyContacts.map((contact) => {
                        return (
                            <Link href={`/contacts/${contact.id}`}>
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
