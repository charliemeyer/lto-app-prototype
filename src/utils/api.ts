export async function getRecords(table: "companies" | "contacts") {
    const response = await fetch(`http://localhost:3000/api/${table}`, {
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
    isAFit: boolean;
    priority: string;
    archived: boolean;
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

// Map schema from airtable to schema for JS
export const getCompanies = async (): Promise<Company[]> => {
    console.log("GETTING COMPANIES!");
    const rawData = await getRecords("companies");

    return rawData.map((c: any) => {
        return {
            id: c["id"],
            name: c.Name as string,
            domain: c["Website"],
            preNotes: c["Pre Show Notes"],
            duringNotes: c["During Show Notes"],
            boothNumber: c["Booth Number"],
            annualRevenue: c["Annual Revenue"],
            isAFit: c["Is a fit"],
            priority: c["Priority"],
            archived: c["Archived"] === "Yes",
        } as Company;
    });
};

export const getContacts = async (): Promise<Contact[]> => {
    const rawData = await getRecords("contacts");
    return rawData.map((c: any) => {
        const email = c["Email"];
        return {
            name: `${c["First Name"]} ${c["Last Name"]}` as string,
            firstName: c["First Name"],
            lastName: c["Last Name"],
            id: c["id"],
            email,
            companyDomain: email.split("@")?.[1] || "Unknown",
            status: c["Status"],
            duringNotes: c["During Show Notes"],
            jobTitle: c["Job Title"],
            linkedInHeadshotUrl: c["Linkedin Headshot URL"],
            linkedInUrl: c["Linkedin URL"],
            preNotes: c["Pre Show Notes"],
            archived: c["Archived"] === "Yes",
        } as Contact;
    });
};

export const addCompany = (fields: Company) => {
    fetch("http://localhost:3000/api/companies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Name: fields.name,
            Website: fields.domain,
            "Pre Notes": fields.preNotes,
            "During Notes": fields.duringNotes,
            "Booth Number": fields.boothNumber,
            "Annual Revenue": fields.annualRevenue,
            "Is a fit": fields.isAFit,
            Priority: fields.priority,
            Archived: fields.archived,
        }),
    });
};

export const addContact = (fields: Contact) => {
    fetch("http://localhost:3000/api/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Email: fields.email,
            "First Name": fields.firstName,
            "Last Name": fields.lastName,
            Id: fields.id,
            Archived: fields.archived,
            Status: fields.status,
            "During Show Notes": fields.duringNotes,
            "Job Title": fields.jobTitle,
            "Linkedin Headshot URL": fields.linkedInHeadshotUrl,
            "Linkedin URL": fields.linkedInUrl,
            "Pre Show Notes": fields.preNotes,
        }),
    });
};
