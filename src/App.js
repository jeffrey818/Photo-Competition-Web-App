import './App.css';

import Sidebar from './Components/Sidebar/Sidebar';
import Navigation from './Components/Topbar/Navigation'
import Gallery from './Components/Gallery/Gallery';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <div className='rowC'>
          <Sidebar />
          <Gallery />
        </div>
      </header>
    </div>
  );
}

export default App;
