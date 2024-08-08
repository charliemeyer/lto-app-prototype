import { useState, useEffect, useCallback } from "react";
import { Company, Contact, getCompanies, getContacts } from "./api";

const useCompanies = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCompanies = useCallback(async () => {
        setLoading(true);
        const newCompanies = await getCompanies();
        setCompanies(newCompanies);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchCompanies();
        const interval = setInterval(fetchCompanies, 120000);
        return () => clearInterval(interval);
    }, []);

    return { companies, loading };
};

const useContacts = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContacts = useCallback(async () => {
        setLoading(true);
        const newContacts = await getContacts();
        setContacts(newContacts);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchContacts();
        const interval = setInterval(fetchContacts, 120000);
        return () => clearInterval(interval);
    }, []);

    return { contacts, loading };
};

export { useCompanies, useContacts };
