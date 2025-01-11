import { Outlet as Main } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <Main/>
    </div>
  );
}

export default App;
