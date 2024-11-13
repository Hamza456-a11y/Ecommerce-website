import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Card() {
  const [dataArray, setDataArray] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [searchedProducts, setSearchedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setDataArray(response.data);
        setSearchedProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const searchResults = dataArray.filter((item) =>
      item.title.toLowerCase().includes(searchString.toLowerCase())
    );
    setSearchedProducts(searchResults);
  }, [searchString, dataArray]);

  const sortAscending = () => {
    const sortedProducts = [...searchedProducts].sort((a, b) => a.price - b.price);
    setSearchedProducts(sortedProducts);
  };

  const sortDescending = () => {
    const sortedProducts = [...searchedProducts].sort((a, b) => b.price - a.price);
    setSearchedProducts(sortedProducts);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-400 to-indigo-600 min-h-screen p-6">
      <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">Discover Our Collection</h1>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl mb-8">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="w-full px-5 py-3 rounded-full border-0 focus:outline-none shadow-lg transition duration-200 transform focus:scale-105 focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex gap-2">
          <button
            onClick={sortAscending}
            className="px-5 py-3 text-white bg-pink-500 rounded-full shadow-lg hover:bg-pink-600 transition duration-200 transform hover:scale-105"
          >
            Sort Low to High
          </button>
          <button
            onClick={sortDescending}
            className="px-5 py-3 text-white bg-pink-500 rounded-full shadow-lg hover:bg-pink-600 transition duration-200 transform hover:scale-105"
          >
            Sort High to Low
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {searchedProducts.map((product) => (
          <div key={product.id} className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-6 transform transition duration-200 hover:scale-105">
            <img src={product.image} alt={product.title} className="h-48 w-auto object-contain mb-4 rounded-lg shadow-md" />
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{product.title}</h3>
            <p className="text-gray-700 text-sm text-center mb-4">
              {product.description.length > 80 ? `${product.description.substring(0, 80)}...` : product.description}
            </p>
            <p className="text-2xl font-semibold text-purple-800">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
