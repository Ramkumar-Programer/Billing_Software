import React, { useState, useEffect } from 'react';
import '../CSS/TopBar.css'
import {FaSearch} from "react-icons/fa"
import defaultProfile from '../assests/img/defaultProfilePhoto.png'

function TopBar({ toggle, setToggle }) {

    const [currentTime, setCurrentTime] = useState(new Date());
    

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    const currentDate = currentTime;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    if(hours <= 9)
    {
        hours = "0" + hours;
    }
    if(minutes <= 9)
    {
        minutes = "0" + minutes;
    }
    if(seconds <= 9)
    {
        seconds = "0" + seconds;
    }

    const onToggleClickEvent = () => {
        setToggle(!toggle);
      };


  return (
    <div className='topBar'>
        <div className={`toggle ${toggle ? 'active' : ''}`} onClick={onToggleClickEvent}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className='productName'>
            <h3 className='title'>Product Name</h3>
        </div>
        <div className='DateAndTime'>
            <p className='date'>{`${day}/${month}/${year}`}
            <span className='time'>{`${hours}:${minutes}:${seconds}`}</span>
            </p>
        </div>
        <div className='topBarSearchBox'>
            <FaSearch className='searchIcon'/>
            <input type='text' placeholder='Search something' />
        </div>
        <div className='profileDetails'>
            <div className='nameRole'>
                <p className='name'>
                    Ramkumar
                    <br/>
                    <span className='role'>
                        admin
                    </span>
                </p>
            </div>

            <div className= "profilePhoto">
                <img src= {defaultProfile} alt='noImage' className='image'/>
            </div>
        </div>
    </div>
  )
}

export default TopBar;