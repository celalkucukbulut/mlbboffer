import './App.css';
import Teams from './teams';
import DataGenerator from './dataGenerator';

function App() {

    return (
        <div className="App">
            <header>
                <div>

                    <div>
                        <Teams />
                    </div>

                    { /*
                    <div style={{ flex: 1 }}>
                        <DataGenerator />
                    </div>
                */
                    }
                </div>
            </header>
        </div>
    );
}

export default App;
