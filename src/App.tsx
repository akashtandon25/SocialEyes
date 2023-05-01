import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/home';
import { Createpost } from './pages/create-post/createpost';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='createpost' element= {<Createpost/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
