import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import './App.css';
import Login from './components/Login';
import Navigation from './components/Navigation';
import GetCars from './components/GetCars';
import Rental from './components/Rental';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="containter-p-4">
        <Routes>
          <Route exact path='/' element={< Login />}></Route>
          <Route exact path='/cars' element={< GetCars />}></Route>
          <Route exact path='/rental' element={< Rental />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
