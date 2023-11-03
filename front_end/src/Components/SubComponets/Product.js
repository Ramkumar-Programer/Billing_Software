import React, { useState, useEffect } from 'react'
import "../../CSS/Product.css"

function Product({addProduct,fetchCategoryList, removeProductForm, proIndex, data}) {

  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [weight, setWeight] = useState("");
  const [cp, setCp] = useState("");
  const [sp, setSp] = useState("");
  const [stock, setStock] = useState("");

  const[fetchBrandList, setFetchBrandList] = useState([]);


  useEffect(() =>
      {
        initializeData();
      }, [data]);


  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    //console.log(selectedCategory);
    const selectedCategoryData = fetchCategoryList.find((data) => data.category_id === parseInt(selectedCategory));
    //console.log(selectedCategoryData)
    const brands = selectedCategoryData ? selectedCategoryData.brands : [];
    setCategoryId(selectedCategory)
    setFetchBrandList(brands);
  };

  const initializeData = () => {
    setCategoryId(data.category_id);
    setBrandId(data.brand_id);
    setWeight(data.weight);
    setCp(data.cost_price);
    setSp(data.selling_price);
    setStock(data.stock);
  }


  const sendData = () => {
    const pro = {
      category_id : categoryId,
      brand_id : brandId,
      weight : weight,
      selling_price : sp,
      cost_price : cp,
      stock : stock
    }
    addProduct(pro, proIndex);
  }


  return (
    <div className='productForm' onBlur={sendData}>
      <div className='title'>Add Products here</div>
        <span className='productCancel'><button onClick={()=>removeProductForm(proIndex)}>X</button></span>
        <select  className='inputForm productFormSelectBox' onChange={handleCategoryChange} value={categoryId}>
              {
                fetchCategoryList.length === 0
                ? <option value="loading">Loading...</option>
                :
                (
                  <>
                  <option value="">Select the Brand</option> 
                    {
                       fetchCategoryList.map((data, i) => {
                        return(
                          <option value = {data.category_id} key={data.category_id}>{data.category_name}</option>
                        );
                      })
                    }
                  </>
                  )
              }
        </select>
        <select  className='inputForm productFormSelectBox'  onChange={(e) => setBrandId(e.target.value)} value={brandId}>
              
              {
                fetchBrandList.length === 0
                ? <option value="loading">Loading...</option>
                :
                (
                <>
                <option value="">Select the Brand</option> 
                  {
                    fetchBrandList.map((data, i) => {
                      return(
                        <option value = {data.brand_id} key={data.brand_id}>{data.brand_name}</option>
                      );
                    })
                  }
                </>
                )
              }
        </select>
        <input type='text' className='inputForm productFormInputBox' placeholder='Weight' onChange={(e) => setWeight(e.target.value)} value={weight}/>
        <input type='text' className='inputForm productFormInputBox' placeholder='Cost Price' onChange={(e) => setCp(e.target.value)} value={cp}/>
        <input type='text' className='inputForm productFormInputBox' placeholder='Selling Price' onChange={(e) => setSp(e.target.value)} value={sp}/>
        <input type='text' className='inputForm productFormInputBox' placeholder='Stock' onChange={(e) => setStock(e.target.value)} value={stock}/>
    </div>
  )
}

export default Product