import React, { useState } from 'react';
import Team from './team';
import HeroCalculator from './heroCalculator';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row', // Varsayılan: yan yana
        padding: '2px',
        gap: '2px', // Elemanlar arasındaki boşluk
        flexWrap: 'wrap', // Ekran daraldığında içerik sarılır
    },
    '@media (max-width: 768px)': {
        container: {
            flexDirection: 'column', // Mobilde üst üste
        },
    },
};


const Teams = () => {
    const [team1Selections, setTeam1Selections] = useState([]);
    const [team2Selections, setTeam2Selections] = useState([]);
    const [reset, setReset] = useState(false);

    // İlk TeamComponent için seçimleri takip eden fonksiyon
    const handleTeam1SelectionsChange = (selections) => {
        setTeam1Selections(selections);

    };

    // İkinci TeamComponent için seçimleri takip eden fonksiyon
    const handleTeam2SelectionsChange = (selections) => {
        setTeam2Selections(selections);
    };

    const resetSelections = () => {
        setReset(!reset);

    };

    var component = <div>
        <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h4>Hero Calculator</h4>
                <div style={styles.container}>
                    <Team
                        reset={reset}
                        title="My Team"
                        onSelectionsChange={handleTeam1SelectionsChange}
                    />
                    <HeroCalculator
                        reset={reset}
                        myTeam={team1Selections}
                        opposingTeam={team2Selections}
                    />
                </div>
                <div style={styles.container}>
                    <Team
                        reset={reset}
                        title="Opposing Team"
                        onSelectionsChange={handleTeam2SelectionsChange}
                    />
                    <HeroCalculator
                        reset={reset}
                        myTeam={team2Selections}
                        opposingTeam={team1Selections}
                    />
                </div>
                <div style={styles.container}>
                    <button onClick={resetSelections}>Reset</button>
                </div>
            </div>

        </div>
    </div>
    return (
        <div>
            {component}
        </div>
    );
};

export default Teams;
