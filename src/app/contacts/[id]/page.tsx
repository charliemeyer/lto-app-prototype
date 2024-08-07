"use client";

import { Header } from "@/components/Header";
import { useContacts } from "@/utils/hooks";

const ContactDetailsView = ({ id }: { id: string }) => {
    const { contacts, loading } = useContacts();
    const company = contacts.find((c) => c.id === id);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!company) {
        return <div>Contact not found</div>;
    }
    return (
        <div className="flex flex-col gap-2 p-2">
            <div>{company.name}</div>
            <div>{company.jobTitle}</div>
            <div>{company.preNotes}</div>
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
