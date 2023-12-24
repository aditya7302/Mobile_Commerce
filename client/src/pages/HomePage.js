import React, { useState,useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const HomePage = () => {

  const [auth,setAuth]= useAuth();
  const [products,setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectScreen, setSelectScreen] = useState([]);
  const [processor, setProcessor] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const navigate = useNavigate();


  const handleCheckboxChange = (e) => {
    const brand = e.target.value;

    // Check if the brand is already selected
    const isSelected = selectedBrands.includes(brand);

    if (isSelected) {
      // If the brand is already selected, remove it from the state
      const updatedBrands = selectedBrands.filter((item) => item !== brand);
      setSelectedBrands(updatedBrands);
    } else {
      // If the brand is not selected, add it to the state
      setSelectedBrands([...selectedBrands, brand]);
    }
  };
  const handleProcessorChange = (e) => {
    const chip = e.target.value;

    // Check if the brand is already selected
    const isSelected = processor.includes(chip);

    if (isSelected) {
      // If the brand is already selected, remove it from the state
      const updatedBrands = processor.filter((item) => item !== chip);
      setProcessor(updatedBrands);
    } else {
      // If the brand is not selected, add it to the state
      setProcessor([...processor, chip]);
    }
  };
  const handleScreenChange = (e) => {
    const size = e.target.value;

    // Check if the brand is already selected
    const isSelected = selectScreen.includes(size);

    if (isSelected) {
      // If the brand is already selected, remove it from the state
      const updatedBrands = selectScreen.filter((item) => item !== size);
      setSelectScreen(updatedBrands);
    } else {
      // If the brand is not selected, add it to the state
      setSelectScreen([...selectScreen, size]);
    }
  };

  const getAllProducts = async () => {
    try {
    //  setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
   //   setLoading(false);
      setProducts(data.products);
    } catch (error) {
    //  setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [sort,selectedBrands,selectScreen,processor]);

  const filterProducts = async () => {
    try{
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        {
          sort,
          selectedBrands,
          selectScreen,
          processor,
        });
        setProducts(data.products);

    }catch(error){
      console.log(error);
    }
  }

  return (
    <Layout>
          <div className="container-fluid m-3 p-3">
        <div className="flex flex-col md:flex-row">
          {/* FIlters */}
          <div className="md:w-1/4">
          <h1>Filters</h1>
<div>
  <div className="flex items-center mb-4">
    <input onChange={(e) => setSort(e.target.value)} id="sort" name="sort" value={"asc"} type="radio" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">lower to higher price</label>
  </div>
  <div className="flex items-center mb-4">
    <input onChange={(e) => setSort(e.target.value)} id="sort" name="sort" value={"desc"} type="radio" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">lower to higher price</label>
  </div>
  <h1>Company</h1>
  <div className="flex items-center">
    <input           id="samsung"
          onChange={handleCheckboxChange}
          name="brand"
          value="Samsung"
          type="checkbox"
          checked={selectedBrands.includes('Samsung')}className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Samsung</label>
  </div>
  <div className="flex items-center">
    <input           id="apple"
          onChange={handleCheckboxChange}
          name="brand"
          value="Apple"
          type="checkbox"
          checked={selectedBrands.includes('Apple')}className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apple</label>
  </div>
  <div className="flex items-center">
    <input           id="vivo"
          onChange={handleCheckboxChange}
          name="brand"
          value="Vivo"
          type="checkbox"
          checked={selectedBrands.includes('Vivo')}className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vivo</label>
  </div>
  <div className="flex items-center">
    <input           id="xiomi"
          onChange={handleCheckboxChange}
          name="brand"
          value="Xiomi"
          type="checkbox"
          checked={selectedBrands.includes('Xiomi')}className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Xiomi</label>
  </div>
  <h1>Screen Size</h1>
  <div className="flex items-center">
    <input          id="6inch"
          onChange={handleScreenChange}
          name="size"
          value="6inch"
          type="checkbox"
          checked={selectScreen.includes('6inch')}className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">6inch</label>
  </div>
  <div className="flex items-center">
    <input          id="6.25inch"
          onChange={handleScreenChange}
          name="size"
          value="6.25inch"
          type="checkbox"
          checked={selectScreen.includes('6.25inch')}className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">6.25inch</label>
  </div>
  <div className="flex items-center">
    <input          id="6.5inch"
          onChange={handleScreenChange}
          name="size"
          value="6.5inch"
          type="checkbox"
          checked={selectScreen.includes('6.5inch')}className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">6.5inch</label>
  </div>
  <div className="flex items-center">
    <input          id="6.75inch"
          onChange={handleScreenChange}
          name="size"
          value="6.75inch"
          type="checkbox"
          checked={selectScreen.includes('6.75inch')}className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">6.75inch</label>
  </div>
  <h1>Processor</h1>
  <div className="flex items-center">
    <input          id="snapdragon"
          onChange={handleProcessorChange}
          name="chip"
          value="snapdragon"
          type="checkbox"
          checked={processor.includes('snapdragon')}className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Snapdragon</label>
  </div>
  <div className="flex items-center">
    <input          id="apple-silicon"
          onChange={handleProcessorChange}
          name="chip"
          value="apple-silicon"
          type="checkbox"
          checked={processor.includes('apple-silicon')}className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apple-Silicon</label>
  </div>
</div>


          </div>
          <div className="md:w-3/4">
            <div className="card w-full p-3">
            {products?.map((p) => (
              <>
                

<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <Link href="#">
    <img className="p-8 rounded-t-lg" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt="product image" />
  </Link>
  <div className="px-5 pb-5">
    <Link href="#">
      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{p.name}</h5>
    </Link>
    <div className="flex items-center mt-2.5 mb-5">
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      </div>
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
      <Link to={`/product/${p.slug}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">More Details</Link>
      <Link href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</Link>
    </div>
  </div>
</div>


              </>
            ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage





/*

               <Link
                key={p._id}
                to={`${process.env.REACT_APP_API}/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link> 

*/