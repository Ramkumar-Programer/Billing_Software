import React, {useState} from 'react';
import '../CSS/Home.css';
import { IoMdArrowDropdown, IoMdFlashOff } from 'react-icons/io';
import Rect from './SubComponets/Rect';

function Home() {

    const [dateActive, setDateActive] = useState("today");
    const [filterActive, setFilterActive] = useState(false);

    const onClickEventDateActive = (itemName) => {
        setDateActive(itemName);
      };

      const onClickEventFilterActive = (itemName) => {
        if(itemName === "cancel")
        setFilterActive(false);
        else 
        setFilterActive(!filterActive);
      };
    

  return (
    <div className='home'>
        <div className='topContentHome'>
            <div className='dateWiseList'>
                <span className={dateActive === 'today' ? 'dateActive' : ''} onClick={() => onClickEventDateActive('today')}>Today</span>
                <span className={dateActive === 'week' ? 'dateActive' : ''} onClick={() => onClickEventDateActive('week')}>Weekly</span>
                <span className={dateActive === 'month' ? 'dateActive' : ''} onClick={() => onClickEventDateActive('month')}>Monthly</span>
            </div>
            <div className='filterOptions'>
                <span className='filter' onClick={() => onClickEventFilterActive('')}>Filter <IoMdArrowDropdown className={`arrow ${filterActive ? 'arrowActive' : ''}`}/></span>
                <span onClick={() => onClickEventFilterActive("cancel")}>Clear</span>
            </div>
        </div>
        <div className='rectDetailsCardHome'>
        <div className='rectDetailsCard'>
          <Rect logo={<IoMdFlashOff />} backgroundColor = "blue" price = "12000" name = "Total income"/>
          <Rect logo={<IoMdFlashOff />} backgroundColor = "red" price = "12000" name = "Total income"/>
          <Rect logo={<IoMdFlashOff />} backgroundColor = "green" price = "12000" name = "Total income"/>
          <Rect logo={<IoMdFlashOff />} backgroundColor = "grey" price = "12000" name = "Total income"/>
        </div>
        </div>
        
    </div>
  )
}

export default Home