import './Navbar.scss'
import { IoNotificationsOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import { IoIosSearch } from "react-icons/io";
import { handleSelectedCategories } from '../../Utils';
import { useEffect, useState } from 'react';
import SearchModule from '../SearchModule/SearchModule';
const Navbar = () => {
  const [categories, setCategories] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let selectedCategories = handleSelectedCategories('https://dummyjson.com/products/categories', 10)
  useEffect(() => {
    setCategories(selectedCategories)
  }, [selectedCategories])
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchFunction()
    }
    console.log("search button clicked");

  };
  const handleSearchFunction = () => {
    setInputValue('')
    window.location.href = "/products/search/" + inputValue
  }
  return (
    <nav className="navbar">
      <div className="navbar__top">
        <div className="navbar__top-right">
          <p>Hi <Link to='/'>Sign in</Link> or <Link to='/'>Register</Link></p>
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
            <li>Watchlist <FaChevronDown /></li>
            <li>My ebay <FaChevronDown /></li>
            <li><IoNotificationsOutline size={25} /></li>
            <li><IoCartOutline size={25} /></li>
          </ul>
        </div>
      </div>
      <div className="navbar__bottom">
        <img src={logo} alt="" />
        <button className='navbar__bottom-category'>
          <p>Shop by category</p> <FaChevronDown size={30} />
        </button>
        <div className="navbar__bottom-search">
          <input type="text" placeholder='Search for anything' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} />
          <IoIosSearch size={20} />
          <SearchModule inputValue={inputValue} setInputValue={setInputValue} />
          <select name="category-select" id="category-select">
            <option value="0">All Categories</option>
            <option value="1">Smartphones</option>
          </select>
        </div>
        <button className='navbar__bottom-submit' onClick={handleSearchFunction} >
          Search
        </button>
        <p className='advanced_search'>Advanced</p>
      </div>
      <div className="navbar__categories">
        <ul>
          {categories && categories.map((category) => <li><Link to={`/category/${category}`}>{category}</Link></li>)}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
