"use client";

import { Header } from "@/components/Header";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { patchContact } from "@/utils/api";
import { useCompanies, useContacts } from "@/utils/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";

const ContactDetailsView = ({ id }: { id: string }) => {
    const { contacts, loading: contactLoading } = useContacts();
    const { companies, loading: companiesLoading } = useCompanies();
    const [status, setStatus] = useState("");
    const [duringNotes, setDuringNotes] = useState("");
    const contact = contacts.find((c) => c.id === id);
    const company = companies.find((c) => c.domain === contact?.companyDomain);
    useEffect(() => {
        if (contact) {
            setStatus(contact.status);
            setDuringNotes(contact.duringNotes);
        }
    }, [contact]);
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
                <select
                    onChange={async (e) => {
                        const newValue = e.currentTarget.value;
                        await patchContact(contact.id, {
                            status: newValue,
                        });
                        if (
                            newValue === "Met" &&
                            company?.status === "Not Met"
                        ) {
                            await patchContact(company.id, {
                                status: newValue,
                            });
                        }
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
                    {contact.preNotes}
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">
                        During show notes
                    </span>
                    <textarea
                        value={duringNotes}
                        onBlur={() => {
                            patchContact(contact.id, {
                                duringNotes,
                            });
                        }}
                        onChange={(e) => setDuringNotes(e.currentTarget.value)}
                        className="rounded-lg border border-gray-500 px-2 py-0.5 w-full h-36"
                    />
                </div>
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
