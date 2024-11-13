// Categories.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold text-center mb-8">Product Categories</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <li key={index} className="p-4 bg-blue-100 rounded shadow hover:bg-blue-200 transition">
            <Link to={`/categories/${category}`} className="text-lg font-semibold text-blue-700 hover:text-blue-900">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
