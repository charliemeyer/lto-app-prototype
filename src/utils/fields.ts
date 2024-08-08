import { FilterConfig } from "@/components/FilterForm";
import { Company, Contact } from "./api";
import { SortConfig } from "@/components/SortForm";

export type FieldConfig = {
    field: string;
    name: string;
    type?: "number" | "email";
    values?: (string | number)[];
};

export const CompanyFields: FieldConfig[] = [
    {
        field: "name",
        name: "Name",
    },
    {
        field: "domain",
        name: "Website",
    },
    {
        field: "boothNumber",
        name: "Booth Number",
    },
    {
        field: "annualRevenue",
        name: "Annual Revenue",
        type: "number",
    },
    {
        field: "isAFit",
        name: "Is a Fit",
        values: ["Fit", "Not a Fit"],
    },
    {
        field: "priority",
        name: "Priority",
        values: [1, 2, 3, 4, 5],
        type: "number",
    },
    {
        field: "met",
        name: "Met",
        values: ["Met", "Not Met"],
    },
];

export const ContactFields: FieldConfig[] = [
    {
        field: "firstName",
        name: "First Name",
    },
    {
        field: "lastName",
        name: "Last Name",
    },
    {
        field: "email",
        name: "Email",
        type: "email",
    },
    {
        field: "jobTitle",
        name: "Job Title",
    },
    {
        field: "status",
        name: "Met",
        values: ["Met", "Not Met"],
    },
];

export const getSortedAndFilteredItems = (
    items: Company[] | Contact[],
    filters: FilterConfig[],
    sorts: SortConfig[],
    searchTerm: string
) => {
    const filteredItems = items.filter((item) => {
        return (
            filters.every((filter) => {
                if (filter.values.length === 0) {
                    return true;
                }
                return filter.values.includes((item as any)[filter.field]);
            }) &&
            (searchTerm === "" ||
                item.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
            !item.archived
        );
    });

    const sortedItems = filteredItems.sort((a: any, b: any) => {
        for (const sort of sorts) {
            if (sort.direction !== "none") {
                if (a[sort.field] < b[sort.field]) {
                    return sort.direction === "ascending" ? -1 : 1;
                }
                if (a[sort.field] > b[sort.field]) {
                    return sort.direction === "ascending" ? 1 : -1;
                }
            }
        }
        return 0;
    });

    return sortedItems;
};
