
import 'react';
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assests } from '../assets/assests';
import Title from '../componens/Title';
import ProductItem from '../componens/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext); {/* lwma he ma fye jib lproduct */ }
  const [ShowFilter, SetShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]); {/* category → Stores selected categories as an array and setCategory → Updates the category state. */ }
  const [subCategory, setSubCategory] = useState([]); {/* same as the category */ }
  const [sortType, setSortType] = useState('relevent');

  const toggleCategory = (e) => {
    /* e (event object) contains information about which category was clicked. */  
    /* (e.target.value) is the category value from the clicked element. */  

    if (category.includes(e.target.value)) {
      /* Checks if the clicked category already exists in the array. */  
      setCategory(prev => prev.filter(item => item !== e.target.value));
      /* Removes the clicked category from category array using .filter(). */
    } else {
      setCategory(prev => [...prev, e.target.value]);
      /* If the category does not exist, add it to the array. */
    }
  };

  /* same logic as the first one nfs shi */
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = [...products]; // Always make a copy first

    if (showSearch && search.trim() !== '') { 
      // Apply search logic: ignore spaces and case sensitivity
      const searchTerm = search.trim().toLowerCase();  // ignore spaces from search input
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().replace(/\s+/g, '').includes(searchTerm.replace(/\s+/g, ''))
      );
    }
    
    if (category.length > 0) { // ✅ Check if any category is selected  
      productsCopy = productsCopy.filter(item => category.includes(item.category));
      // ✅ Keep only products that match selected categories  
    }

    if (subCategory.length > 0) { // ✅ Check if any subCategory is selected  
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
      // ✅ Keep only products that match selected subcategories  
    }

    setFilterProduct(productsCopy); // ✅ Update state to show filtered products  
  };

  /* ////// for the prices low and high filter  /////// */
  const sortProduct = () => {
    let fpCopy = filterProduct.slice(); // Create a copy of filterProduct to avoid modifying the original array.

    switch (sortType) {
      case 'low-high':
        setFilterProduct(fpCopy.sort((a, b) => a.price - b.price));
        // Sorts in ascending order (cheapest first).
        break;

      case 'high-low':
        setFilterProduct(fpCopy.sort((a, b) => b.price - a.price));
        // Sorts in descending order (most expensive first).
        break;

      default:
        applyFilter();
        // If sortType is not recognized, reset the filters.
        break;
    }
  };

  useEffect(() => {
    sortProduct(); // Runs the sorting function whenever sortType changes.
  }, [sortType]);

  useEffect(() => {
    applyFilter(); // ✅ Runs applyFilter() every time category, subCategory, search, etc changes
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    setFilterProduct(products); {/* setFilterProduct(product.slice(0,5)); law bde jz2 copy mnon baaml hk bs hala bde yehon kellon */}
  }, []);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t '> {/*flex row for laptop screen bynhtu l item jamb b3d */}
      {/* /////////////////sect1 filters option  /////////////////// */}
      <div className='min-w-60 '>
        {/*ala kelm kabse bttghyr marra true marra false */}
        <p onClick={() => SetShowFilter(!ShowFilter)} className='my-2 text-sm flex items-center cursor-pointer gap-1 '>FILTERS
          <img src={assests.dropdown_icon} className={`h-5 w-5 sm:hidden ${ShowFilter === true ? 'rotate-90' : ''}`} alt="" />
        </p>

        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${ShowFilter === true ? '' : 'hidden'} sm:block `}>
          {/* this to hide search bar filter from small screen and show it on big screen */}
          <p className='mb-3 text-sm font-medium'>CATEGORIES </p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 '>
              <input className='w-3 ' type="checkbox" value={'Men'} onChange={toggleCategory} />Men
            </p>
            <p className='flex gap-2 '>
              <input className='w-3 ' type="checkbox" value={'Women'} onChange={toggleCategory} />Women
            </p>
            <p className='flex gap-2 '>
              <input className='w-3 ' type="checkbox" value={'Kids'} onChange={toggleCategory} />Kids
            </p>
            <p className='flex gap-2 '>
              <input className='w-3 ' type="checkbox" value={'Abaya'} onChange={toggleCategory} />Abaya
            </p>
          </div>
        </div>

        {/* Sub categories just copy categories filter and paste and change */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${ShowFilter === true ? '' : 'hidden'} sm:block `}>
          {/* this to hide search bar filter from small screen and show it on big screen */}
          <p className='mb-3 text-sm font-medium'>TYPE </p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 '>
              <input className='w-3 ' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />Topwear
            </p>
            <p className='flex gap-2 '>
              <input className='w-3 ' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />Bottomwear
            </p>
            <p className='flex gap-2 '>
              <input className='w-3 ' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL '} text2={'COLLECTION'} />
          {/*product sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: low-high </option>
            <option value="high-low">Sort By: high-low</option>
          </select>
        </div>

        {/* ///////////////////map product//////////// */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 '>
          {filterProduct.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

