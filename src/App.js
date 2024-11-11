import './App.css';
import Teams from './teams';
import DataGenerator from './dataGenerator';

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <div style={{ display: 'inline-block' }}>
                
                    <div style={{ flex: 1 }}>
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
