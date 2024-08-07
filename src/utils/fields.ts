import { FilterConfig } from "@/components/FilterForm";
import { Company, Contact } from "./api";
import { SortConfig } from "@/components/SortForm";

export type FieldConfig = {
    field: string;
    name: string;
    sort?: boolean;
    filter?: boolean;
    values?: string[];
};

const CompanyFields = [
    {
        field: "boothNumber",
        name: "Booth Number",
        sort: true,
    },
    {
        field: "annualRevenue",
        name: "Annual Revenue",
        sort: true,
    },
    {
        field: "isAFit",
        name: "Is a Fit",
        sort: true,
        filter: true,
        values: ["Yes", "No"],
    },
    {
        field: "priority",
        name: "Priority",
        sort: true,
        filter: true,
        values: [1, 2, 3, 4, 5],
    },
    {
        field: "met",
        name: "Met",
        sort: true,
        filter: true,
        values: ["Met", "Not Met"],
    },
];

const ContactFields = [
    {
        field: "firstName",
        name: "First Name",
        sort: true,
    },
    {
        field: "lastName",
        name: "Last Name",
        sort: true,
    },
    {
        field: "status",
        name: "Met",
        sort: true,
        filter: true,
    },
];

export const getSortedAndFilteredItems = (
    items: Company[] | Contact[],
    filters: FilterConfig[],
    sorts: SortConfig[],
    searchTerm: string
) => {
    const filteredItems = items.filter((item) => {
        return filters.every((filter) => {
            return (
                filter.values.includes((item as any)[filter.field]) &&
                !item.archived &&
                (searchTerm === "" ||
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        });
    });

    const sortedItems = filteredItems.sort((a: any, b: any) => {
        for (const sort of sorts) {
            if (a[sort.field] < b[sort.field]) {
                return sort.direction === "ascending" ? -1 : 1;
            }
            if (a[sort.field] > b[sort.field]) {
                return sort.direction === "ascending" ? 1 : -1;
            }
        }
        return 0;
    });

    return sortedItems;
};
