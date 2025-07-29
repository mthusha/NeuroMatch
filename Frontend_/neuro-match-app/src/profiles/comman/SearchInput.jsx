import React, { useState } from 'react';
import { searchCompanies, searchUsers } from '../../api/searchService';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { COMPANY, USER } from "../../../src/config";
const SearchInput = ({ type = 'company', onSelect, placeholder = 'Search...' }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();

  const fetchSuggestions = async (keyword) => {
    try {
      const data =
        type === 'company'
          ? await searchCompanies(keyword)
          : await searchUsers(keyword);
      setSuggestions(data);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(true);

    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => {
      if (value.trim()) {
        fetchSuggestions(value);
      } else {
        setSuggestions([]);
      }
    }, 300);
    setTimeoutId(id);
  };

  const handleSelect = (item) => {
    setQuery(item.name);
    setShowDropdown(false);

    if (type === 'company') {
      navigate(`${COMPANY}/${item.id}`);
    } else {
      navigate(`${USER}/${item.id}`);
    }
  };


  return (
  <div className="relative w-80">
    <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-sm bg-white focus-within:ring-1 focus-within:ring-blue-500">
      <FaSearch className="text-gray-400 mr-2" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full outline-none bg-transparent text-sm text-gray-700"
      />
    </div>

    {showDropdown && suggestions.length > 0 && (
      <ul className="absolute z-20 bg-white border border-gray-200 mt-2 w-full rounded-xl shadow-lg max-h-60 overflow-y-auto animate-fade-in no-scrollbar">
        {suggestions.map((item) => (
          <li
            key={item.id}
            onClick={() => handleSelect(item)}
            className="px-4 py-2 hover:bg-blue-50 transition-colors cursor-pointer flex items-center gap-3"
          >
            {item.profilePictureBase64 ? (
              <img
                src={`data:image/jpeg;base64,${item.profilePictureBase64}`}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500 border">
                ?
              </div>
            )}

            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">{item.name}</span>
              {item.address && (
                <span className="text-xs text-gray-500 truncate">{item.address}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

};

export default SearchInput;

