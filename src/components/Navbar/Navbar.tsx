import './Navbar.scss'
import { IoNotificationsOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import { IoIosSearch } from "react-icons/io";
import { useFetchCategories, loadFromLocalStorage } from '../../Utils';
import { useEffect, useState } from 'react';
import SearchModule from '../SearchModule/SearchModule';
import CategoryModule from '../CategoryModule/CategoryModule';
import { Category } from '../../types/Product';

const Navbar = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isClicked, setisClicked] = useState<boolean>(false)
  const [isSignIn, setIsSignIn] = useState(false)
  const user = loadFromLocalStorage('user')
  
  const rawCategories = useFetchCategories('https://dummyjson.com/products/categories', 10);
  
  useEffect(() => {
    if(user && user.userDatatoken) {
      setIsSignIn(true)
    } else {
      setIsSignIn(false)
    }
  }, [user])

  useEffect(() => {
    if (Array.isArray(rawCategories)) {
      const formattedCategories = rawCategories.map(categoryName => ({
        name: String(categoryName),
        slug: String(categoryName).toLowerCase().replace(/\s+/g, '-'),
        url: `https://dummyjson.com/products/category/${String(categoryName).toLowerCase().replace(/\s+/g, '-')}`
      }));
      setCategories(formattedCategories);
    }
  }, [rawCategories]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchFunction()
    }
  };

  const handleSearchFunction = () => {
    if (inputValue.trim()) {
      setInputValue('')
      window.location.href = "/products/search/" + inputValue
    }
  }
  
  return (
    <nav className="navbar">
      <div className="navbar__top">
        <div className="navbar__top-right">
          <p>Hi {isSignIn && user ? (
            <span>{user.username}</span>
          ) : (
            <span>(<Link to='/login'>Sign in</Link> or <Link to='/signup'>Register</Link>)</span>
          )}</p>
          <ul>
            <li>Daily deals</li>
            <li>Brand outlets</li>
            <li>Gift cards</li>
            <li>Help & Support</li>
          </ul>
        </div>
        <div className="navbar__top-right">
          <ul>
            <li>Sell</li>
            <li><Link to="/like">Watchlist <FaChevronDown /></Link></li>
            <li>My ebay <FaChevronDown /></li>
            <li><IoNotificationsOutline size={25} /></li>
            <li><Link to="/cart"><IoCartOutline size={25} /></Link></li>
          </ul>
        </div>
      </div>
      <div className="navbar__bottom">
        <img src={logo} alt="" />
        <button className='navbar__bottom-category' onClick={() => setisClicked(!isClicked)}>
          <p>Shop by category</p> <FaChevronDown size={30} />
          <CategoryModule isClicked={isClicked} setisClicked={setisClicked}/>
        </button>
        <div className="navbar__bottom-search">
          <input type="text" placeholder='Search for anything' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} />
          <IoIosSearch size={20} />
          <SearchModule inputValue={inputValue} setInputValue={setInputValue} />
          <select name="category-select" id="category-select">
            <option value="0">All Categories</option>
            {categories && categories.map((category, index) => (
              <option key={index} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <button className='navbar__bottom-submit' onClick={handleSearchFunction} >
          Search
        </button>
        <p className='advanced_search'>Advanced</p>
      </div>
      <div className="navbar__categories">
        <ul>
          {categories && categories.map((category, index) => (
            <li key={index}>
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
