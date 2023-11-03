import React from 'react';
import '../CSS/SideBar.css';
import { FaHome, FaShoppingBag } from 'react-icons/fa';

function SideBar({toggle,activeItem, setActiveItem}) {

  const onClickEvent = (itemName) => {
    setActiveItem(itemName);
  };

 

  return (
    <div className={`sideBar ${toggle ? 'show' : ''}`}>
      <p className={activeItem === 'Home' ? 'active' : ''} onClick={() => onClickEvent('Home')}>
        <FaHome />
        Home
      </p>
      <p className={activeItem === 'Add' ? 'active' : ''} onClick={() => onClickEvent('Add')}>
        <FaShoppingBag />
        Add
      </p>
      <p className={activeItem === 'Edit' ? 'active' : ''} onClick={() => onClickEvent('Edit')}>
        Edit
      </p>
      <p className={activeItem === 'Profile' ? 'active' : ''} onClick={() => onClickEvent('Profile')}>
        Profile
      </p>
      <p className={activeItem === 'AddUsers' ? 'active' : ''} onClick={() => onClickEvent('AddUsers')}>
        Add Users
      </p>
      <p className={activeItem === 'AnotherHome' ? 'active' : ''} onClick={() => onClickEvent('AnotherHome')}>
        Another Home
      </p>

      <div className='bottom'>
        <p>Setting</p>
        <p>Logout</p>
      </div>
    </div>
  );
}

export default SideBar;
