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

    const handleFieldChange = (index: number, field: string) => {
        const newSorts = [...localSorts];
        newSorts[index].field = field;
        setLocalSorts(newSorts);
    };

    const handleDirectionChange = (
        index: number,
        direction: "ascending" | "descending"
    ) => {
        const newSorts = [...localSorts];
        newSorts[index].direction = direction;
        setLocalSorts(newSorts);
    };

    const handleAddSort = () => {
        setLocalSorts([...localSorts, { field: "", direction: "ascending" }]);
    };

    const handleRemoveSort = (index: number) => {
        const newSorts = [...localSorts];
        newSorts.splice(index, 1);
        setLocalSorts(newSorts);
    };

    const handleApply = () => {
        setSorts(localSorts);
    };

    return (
        <div>
            {localSorts.map((sort, index) => (
                <div
                    key={index}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                    }}
                >
                    <select
                        value={sort.field}
                        onChange={(e) =>
                            handleFieldChange(index, e.target.value)
                        }
                    >
                        <option value="">Select field</option>
                        {fieldConfigs
                            .filter((fc) => fc.sort)
                            .map((fc) => (
                                <option key={fc.field} value={fc.field}>
                                    {fc.name}
                                </option>
                            ))}
                    </select>
                    <select
                        value={sort.direction}
                        onChange={(e) =>
                            handleDirectionChange(
                                index,
                                e.target.value as "ascending" | "descending"
                            )
                        }
                    >
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                    <button
                        type="button"
                        onClick={() => handleRemoveSort(index)}
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={handleAddSort}>
                Add Sort
            </button>
            <button type="button" onClick={handleApply}>
                Apply
            </button>
        </div>
    );
};

export default SortForm;
