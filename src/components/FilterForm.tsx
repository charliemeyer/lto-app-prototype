import { FieldConfig } from "@/utils/fields";
import React, { useState, useEffect } from "react";
import MultiSelect from "./MultiSelect";

export type FilterConfig = {
    field: string;
    values: string[];
};

type FilterFormProps = {
    fieldConfigs: FieldConfig[];
    filters: FilterConfig[];
    setFilters: (filters: FilterConfig[]) => void;
};

const FilterForm = ({ fieldConfigs, filters, setFilters }: FilterFormProps) => {
    const [localFilters, setLocalFilters] = useState<FilterConfig[]>(filters);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleFieldChange = (index: number, field: string) => {
        const newFilters = [...localFilters];
        newFilters[index] = { field, values: [] };
        setLocalFilters(newFilters);
    };

    const handleValuesChange = (index: number, values: string[]) => {
        const newFilters = [...localFilters];
        newFilters[index].values = values;
        setLocalFilters(newFilters);
    };

    const handleApply = () => {
        setFilters(localFilters);
    };

    return (
        <div>
            {localFilters.map((filter, index) => {
                const field = fieldConfigs.find(
                    (f) => f.field === filter.field
                );
                return (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "8px",
                        }}
                    >
                        {field?.name}
                        {filter.field && (
                            <MultiSelect
                                options={field?.values || []}
                                selectedOptions={filter.values}
                                onSelect={(values) =>
                                    handleValuesChange(index, values)
                                }
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default FilterForm;
