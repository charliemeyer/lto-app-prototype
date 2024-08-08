export async function getRecords(table: "companies" | "contacts") {
    const response = await fetch(`/api/${table}`, {
        cache: "no-cache",
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
}

export interface Company {
    id: string;
    name: string;
    // Join key with contact
    domain: string;
    preNotes: string;
    duringNotes: string;
    boothNumber: string;
    annualRevenue: number;
    isAFit: string;
    priority: string;
    archived: boolean;
    status: string;
}

export interface Contact {
    id: string;
    // Join key with company
    companyDomain: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    status: string;
    preNotes: string;
    duringNotes: string;
    jobTitle: string;
    linkedInUrl: string;
    linkedInHeadshotUrl: string;
    archived: boolean;
}

const companyFieldNames: Record<keyof Company, string> = {
    id: "id",
    name: "Name",
    domain: "Website",
    preNotes: "Pre Show Notes",
    duringNotes: "During Show Notes",
    boothNumber: "Booth Number",
    annualRevenue: "Annual Revenue",
    isAFit: "Is a fit",
    priority: "Priority",
    status: "Status",
    archived: "Archived",
};

export const getCompanies = async (): Promise<Company[]> => {
    const rawData = await getRecords("companies");

    return rawData.map((c: any) => {
        const toReturn: Partial<Company> = {};
        Object.entries(companyFieldNames).forEach(([jsKey, airtableKey]) => {
            if (jsKey === "archived") {
                toReturn["archived"] = c["Archived"] === "Yes";
            } else {
                // @ts-ignore
                toReturn[jsKey] = c[airtableKey];
            }
        });
        return toReturn;
    });
};

const contactFieldNames: Record<keyof Contact, string> = {
    id: "id",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    preNotes: "Pre Show Notes",
    duringNotes: "During Show Notes",
    status: "Status",
    companyDomain: "",
    linkedInHeadshotUrl: "Linkedin Headshot URL",
    linkedInUrl: "Linkedin URL",
    name: "",
    jobTitle: "Job Title",
    archived: "Archived",
};

export const getContacts = async (): Promise<Contact[]> => {
    const rawData = await getRecords("contacts");

    return rawData.map((c: any) => {
        const toReturn: Partial<Contact> = {};
        Object.entries(contactFieldNames).forEach(([jsKey, airtableKey]) => {
            if (jsKey === "archived") {
                toReturn["archived"] = c["Archived"] === "Yes";
            } else if (jsKey === "name") {
                toReturn["name"] = `${c["First Name"]} ${c["Last Name"]}`;
            } else if (jsKey === "companyDomain") {
                toReturn["companyDomain"] =
                    c["Email"].split("@")?.[1] || "Unknown";
            } else {
                // @ts-ignore
                toReturn[jsKey] = c[airtableKey];
            }
        });
        return toReturn;
    });
};

export const addCompany = async (fields: Company) => {
    const postBody: Partial<Company> = {};
    Object.entries(companyFieldNames).forEach(([jsKey, airtableKey]) => {
        // @ts-ignore
        postBody[airtableKey] = fields[jsKey];
    });
    const res = await fetch("/api/companies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
    });
    return await res.json();
};

export const patchCompany = (id: string, fields: Partial<Company>) => {
    const patchBody: Partial<Company> = {};
    Object.entries(companyFieldNames).forEach(([jsKey, airtableKey]) => {
        // @ts-ignore
        if (fields[jsKey] === undefined) return;
        // @ts-ignore
        patchBody[airtableKey] = fields[jsKey];
    });

    console.log("patching company with id", id);

    fetch("/api/companies", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...patchBody }),
    });
};

export const addContact = async (fields: Contact) => {
    const postBody: Partial<Contact> = {};
    Object.entries(contactFieldNames).forEach(([jsKey, airtableKey]) => {
        // @ts-ignore
        postBody[airtableKey] = fields[jsKey];
    });
    const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
    });
    return await res.json();
};

export const patchContact = (id: string, fields: Partial<Contact>) => {
    const patchBody: Partial<Contact> = {};
    Object.entries(contactFieldNames).forEach(([jsKey, airtableKey]) => {
        // @ts-ignore
        if (fields[jsKey] === undefined) return;
        // @ts-ignore
        patchBody[airtableKey] = fields[jsKey];
    });

    fetch("/api/contacts", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...patchBody }),
    });
};
