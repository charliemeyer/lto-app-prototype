import { FieldConfig } from "@/utils/fields";
import React, { useState, useEffect } from "react";

export type SortConfig = {
    field: string;
    direction: "ascending" | "descending";
};

type SortFormProps = {
    fieldConfigs: FieldConfig[];
    sorts: SortConfig[];
    setSorts: (sorts: SortConfig[]) => void;
};

const SortForm = ({ fieldConfigs, sorts, setSorts }: SortFormProps) => {
    const [localSorts, setLocalSorts] = useState<SortConfig[]>(sorts);

    useEffect(() => {
        setLocalSorts(sorts);
    }, [sorts]);

    const handleDirectionChange = (
        index: number,
        direction: "ascending" | "descending"
    ) => {
        const newSorts = [...localSorts];
        newSorts[index].direction = direction;
        setLocalSorts(newSorts);
    };

    const handleApply = () => {
        setSorts(localSorts);
    };

    return (
        <div>
            {localSorts.map((sort, index) => {
                const field = fieldConfigs.find((f) => f.field === sort.field);
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
                        <select
                            value={sort?.direction}
                            onChange={(e) => {
                                handleDirectionChange(
                                    index,
                                    e.target.value as "ascending" | "descending"
                                );
                            }}
                            defaultValue={"Select a direction"}
                        >
                            <option value="none">None</option>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                        </select>
                    </div>
                );
            })}
            <button type="button" onClick={handleApply}>
                Apply
            </button>
        </div>
    );
};

export default SortForm;
