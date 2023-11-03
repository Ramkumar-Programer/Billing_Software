import React, {useState, useEffect} from 'react'
import "../../CSS/BrandWeight.css"

function BrandWeight({handleAddBrandName, brandData, index, buttonSubmitted}) {
    
    const [brandWeight, setBrandWeight] = useState("");
    const [brandWeightType, setBrandWeightType] = useState("");
    const [brandName, setBrandName] = useState("");
    //const [brandData, setBrandData] = useState({});
    const [brandWeightFormView, setBrandWeightFormView] = useState(true);

    useEffect(() =>
      {
        if(buttonSubmitted)
        {
          sendData();
        }
    });
    const sendData = () =>
    {
        const value = 
        {
            brand_name : brandName,
            brand_weight_type : brandWeightType,
            brand_weight : brandWeight
        }
        //setBrandData(value);
        handleAddBrandName(value, index);
    }

  return (
    <div className = "addBrandForm" >
        <div className={`addBrandFormTop ${brandWeightFormView ? '' : 'minus'}`}>
           <p>X</p>
            <p>Brand_Details</p>
            <p className='plusMinus'
                onClick={
                ()=> {
                        brandWeightFormView ? 
                        setBrandWeightFormView(false): 
                        setBrandWeightFormView(true)
                        }
                }>
                {brandWeightFormView ? "--" : "+"}</p>
        </div>
    <div className={`addBrandFormBody ${brandWeightFormView ? '' : 'minus'}`}>
         <input
            type="text"
            placeholder="Enter the Brand"
            className='addBrandName'
            onChange={(e) => setBrandName(e.target.value)} 
            value={brandData.brand_name}
          />
          <div className='brandWeight'>
            <input
              type="text"
              placeholder="Enter the value"
              className='brandWeightValue'
              onChange={(e) => setBrandWeight(e.target.value)} 
              value={brandData.brand_weight}
            />
            <select className='selectWeightType' onChange={(e) => setBrandWeightType(e.target.value)} value={brandData.brand_weight_type}>
              <option value ="kg">kg</option>
              <option value = "gram">gram</option>
              <option value ="liter">liter</option>
              <option value = "ml">ml</option>
            </select>
          </div>
      </div>
  </div>
  )
}

export default BrandWeight