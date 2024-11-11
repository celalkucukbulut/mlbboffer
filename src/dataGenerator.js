import React, { useState, useEffect } from 'react';


const DataGenerator = () => {
    const [name, setName] = useState('');
    const [counters, setCounters] = useState('');
    const [counteredBy, setCounteredBy] = useState('');
    const [teammates, setTeammates] = useState('');
    const [result, setResult] = useState(null);
    const [heroes, setHeroes] = useState([]);
    const [showHeroInput, setShowHeroInput] = useState(false);
    const [selectedHeroId, setSelectedHeroId] = useState('-');


    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => setHeroes(data.heroes))
            .catch(error => console.error('Veri yüklenemedi:', error));
    }, []);

    const formatJSON = (key, value) => {
        // Eğer değer bir dizi ise, dizi elemanlarını tek satırda döndür
        if (Array.isArray(value)) {
            return JSON.stringify(value);
        }
        return value;
    };

    const handleButtonClick = () => {
        setShowHeroInput(!showHeroInput);
    };

    // Helper function to find hero ID by name
    const getHeroIds = (names) => {
        if (names.length === 0) {
            return [];
        }
            return names.split(',').map(name => {
            const hero = heroes.find(hero => hero.name.toLowerCase() === name.trim().toLowerCase());
            return hero ? hero.id : "??";
        }).filter(id => id !== null);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleGenerate();
        }
    };

    const handleKeyDownHero = ()=>{
        const hero = heroes.find(hero => hero.name.toLowerCase() === name.toLowerCase());
        setSelectedHeroId(hero.id)
    }


    const handleGenerate = () => {
        const hero = heroes.find(hero => hero.name.toLowerCase() === name.toLowerCase());
        if (!hero) {
            alert('Hero not found');
            return;
        }

        const countersIds = getHeroIds(counters);
        const counteredByIds = getHeroIds(counteredBy);
        const teammatesIds = getHeroIds(teammates);

        const resultJson = {
            id: hero.id,
            name: hero.name,
            lanes: "["+hero.lanes+"]",
            types: "["+hero.types+"]",
            counters: "["+countersIds+"]",
            counteredBy: "["+counteredByIds+"]",
            teamMates: "["+teammatesIds+"]"
        };

        setResult(resultJson);
        navigator.clipboard.writeText(JSON.stringify(resultJson, formatJSON, 2).replaceAll("\\","").replaceAll("]\"","]").replaceAll("\"[","[")+",")

    };
    var component = <div className="hero-input-container">
        <div className="input-group">
            <label>Hero Name:</label>
            <label>{selectedHeroId}</label>
            <input type="text" onBlur={handleKeyDownHero} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-group">
            <label>Counters :</label>
            <input type="text" onKeyDown={handleKeyDown} value={counters} onChange={(e) => setCounters(e.target.value)} />
        </div>
        <div className="input-group">
            <label>Countered By :</label>
            <input type="text" onKeyDown={handleKeyDown} value={counteredBy} onChange={(e) => setCounteredBy(e.target.value)} />
        </div>
        <div className="input-group">
            <label>Teammates :</label>
            <input type="text" onKeyDown={handleKeyDown} value={teammates} onChange={(e) => setTeammates(e.target.value)} />
        </div>
        <button onClick={handleGenerate} >Generate JSON</button>
        {result && (
            <div className="result">
                <pre>{JSON.stringify(result, formatJSON, 2).replaceAll("\\","").replaceAll("]\"","]").replaceAll("\"[","[")},</pre>
            </div>
        )}
    </div>

    return (
        <div>
            <button onClick={handleButtonClick}>
                Hero Generator
            </button>
            {showHeroInput && component}
        </div>


    );
};

export default DataGenerator;
