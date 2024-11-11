import React, { useState } from 'react';
import HeroSelector from './heroSelector';

const Team = ({ title, onSelectionsChange }) => {
  const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(null));

  // Dropdown seçimlerini güncelleyen fonksiyon
  const handleSelect = (index) => (selected) => {
    const newSelections = [...selectedOptions];
    newSelections[index] = selected;
    setSelectedOptions(newSelections);
    onSelectionsChange(newSelections); // Güncellenmiş seçimleri üst bileşene ilet
  };

  return (
    <div>
      <h6>{title}</h6>
      {Array.from({ length: 5 }).map((_, index) => (
        <HeroSelector key={index} onSelect={handleSelect(index)} />
      ))}
    </div>
  );
};

export default Team;
