import { FieldConfig } from "@/utils/fields";
import React, { useState, useEffect } from "react";

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

    const handleAddFilter = () => {
        setLocalFilters([...localFilters, { field: "", values: [] }]);
    };

    const handleRemoveFilter = (index: number) => {
        const newFilters = [...localFilters];
        newFilters.splice(index, 1);
        setLocalFilters(newFilters);
    };

    const handleApply = () => {
        setFilters(localFilters);
    };

    return (
        <div>
            <h3>Filter Configuration</h3>
            {localFilters.map((filter, index) => (
                <div
                    key={index}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                    }}
                >
                    <select
                        value={filter.field}
                        onChange={(e) =>
                            handleFieldChange(index, e.target.value)
                        }
                    >
                        <option value="">Select field</option>
                        {fieldConfigs
                            .filter((fc) => fc.filter && fc.values)
                            .map((fc) => (
                                <option key={fc.field} value={fc.field}>
                                    {fc.name}
                                </option>
                            ))}
                    </select>
                    {filter.field && (
                        <MultiSelect
                            options={
                                fieldConfigs.find(
                                    (fc) => fc.field === filter.field
                                )?.values || []
                            }
                            selectedValues={filter.values}
                            onChange={(values) =>
                                handleValuesChange(index, values)
                            }
                        />
                    )}
                    <button
                        type="button"
                        onClick={() => handleRemoveFilter(index)}
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={handleAddFilter}>
                Add Filter
            </button>
            <button type="button" onClick={handleApply}>
                Apply Filters
            </button>
        </div>
    );
};

export default FilterForm;
