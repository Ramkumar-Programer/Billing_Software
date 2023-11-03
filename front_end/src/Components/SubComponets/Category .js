import React, {useState, useEffect} from 'react';
import "../../CSS/Category.css"
import scal from "sweetalert2"
import BrandWeight from './BrandWeight';

function Category({addCategoryData, fetchCategoryList, catIndex, removeCategoryForm, data})
{
    const [selectedOption, setSelectedOption] = useState('');
    const [categoryName, setCategoryName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [brandList, setBrandList] = useState([]);

    useEffect(() =>
    {
        initializeCatData();
    },[data]);


    const initializeCatData = () => 
    {
      //console.log(data)
      setCategoryName(data.category_name);
      if(data.category_id)
      {
        setCategoryId(data.category_id);
      }
      if (data.brands) {
        setBrandList(data.brands);
      }
    }

    const onClickEventAddBrand = () => {
      if(categoryName === '')
      {
        scal.fire('Warning!', 'Select Category first...!!!', 'warning');
      }
      else
      {
        const newBrandList = [...brandList, {}];
       // console.log(newBrandList);
        setBrandList(newBrandList);
      }
      
    }

    const handleAddBrandName = (data, index) =>
  {
      if(data.brand_name === '')
      {
        scal.fire('Warning!', 'Enter Brand name...!!!', 'warning');
      }
      else
      {
          setBrandList((preBrand) => {
            const newBrands = [...preBrand];
            newBrands[index] = data;
            console.log(newBrands)
            return newBrands;
          })
      }
    }

    const handleSelectChange = (event) => 
   {
      const value = event.target.value;
  
      if (value === 'others') 
      {
          setSelectedOption(value);
          setCategoryId("")
          setCategoryName("")
      } 
      else if(value === "loading")
      {
          console.log("Loding.........!")
      }
      else 
      {
          const name = fetchCategoryList.find((item) => item.category_id === parseInt(value, 10));
          setCategoryName(name.category_name)
          setSelectedOption(value);
          setCategoryId(value)

          //console.log(name.category_name)
          //console.log(value)

          // setInputsCategory((prevInputsCategory) => 
          // {
          //   const { category_name, ...rest } = prevInputsCategory;
          //   const name = fetchCategoryList.find((item) => item.category_id === parseInt(value, 10));

          //   const newCatAdd = {
          //       ...rest,
          //       category_id: value,
          //       category_name : name.category_name
          //   };
          //   return newCatAdd;
          // });
      }
    };

   const handleAddCategory = (event) =>
  {
    const value = event.target.value;
    setCategoryName(value);
    setCategoryId("");
    }

    const sendData = () =>{
      if(categoryName === '')
      {
        //scal.fire('Warning!', 'Enter Category...!!!', 'warning');
      }
      else
      {
        if(categoryId === '')
        {
          const cat = {
            category_name : categoryName,
            brands : brandList
          }
          addCategoryData(cat, catIndex);
          console.log(cat);
        }
        else if( categoryId === undefined)
        {
          console.log("cat id is undefined")
          console.log(brandList, "  ", categoryId, "  ",categoryName);
        }
        else
        {
          const cat = {
            category_id : categoryId,
            category_name : categoryName,
            brands : brandList
          }
          addCategoryData(cat, catIndex);
         // console.log(cat);
        }
        
      }
  
    }
  
    return (
      <div className='category' onBlur={sendData}>
          <div className='catCancel' onClick={()=>removeCategoryForm(catIndex)}>X</div>

          <div className='addBrand'>
            <button onClick={onClickEventAddBrand}>
                Add Brand
            </button>
          </div>

          <select value={selectedOption} onChange={handleSelectChange} className='selectCat'>
          <option value="">Select the Category</option>
              {
                fetchCategoryList.length === 0
                  ? <option value="loading">Loading...</option>
                    : (
                      <>
                      {fetchCategoryList.map((fetchData, i) => (
                          <option value={fetchData.category_id} key={fetchData.category_id}>
                            {fetchData.category_name}
                          </option>
                        ))}
                      </>
                    )
              }
              <option value="others">Others....</option>
          </select>

          {selectedOption === "others" && (
              <input
                  type="text"
                  placeholder="Enter the Category"
                  className='selectedOptionInputBox'
                  value={categoryName}
                  onChange={(event) => handleAddCategory(event)}
              />
          )}

          {
            brandList.map((brandData, i) => {
              return(
                   <BrandWeight className="brandWeightComponent" handleAddBrandName = {handleAddBrandName} brandData = {brandData} index = {i}/>
                  );
            })
          }
      </div>
    )
}
export default Category;


//import React, {useState, useEffect} from 'react';
// import "../../CSS/Category.css"
// import scal from "sweetalert2"

// function Category({addCategoryData, fetchCategoryList, catIndex, removeCategoryForm, data}){

//   const [selectedOption, setSelectedOption] = useState('');
//   //const [inputBoxes, setInputBoxes] = useState([]);
//   const [categoryName, setCategoryName] = useState("");
//   const [categoryId, setCategoryId] = useState("")
//   const [brandList, setBrandList] = useState([]);

//   // useEffect(() =>
//   //     {
//   //       initializeCatData();
//   //     },[data]);


//   const initializeCatData = () => 
//   {
//     console.log(data)
//     setCategoryName(data.category_name);
//     setCategoryId(data.category_id);
//     if (data.brands) {
//       setBrandList(data.brands);
//     } else {
//       setBrandList([]);
//     }
//   }

// //   const handleAddCategory = (event) =>
// //   {
// //     const value = event.target.value;
// //     setCategoryName(value);
// //     setCategoryId("");
// //   }

// //   const handleSelectChange = (event) => 
// //    {
// //       const value = event.target.value;
  
// //       if (value === 'others') 
// //       {
// //           setSelectedOption(value);
// //           setCategoryId("")
// //           setCategoryName("")
// //       } 
// //       else if(value === "loading")
// //       {
// //           console.log("Loding.........!")
// //       }
// //       else 
// //       {
// //           const name = fetchCategoryList.find((item) => item.category_id === parseInt(value, 10));
// //           setCategoryName(name.category_name)
// //           setSelectedOption(value);
// //           setCategoryId(value)

// //           //console.log(name.category_name)
// //           //console.log(value)

// //           // setInputsCategory((prevInputsCategory) => 
// //           // {
// //           //   const { category_name, ...rest } = prevInputsCategory;
// //           //   const name = fetchCategoryList.find((item) => item.category_id === parseInt(value, 10));

// //           //   const newCatAdd = {
// //           //       ...rest,
// //           //       category_id: value,
// //           //       category_name : name.category_name
// //           //   };
// //           //   return newCatAdd;
// //           // });
// //       }
// //    };

// //   const handleAddBrandName = (event, index) =>
// //   {
// //       let value = event.target.value;
// //       if(value === '')
// //       {
// //         scal.fire('Warning!', 'Enter Brand name...!!!', 'warning');
// //       }
// //       else
// //       {
// //           setBrandList((preBrand) => {
// //             const newBrands = [...preBrand];
// //             newBrands[index] = {brand_name : value};
// //             //console.log(newBrands)
// //             return newBrands;
// //           })
// //       }
// //   }

// //    const onClickEventAddBrand = () => {
// //     if(categoryName === '')
// //     {
// //       scal.fire('Warning!', 'Select Category first...!!!', 'warning');
// //     }
// //     else
// //     {
// //       const newBrandList = [...brandList, {}];
// //       setBrandList(newBrandList);
// //     }
    
// //   }

// //   const sendData = () =>{
// //     if(categoryName === '')
// //     {
// //       scal.fire('Warning!', 'Enter Category...!!!', 'warning');
// //     }
// //     else
// //     {
// //       if(categoryId === '')
// //       {
// //         const cat = {
// //           category_name : categoryName,
// //           brands : brandList
// //         }
// //         addCategoryData(cat, catIndex);
// //         console.log(cat);
// //       }
// //       else
// //       {
// //         const cat = {
// //           categoryId : categoryId,
// //           category_name : categoryName,
// //           brands : brandList
// //         }
// //         addCategoryData(cat, catIndex);
// //         console.log(cat);
// //       }
      
// //     }

// //   }

// //   return (
// //     <div className='category' onBlur={sendData}>
// //       <form>
// //         <div className='catCancel' onClick={()=>removeCategoryForm(catIndex)}>X</div>

// //         <div className='addBrand'>
// //           <button onClick={onClickEventAddBrand}>
// //               Add Brand
// //           </button>
// //         </div>

// //         <select value={selectedOption} onChange={handleSelectChange} className='selectCat'>
// //         <option value="">Select the Category</option>
// //             {
// //               fetchCategoryList.length === 0
// //                 ? <option value="loading">Loading...</option>
// //                   : (
// //                     <>
// //                      {fetchCategoryList.map((fetchData, i) => (
// //                         <option value={fetchData.category_id} key={fetchData.category_id}>
// //                           {fetchData.category_name}
// //                         </option>
// //                       ))}
// //                     </>
// //                   )
// //             }
// //             <option value="others">Others....</option>
// //         </select>

// //         {selectedOption === "others" && (
// //             <input
// //                 type="text"
// //                 placeholder="Enter the Category"
// //                 className='selectedOptionInputBox'
// //                 value={categoryName}
// //                 onChange={(event) => handleAddCategory(event)}
// //             />
// //         )}

// //         {
// //           brandList.map((brandData, i) => {
// //             return(
// //                   <input
// //                   type="text"
// //                   placeholder="Enter the Brand"
// //                   className='selectedOptionInputBox brand'
// //                   onChange ={(event) => handleAddBrandName(event, i)}
// //                   //value={brandData.brand_name}
// //                   key={i}
// //                 />
// //                 );
// //           })
// //         }
// //         </form>
// //     </div>
// //   )
// // }
// export default Category;








// // import React, {useState} from 'react';
// // import "../../CSS/Category.css"
// // import scal from "sweetalert2"

// // function Category({addCategoryData, fetchCategoryList}){
// //     const [selectedOption, setSelectedOption] = useState('');
// //     const [inputBoxes, setInputBoxes] = useState([]);
// //     const [inputsCategory, setInputsCategory] = useState("");
// //     //const [catId, setCatId] = useState();

// //     const handleSelectChange = (event) => {
// //       const value = event.target.value;
    
// //       if (value === 'others') {
// //         setSelectedOption(value);
// //       } 
// //       else if(value === "loading")
// //       {
// //         console.log("Loding.........!")
// //       }
// //       else {
// //         setSelectedOption(value);
// //         setInputsCategory((prevInputsCategory) => {
// //           const { category_name, ...rest } = prevInputsCategory;
// //           const name = fetchCategoryList.find((item) => item.category_id === parseInt(value, 10));

// //           const newCatAdd = {
// //             ...rest,
// //             category_id: value,
// //             category_name : name.category_name
// //           };
// //           //console.log(newCatAdd);
// //           return newCatAdd;
// //         });
// //         //console.log(inputsCategory);
// //       }
// //     };
    

// //     const handleInputBoxSelectChange = (event) => {
// //       const value = event.target.value;

// //       if(value === '')
// //       {
// //         scal.fire("Warning", "Please enter the category",'warning');
// //       }
// //       else
// //       {
// //         setInputsCategory((prevInputsCategory) => {
// //           const { category_id, ...rest } = prevInputsCategory;
// //           const newCatAdd = {
// //             ...rest,
// //             category_name: value,
// //           };
// //           //console.log(newCatAdd);
// //           return newCatAdd;
// //         });
// //       }
// //     };
    

// //   const handleInputBoxChange = (event, index) => {
// //     let value = event.target.value;
// //     setInputsCategory((prevInputsCategory) => {
// //       const newBrands = Array.isArray(prevInputsCategory.brands) ? [...prevInputsCategory.brands] : [];
// //       newBrands[index] = { ...newBrands[index], brand_name: value }; 
// //       return {
// //         ...prevInputsCategory,
// //         brands: newBrands,
// //       };
// //     });
// //     //console.log(inputsCategory)
// //   };

// //   const onClickEventAddBrand = () => {
// //     if(selectedOption === '')
// //     {
// //       scal.fire('Warning!', 'Select Category first...!!!', 'warning');
// //     }
// //     else
// //     {
// //       const newBrandList = [...inputBoxes, inputBoxes.length + 1];
// //       setInputBoxes(newBrandList);
// //     }
    
// //   }

// //   const sendData = () =>{
// //    // console.log(inputsCategory)
// //    if(inputsCategory !== '')
// //    {
// //     addCategoryData(inputsCategory);
// //    }
// //   }

  

// //     if(fetchCategoryList === null)
// //     {
// //       return(
// //         <div>Loading.............</div>
// //       )
// //     }
// //     else
// //     {
// //         return (
// //           <div className='category' onBlur={sendData}>
// //             <div className='catCancel'>X</div>
// //             <div className='addBrand'><button onClick={onClickEventAddBrand}>Add Brand</button></div>
// //             <select value={selectedOption} onChange={handleSelectChange} className='selectCat' disabled={fetchCategoryList.length === 0}>
// //               {
// //                 fetchCategoryList.length === 0
// //                   ? <option value="loading">Loading...</option>
// //                   : (
// //                     <>
// //                       <option value="">Select the Category</option>
// //                       {fetchCategoryList.map((data, i) => (
// //                         <option value={data.category_id} key={data.category_id}>
// //                           {data.category_name}
// //                         </option>
// //                       ))}
// //                       <option value="others">Others....</option>
// //                     </>
// //                   )
// //               }
// //           </select>
// //             {selectedOption === "others" && (
// //               <input
// //                 type="text"
// //                 placeholder="Enter the Category"
// //                 className='selectedOptionInputBox'
// //                 onChange={(event) => handleInputBoxSelectChange(event)}
// //                // onBlur={handleSelectChange}
// //               />
// //             )}
// //             {
// //               inputBoxes.map((data, i) => {
// //                 return(
// //                   <input
// //                   type="text"
// //                   placeholder="Enter the Brand"
// //                   className='selectedOptionInputBox brand'
// //                   onChange ={(event) => handleInputBoxChange(event, i)}
// //                   key={i}
// //                   required
// //                 />
// //                 );
// //               })
// //             }
// //           </div>
// //         );
// //     }
// // }

// // export default Category;

