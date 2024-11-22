import React, { useState, useEffect } from 'react';

const HeroCalculator = ({ myTeam, opposingTeam }) => {

    const [heroes, setHeroes] = useState([]);
    const [lanes, setLanes] = useState([]);

    const [bestHeroes, setBestHeroes] = useState({});

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => setHeroes(data.heroes))
            .catch(error => console.error('Veri yüklenemedi:', error));
    }, []);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => setLanes(data.lanes))
            .catch(error => console.error('Veri yüklenemedi:', error));
    }, []);

    //TODO
    const calculateScore = (hero, myTeam, opposingTeam) => {
        let score = 0;
        // Rakip takımın counteredBy ve counters listesindeki etkileri
        opposingTeam.length > 0 && opposingTeam.forEach(selectedHero => {
            if (selectedHero != null) {
                let teamHero = heroes.find(heroVal => heroVal.id === selectedHero.value);

                if (hero.counteredBy.includes(teamHero.id)
                    || (teamHero.counters.includes(hero.id))) {
                    score -= 1; // Rakip takımda counteredBy varsa -1
                }
                if (hero.counters.includes(teamHero.id)
                    || (teamHero.counteredBy.includes(hero.id))) {
                    score += 1; // Rakip takımda counter varsa +1
                }
            }
        });

        // Kendi takımındaki teammates ilişkisi
        myTeam.length > 0 && myTeam.forEach(selectedHero => {
            if (selectedHero != null) {
                let teamHero = heroes.find(heroVal => heroVal.id === selectedHero.value);

                if (hero.teamMates.includes(teamHero.id)
                    || (teamHero.teamMates.includes(hero.id))) {
                    score += 1; // Kendi takımındaki teammates varsa +1 
                }
            }
        });

        return score;
    };

    const getTeamPower = (team) => {
        let score = 0;
        team.length > 0 && team.forEach(firstHeroVal => {
            team.forEach(secondHeroVal => {
                if (firstHeroVal != null && secondHeroVal != null) {
                    let firstHero = heroes.find(heroVal => heroVal.id === firstHeroVal.value);

                    if (firstHero && firstHero.teamMates.includes(secondHeroVal.value)) {
                        score += 1; // Kendi takımındaki teammates varsa +1 
                    }
                }
            })
        });
        return score;
    }

    const getBestHeroes = () => {
        const laneScores = {};

        heroes.forEach(hero => {
            hero.lanes.forEach(laneId => {
                if (!myTeam.map(selectedHero => { return selectedHero != null && selectedHero.value }).includes(hero.id)
                    && (!opposingTeam.map(selectedHero => { return selectedHero != null && selectedHero.value }).includes(hero.id))) {
                    const score = calculateScore(hero, myTeam, opposingTeam);
                    if (!laneScores[laneId]) {
                        laneScores[laneId] = [];
                    }
                    laneScores[laneId].push({ hero, score });
                }
            });
        });

        // Her lane için en yüksek puan alan hero'yu seç
        const topHeroes = {};
        Object.keys(laneScores).forEach(laneId => {
            laneScores[laneId].sort((a, b) => b.score - a.score); // En yüksek puanlıları önce al
            topHeroes[laneId] = laneScores[laneId].slice(0, 5); // İlk 1 hero'yu al
        });

        setBestHeroes(topHeroes);
    };

    useEffect(() => {
        if (myTeam.length > 0 || opposingTeam.length > 0) {
            getBestHeroes();
        }
    }, [myTeam, opposingTeam]);

    return (
        <div>
            {/* Her lane için en iyi 5 hero'yu listele */}
            <h5>Team Power : {getTeamPower(myTeam)}</h5>
                {
                <div style={{ overflowX: "auto", margin: "2px 0" }}>
                    <table style={{ borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                            <tr>
                                {Object.keys(bestHeroes).map((lane, index) => (
                                    <th key={index} style={{ border: "1px solid black", padding: "1px" }}>
                                        {lanes.find(item => item[lane])[lane]}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {Object.keys(bestHeroes).map((lane) => (
                                    <td key={lane} style={{ border: "1px solid black", padding: "1px",textAlign:"left" }}>
                                        {bestHeroes[lane].slice(0, 5).map((heroItem, index) => (
                                            <div key={index}>
                                                {heroItem.score}-{heroItem.hero.name}
                                            </div>
                                        ))}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default HeroCalculator;