import React from "react";

const MultiSelect = ({
    options,
    selectedOptions,
    onSelect,
}: {
    options: string[];
    selectedOptions: string[];
    onSelect: (v: string[]) => void;
}) => {
    const handleSelect = (option: string) => {
        if (selectedOptions.includes(option)) {
            onSelect(selectedOptions.filter((item) => item !== option));
        } else {
            onSelect([...selectedOptions, option]);
        }
    };

    return (
        <div className="border rounded p-2">
            {options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id={option}
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleSelect(option)}
                        className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor={option} className="select-none">
                        {option}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default MultiSelect;
