import React from 'react';
import '../../CSS/Rect.css';

function Rect(props) {

  const { logo, backgroundColor, price, name } = props;

  return (
    <div className='rect'>
      {/* <IoIosFastforward  className='rectLogo'/> */}
      {logo && <div className='rectLogo' style= {{backgroundColor}}>{logo}</div>}
      <div className='details'>
        <span className='price'>{price}</span><br/>
        <span className='name'>{name}</span>
      </div>
    </div>
  )
}

export default Rect