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
    name: string;
}

export interface Contact {
    name: string;
}

export const getCompanies = async (): Promise<Company[]> => {
    const rawData = await getRecords("companies");
    return rawData.map((c: any) => ({ name: c.Name as string }));
};

export const getContacts = async (): Promise<Contact[]> => {
    const rawData = await getRecords("contacts");
    console.log(rawData);
    return rawData.map((c: any) => ({
        name: `${c["First Name"]} ${c["Last Name"]}` as string,
    }));
};

export const addCompany = () => {
    fetch("http://localhost:3000/api/companies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify({ name: companyName }),
    });
};

export const addContact = () => {
    fetch("http://localhost:3000/api/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify({ name: companyName }),
    });
};
