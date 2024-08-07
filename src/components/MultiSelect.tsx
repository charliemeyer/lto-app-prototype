const MultiSelect: React.FC<{
    options: string[];
    selectedValues: string[];
    onChange: (selected: string[]) => void;
}> = ({ options, selectedValues, onChange }) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        onChange(selectedOptions);
    };

    return (
        <select multiple value={selectedValues} onChange={handleSelectChange}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};
