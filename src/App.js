import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from './add'
import List from './List'
import Edit from './Edit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
