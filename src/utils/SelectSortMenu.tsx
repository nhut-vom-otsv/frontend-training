import React, { useState } from "react";
import SelectMenu from "../components/SelectMenu";
import { SortOptions } from "../constants/data";

export const SelectSortMenu = () => {
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleSortChange = (selectedOption: string) => {
    setSelectedSort(selectedOption);
  };

  const handleFilterChange = (selectedOption: string) => {
    setSelectedFilter(selectedOption);
  };

  const renderSelectSortMenu = () => {
    return (
      <>
        <SelectMenu
          options={SortOptions[0].options}
          defaultOption={SortOptions[0].name}
          onSelectionChange={handleSortChange}
        />
        <SelectMenu
          options={SortOptions[1].options}
          defaultOption={SortOptions[1].name}
          onSelectionChange={handleSortChange}
        />
        <SelectMenu
          options={SortOptions[2].options}
          defaultOption={SortOptions[2].name}
          onSelectionChange={handleFilterChange}
        />
      </>
    );
  };

  return { selectedSort, selectedFilter, renderSelectSortMenu };
};
