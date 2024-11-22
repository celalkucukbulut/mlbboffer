import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';

const HeroSelector = ({ reset, onSelect }) => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const prevReset = useRef();

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                const { heroes, lanes, types } = data;

                // Lane ve type bilgilerini kullanarak id'leri adlara dönüştürme
                const laneMap = Object.fromEntries(lanes.map(lane => Object.entries(lane)[0]));
                const typeMap = Object.fromEntries(types.map(type => Object.entries(type)[0]));

                // Lane ve type renklerini belirleme
                const laneColors = {
                    "Gold": "#FFD700",
                    "Mid": "#A52A2A",
                    "Exp": "#32CD32",
                    "Jungle": "#228B22",
                    "Support": "#8A2BE2"
                };

                const typeColors = {
                    "Adc": "#DC143C",
                    "Mage": "#4B0082",
                    "Fighter": "#FF6347",
                    "Assassin": "#8B0000",
                    "Tank": "#4682B4",
                    "Support": "#20B2AA"
                };

                const formattedOptions = heroes.map(hero => {
                    const laneName = laneMap[hero.lanes[0]];
                    const typeName = typeMap[hero.types[0]];

                    return {
                        value: hero.id,
                        label: `${hero.name} (${laneName} | ${typeName})`,
                        laneColor: laneColors[laneName],
                        typeColor: typeColors[typeName]
                    };
                });

                setOptions(formattedOptions);
            })
            .catch(error => console.error("JSON verisi yüklenemedi:", error));
    }, []);

    useEffect(() => {
        if (prevReset.current !== reset) {
            handleChange(null); // Seçimi temizle
        }
        prevReset.current = reset;

    }, [reset]);

    const handleChange = (selected) => {
        setSelectedOption(selected);
        onSelect(selected);  // Seçilen değeri üst bileşene gönder
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '300px',
            fontSize: '16px', // Yazı tipi boyutunu artırdık
            padding: '5px',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#dcdcdc' : provided.backgroundColor, // Seçili olduğunda renk değişimi
            padding: '10px', // Seçenekler arasına daha fazla boşluk ekleyelim
            fontSize: '14px', // Yazı tipi boyutunu ayarladık
            color: state.data.laneColor, // Lane rengi
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: '16px', // Seçilen değerin yazı tipi boyutu
        })
    };

    return (
        <div style={{ display: 'flex' }}>
            <Select
                options={options}
                value={selectedOption}
                onChange={handleChange}
                isClearable={true}
                isSearchable={true}
                placeholder="Select a hero..."
                styles={customStyles}
                menuPosition="fixed"
            />
        </div>
    );
};

export default HeroSelector;
