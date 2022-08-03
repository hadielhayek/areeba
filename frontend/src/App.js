import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerPage from './views/customerPage/customerPage';
import AddEdit from './views/addEdit/addEdit';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerPage />} exact />
        <Route path="/add" element={<AddEdit/>} />
        <Route path="/edit/:id" element={<AddEdit/>} />
      </Routes>


    </BrowserRouter>
  );
}

export default App;
