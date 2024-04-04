import { Route, Routes, Navigate } from 'react-router-dom';
import DataContext from './context/DataContext';
import data from './persistence/PersistenceHelper';
import Home from './pages/Home';
import History from './pages/History';

function App() {
  const today = new Date();
  const search = `date=${today.getMonth() + 1}-${today.getFullYear()}`;

  return (
    <DataContext.Provider value={data}>
      <Routes>
        <Route path="/" element={<Navigate to={{ pathname: '/home', search }} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </DataContext.Provider>
  );
}

export default App;
