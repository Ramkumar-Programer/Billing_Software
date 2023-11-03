import './App.css';
import React, { useState} from 'react';
import TopBar from './Components/TopBar';
import SideBar from './Components/SideBar';
import Home from './Components/Home';
import AddEdit from './Components/AddEdit';

function App() {
    
  const [toggle, setToggle] = useState(false);
  const [activeItem, setActiveItem] = useState('Add');

  const test = () => {
    setToggle(false);
  }

  return (
    <div className="App">
       <TopBar toggle={toggle} setToggle={setToggle} />

      <SideBar toggle={toggle} activeItem = {activeItem} setActiveItem = {setActiveItem}/>

      <div className={`bodyContent ${toggle ? 'show' : ''}`} onClick={test}>
          {activeItem === 'Home' ? <Home /> : null}
          {activeItem === 'Add' ? <AddEdit /> : null}
          {activeItem === 'Edit' ? <AddEdit /> : null}
      </div>
    </div>
  );
}

export default App;
