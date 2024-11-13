import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  if (loading) return <div className="text-center text-gray-400 mt-10 animate-pulse">Loading products...</div>;
  if (error) return <div className="text-center text-red-500 mt-10 font-semibold">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 p-8">
      <h2 className="text-4xl font-extrabold text-white mb-12 drop-shadow-xl text-center capitalize">
        {categoryName} Products
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full max-w-6xl">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img src={product.image} alt={product.title} className="w-full h-56 object-cover rounded-t-3xl" />
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{product.title}</h3>
              <p className="text-gray-700 text-sm mb-4 text-center truncate">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-indigo-700">${product.price}</span>
                <button className="bg-indigo-600 text-white text-sm px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryProducts;
