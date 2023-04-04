import React, { useState } from "react";

const SelectMenu = (props: {
  options: string[];
  defaultOption: string;
  onSelectionChange: (selectedOption: string) => void;
}): React.ReactElement => {
  const { options, defaultOption, onSelectionChange } = props;
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelectionChange(value);
  };

  return (
    <select
      className="rounded-lg border-2 p-2 focus:border-black"
      value={selectedOption}
      onChange={handleSelectionChange}
    >
      <option value={defaultOption}>{defaultOption}</option>
      {options.map((option) => (
        <option key={option} value={option} className="text-sm">
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectMenu;
