import React, { useState } from "react";

interface CheckboxGroupProps {
  options: string[];
}

export function CheckboxGroup({ options }: CheckboxGroupProps) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="checkbox-group">
      {options.map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            value={option}
            checked={selectedOption == option}
            onChange={handleCheckboxChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
}
