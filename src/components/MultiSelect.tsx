import React from "react";

const MultiSelect = ({
    options,
    selectedOptions,
    onSelect,
}: {
    options: (string | number)[];
    selectedOptions: (string | number)[];
    onSelect: (v: (string | number)[]) => void;
}) => {
    const handleSelect = (option: string | number) => {
        if (selectedOptions.includes(option)) {
            onSelect(selectedOptions.filter((item) => item !== option));
        } else {
            onSelect([...selectedOptions, option]);
        }
    };

    return (
        <div className="flex items-center gap-4">
            {options.map((option) => (
                <div key={option} className="flex items-center space-x-1">
                    <input
                        type="checkbox"
                        id={option.toString()}
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleSelect(option)}
                        className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <label htmlFor={option.toString()} className="select-none">
                        {option}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default MultiSelect;
