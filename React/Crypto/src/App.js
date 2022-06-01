import './App.css';
import './HomePage';
import { BrowserRouter } from "react-router-dom"
import { Route, Routes } from "react-router"
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import DetailsPage from './DetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/details/:id" element={<DetailsPage/>}  /> 
        <Route path='/*' element={<div>Page Not Found</div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
