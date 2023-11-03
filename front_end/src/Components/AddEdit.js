import React, {useState, useEffect} from 'react';
import "../CSS/AddEdit.css"
import axios from 'axios'
import swal from "sweetalert2"
import Category from './SubComponets/Category ';
import Product from './SubComponets/Product';

function AddEdit() {
    const [catProAddEdit, setCatProAddEdit] = useState("cat");
    const [productList, setProductList] = useState([]);
    const [fetchCategoryList, setFetchCategoryList] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    //const [categoriesList, setCategoriesList] = useState([]);
    const [buttonSubmitted, setButtonSubmitted] = useState(false);

    const addCategoryData = (data, index) => {
        console.log(data)
        console.log(index)
        const updatedCategoryData = [...categoryData];
          updatedCategoryData[index] = data;
          setCategoryData(updatedCategoryData);
        // const index = categoryData.findIndex((item) => item.category_id === data.category_id);
        
        // if (index !== -1) {
          
        //   const updatedCategoryData = [...categoryData];
        //   updatedCategoryData[index] = data;
        //   setCategoryData(updatedCategoryData);
        // } else {
        //   setCategoryData([...categoryData, data]);
        // }
      };
      
    useEffect(() =>
      {
        fetchCategory();
    }, []);

    const onClickEventCatProAddEdit = (itemName) => {
        setCatProAddEdit(itemName);
    };


    const onClickEventAddCat = () => {
        const newCategoriesList = [...categoryData, {}];
        setCategoryData(newCategoriesList);
    }


    const onClickEventAddProduct = () => {
        const newProductList = [...productList, {}]; // Initialize the new product with an empty object
        setProductList(newProductList);
    };

    // const onClickEventSubmit = async () => {
    //     try 
    //     {
    //         //setFetchCategoryList(categoryData)
    //         if(categoryData.length > 0)
    //         {
    //             const inputsCategoryJson = JSON.stringify(categoryData);
    //             console.log(inputsCategoryJson)
    //             const response = await axios.post('http://localhost:8080/api/addCategory', inputsCategoryJson, {
    //                 headers: {
    //                             'Content-Type': 'application/json',
    //                         },
    //             });
    //             if(response.data === "Categories and Brands added successfully")
    //             {
    //                 scal.fire("Sucesss", "Successfully added", 'success');
    //                 //setCategoriesList([]);
    //                 console.log(fetchCategoryList)
    //                 setFetchCategoryList((prevFetchCategoryList) => [...prevFetchCategoryList, ...categoryData]);
    //                 setCategoryData([]);
    //             }
    //         }
    //         else
    //         {
    //             scal.fire("Warning", "Please enter the category",'warning');
    //         }
    //     } 
    //     catch (error) {
    //         console.error('Axios error:', error);
    //         if (error.response) {
    //             console.error('Response data:', error.response.data);
    //             console.error('Response status:', error.response.status);
    //         }
    //     }
    //   };
      
    const onClickEventSubmit = async () => {
        try {
            setButtonSubmitted(true);
            if (categoryData.length > 0) {
                // Check if any category_name is empty
                const hasEmptyCategoryName = categoryData.some(category => {
                    const categoryName = category.category_name;
                    return !categoryName || categoryName.trim() === '';
                });
    
                if (hasEmptyCategoryName) {
                    swal.fire("Warning", "Please enter the category name", 'warning');
                } 
                else {
                    const inputsCategoryJson = JSON.stringify(categoryData);
                    console.log(inputsCategoryJson);
                    const response = await axios.post('http://localhost:8080/api/addCategory', inputsCategoryJson, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
    
                    if (response.data === "Categories and Brands added successfully") {
                        swal.fire("Success", "Successfully added", 'success');
                        fetchCategory();
                        setCategoryData([]);
                    }
                }
            } else {
                swal.fire("Warning", "Please enter at least one category", 'warning');
            }
        } catch (error) {
            console.error('Axios error:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
        }
    };

      const fetchCategory = async () => 
    {
        try 
        {
            const response = await axios.get('http://localhost:8080/api/fetchCategory');
            try 
            {
                const fetchedData = response.data;
                setFetchCategoryList(fetchedData);
                console.log(fetchedData)
            } 
            catch (error) 
            {
                console.log('Error parsing JSON data:', error);
                setFetchCategoryList([]);
            }
        } 
        catch (error) 
        {
            console.log(error);
        }
    };

    const addProduct = (data, index) => {
            const product = [...productList];
            product[index] = data;
            setProductList(product);
    }

    const removeCategoryForm = (index) => {
        const updatedCategoryData = categoryData.filter((_, i) => i !== index);
        setCategoryData(updatedCategoryData);
      };

      const removeProductForm = (index) => {
        const updatedCategoryData = productList.filter((_, i) => i !== index);
        setProductList(updatedCategoryData);
      };

      const sumbitProduct = async() => {
        const newData = productList.map(item => {
            const { category_id, ...rest } = item;
            return rest;
        });
        const inputsProductJson = JSON.stringify(newData);
        console.log(inputsProductJson);
        const response = await axios.post('http://localhost:8080/api/addProduct', inputsProductJson, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.data === "Product added successfully") {
            swal.fire("Success", "Successfully added", 'success');
            fetchCategory();
            setProductList([]);
        }
        console.log(newData);
      }

  return (
    <div className='addEdit'>
        <div className='topContentAddEdit'>
            <div className='userWiseList'>
                <span className={catProAddEdit === 'cat' ? 'dateActive' : ''} onClick={() => onClickEventCatProAddEdit('cat')}>Category</span>
                <span className={catProAddEdit === 'product' ? 'dateActive' : ''} onClick={() => onClickEventCatProAddEdit('product')}>Product</span>
            </div>
            <div className='buttonAddCategory'>
            {catProAddEdit === 'cat' ? (
                <button onClick={onClickEventAddCat}>Add Category</button>
                ) : (
                <button onClick={onClickEventAddProduct}>Add Product</button>
                )}
            </div>
        </div>
        <div className='bodyContentAddEdit'>
            {catProAddEdit === "cat" ? 
            (
                    <div className='categories'>
                    {
                        categoryData.map((data, i) => {
                        return(
                                <Category 
                                    key={i} 
                                    className = "allCategories" 
                                    data = {data} 
                                    catIndex={i}
                                    addCategoryData={addCategoryData}
                                    fetchCategoryList = {fetchCategoryList}
                                    removeCategoryForm = {removeCategoryForm}
                                    buttonSubmitted = {buttonSubmitted}
                                />
                        )
                        })   
                    }
                    {categoryData.length === 0 ? null : (
                        <div className='AddEditButton'>
                            <button onClick={onClickEventSubmit}>Submit</button>
                         </div>
                    )}
                </div>
                
            ) : (
                <div className='productList'>
                    {
                        productList.map((data, i) => {
                            return(
                                <Product className = "allProductList" fetchCategoryList = {fetchCategoryList} key={i} addProduct = {addProduct} removeProductForm= {removeProductForm} proIndex = {i} data={data}/>
                            )
                        })
                    }
                    {productList.length === 0 ? null : (
                        <div className='AddEditButton'>
                            <button onClick={sumbitProduct}>Submit</button>
                         </div>
                    )}
                </div>
            )}
        </div>
    </div>
  )
}

export default AddEdit