import { useState, useEffect, useCallback } from "react";
import { Company, Contact, getCompanies, getContacts } from "./api";

const useCompanies = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCompanies = useCallback(async () => {
        console.log("fetching companies");
        setLoading(true);
        const newCompanies = await getCompanies();
        setCompanies(newCompanies);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchCompanies();
        const interval = setInterval(fetchCompanies, 60000);
        return () => clearInterval(interval);
    }, []);

    return { companies, loading };
};

const useContacts = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchContacts = useCallback(async () => {
        console.log("fetching contacts");
        setLoading(true);
        const newContacts = await getContacts();
        setContacts(newContacts);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchContacts();
        const interval = setInterval(fetchContacts, 60000);
        return () => clearInterval(interval);
    }, []);

    return { contacts, loading };
};

export { useCompanies, useContacts };
