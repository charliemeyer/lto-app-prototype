"use client";

import { Header } from "@/components/Header";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { useCompanies, useContacts } from "@/utils/hooks";
import Link from "next/link";

const ContactDetailsView = ({ id }: { id: string }) => {
    const { contacts, loading: contactLoading } = useContacts();
    const { companies, loading: companiesLoading } = useCompanies();
    const contact = contacts.find((c) => c.id === id);
    const company = companies.find((c) => c.domain === contact?.companyDomain);
    if (contactLoading) {
        return <LoadingIndicator />;
    }
    if (!contact) {
        return <div>Contact not found</div>;
    }
    return (
        <div className="p-2">
            <h2 className="text-2xl text-center">
                {contact.name}, {contact.jobTitle}
            </h2>
            {company && (
                <div className="text-center">
                    <Link
                        className="text-gray-500 underline"
                        href={`/companies/${company.id}`}
                    >
                        {company.name}
                    </Link>
                </div>
            )}
            <div className="flex flex-col gap-2 p-2">
                <div>
                    <Link
                        className="underline"
                        href={`mailto:${contact.email}`}
                    >
                        {contact.email}
                    </Link>{" "}
                    |{" "}
                    <Link className="underline" href={contact.linkedInUrl}>
                        LinkedIn
                    </Link>
                </div>
                <div>{contact.status}</div>
                <div>{contact.preNotes}</div>
            </div>
        </div>
    );
};

const ContactPage = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <Header />
            <ContactDetailsView id={params.id} />
        </>
    );
};

export default ContactPage;
