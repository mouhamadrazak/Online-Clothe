import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
  
  

    if (products.length > 0) {
      let productsCopy = products.slice(); // amlt new var whtet b albu copy lal array products
      productsCopy = productsCopy.filter((item) => category === item.category); // iza hal fi2a btsewi lvalue te3 lfi2a tenye fa 3rod l related
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory); // same for the subcategory if is matching then keep it
      setRelated(productsCopy.slice(0, 7)); // jeeb awl 7 products
    }
  }, [products, category, subCategory]); // update when the products or the category/subcategory change

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={'RELATED'} text2={'PRODUCT'} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
