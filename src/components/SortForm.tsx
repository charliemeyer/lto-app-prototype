import { FieldConfig } from "@/utils/fields";
import React, { useState, useEffect } from "react";

export type SortConfig = {
    field: string;
    direction: "ascending" | "descending" | "none";
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
        direction: "ascending" | "descending" | "none"
    ) => {
        const newSorts = [...localSorts];
        newSorts[index].direction = direction;
        setLocalSorts(newSorts);
    };

    const handleApply = () => {
        setSorts(localSorts);
    };

    return (
        <div className="w-full flex flex-col mt-4 gap-2">
            <h2 className="text-lg font-bold text-center">Sort</h2>
            {localSorts.map((sort, index) => {
                const field = fieldConfigs.find((f) => f.field === sort.field);
                return (
                    <div
                        key={index}
                        className="flex justify-between w-full items-center"
                    >
                        {field?.name}
                        <select
                            value={sort?.direction || "none"}
                            onChange={(e) => {
                                handleDirectionChange(
                                    index,
                                    e.target.value as "ascending" | "descending"
                                );
                            }}
                            defaultValue={"Select a direction"}
                            className="border border-gray-500 rounded px-1 py-0.5"
                        >
                            <option value="none">None</option>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Descending</option>
                        </select>
                    </div>
                );
            })}
            <button
                type="button"
                onClick={handleApply}
                className="border border-black rounded-lg mx-auto px-2 py-0.5"
            >
                Apply
            </button>
        </div>
    );
};

export default SortForm;
