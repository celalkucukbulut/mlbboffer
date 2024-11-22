import React, { useState, useEffect, useRef } from 'react';
import HeroSelector from './heroSelector';

const Team = ({ reset, title, onSelectionsChange }) => {
    const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(null));
    const prevReset = useRef();

    // Dropdown seçimlerini güncelleyen fonksiyon
    const handleSelect = (index) => (selected) => {
        const newSelections = [...selectedOptions];
        newSelections[index] = selected;
        setSelectedOptions(newSelections);
        onSelectionsChange(newSelections); // Güncellenmiş seçimleri üst bileşene ilet

    };
    useEffect(() => {
        // reset değiştiğinde selectedOptions'ı sıfırla
        if (prevReset.current !== reset) {
            setSelectedOptions(Array(5).fill(null)); // Seçimleri sıfırlıyoruz
            onSelectionsChange(Array(5).fill(null)); // Üst bileşene sıfırlanmış değerleri iletiyoruz
        }
        prevReset.current = reset; // prevReset değerini güncelliyoruz
    }, [reset, onSelectionsChange]);

    return (
        <div>
            <h6>{title}</h6>
            {Array.from({ length: 5 }).map((_, index) => (
                <HeroSelector reset={reset} key={index} onSelect={handleSelect(index)} />
            ))}
        </div>
    );
};

export default Team;
