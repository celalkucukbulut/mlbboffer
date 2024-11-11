import React, { useState } from 'react';
import Team from './team';
import HeroCalculator from './heroCalculator';

const Teams = () => {
    const [team1Selections, setTeam1Selections] = useState([]);
    const [team2Selections, setTeam2Selections] = useState([]);
    const [showHeroCalculator, setShowHeroCalculator] = useState(true);

    const handleButtonClick = () => {
        setShowHeroCalculator(!showHeroCalculator);
    };
    // İlk TeamComponent için seçimleri takip eden fonksiyon
    const handleTeam1SelectionsChange = (selections) => {
        setTeam1Selections(selections);
    };

    // İkinci TeamComponent için seçimleri takip eden fonksiyon
    const handleTeam2SelectionsChange = (selections) => {
        setTeam2Selections(selections);
    };

    var component = <div>
    <h3>Teams Overview</h3>
    <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '20px'  }}>
            <Team
                title="My Team"
                onSelectionsChange={handleTeam1SelectionsChange}
            />
        </div>
        <div style={{ flex: 1, padding: '20px'  }}>
            <HeroCalculator myTeam={team1Selections} opposingTeam={team2Selections} />
        </div>
    </div>
    <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 , padding: '20px' }}>
            <Team
                title="Opposing Team"
                onSelectionsChange={handleTeam2SelectionsChange}
            />
        </div>
        <div style={{ flex: 1 , padding: '20px' }}>
            <HeroCalculator myTeam={team2Selections} opposingTeam={team1Selections} />
        </div>
    </div>
</div>
    return (
        <div>
        <button onClick={handleButtonClick}>
            Hero Calculator
        </button>
        {showHeroCalculator && component}
    </div>
    );
};

export default Teams;
