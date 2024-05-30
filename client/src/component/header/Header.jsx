import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getProductBySearch } from '../store/slice/productSlice';

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [showSearchList, setShowSearchList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const user = useSelector((store) => store.Authentication.UserAuthLogin);
  const searchList = useSelector((store) => store.product.searchList);
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  // console.log(user.data.name)
  useEffect(() => {
    if (user && user.data) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  const searchFunction = (query) => {
    if (query.trim()) {
      dispatch(getProductBySearch(query))
        .then((response) => {
          if (response.payload && response.payload.length > 0) {
            setNoResult(false);
            setShowSearchList(true);
          } else {
            setNoResult(true);
            setShowSearchList(true);
          }
        });
    } else {
      setNoResult(false);
      setShowSearchList(false);
    }
  };

  const handleDelay = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const debouncedHandleSearch = useCallback(handleDelay(searchFunction, 500), []);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    debouncedHandleSearch(value);
  };

  return (
    <header>
      <section className="header-search-sect">
        <div className="container">
          <div className="search-bar">
            <div className="heading">
              <Link to={'/'}>
                <h1>Fasco</h1>
              </Link>
            </div>
            <div className="w-60">
              <div className="search-button">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={handleChange}
                    onFocus={() => setShowSearchList(true)}
                  />
                </div>
                <div className="search-icon">
                  <FontAwesomeIcon className='i' icon={faMagnifyingGlass} />
                </div>
              </div>
              {showSearchList && (
                <div className="search-list" ref={searchRef}>
                  {searchQuery.trim() === '' ? (
                    <div>Please enter a search term</div>
                  ) : noResult ? (
                    <div>No results found</div>
                  ) : (
                    searchList.data && searchList.data.map((props) => (
                      <Link to='/product' state={props.product_id} key={props.product_id} onClick={() => setShowSearchList(false)}>
                        <div className='search-list-div-flex'>
                          <img src={props.image} alt={props.name} />
                          <h1>{props.name}</h1>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
            {isLogged ? (
              <div className="search-bar-icon">
                <Link to="/wishlist"><i className="fa-solid fa-heart"></i></Link>
              </div>
            ) : (
              <div className="search-bar-icon">
                <span>Contact Us</span>
              </div>
            )}
            {isLogged ? (
              <Link to={'/cart'}>
                <div>
                  <FontAwesomeIcon className='i' icon={faCartShopping} />
                </div>
              </Link>
            ) : (
              <div>
                <span>About Us</span>
              </div>
            )}
            {isLogged ? (
              <div className="search-bar-icon">
                <Link to="/profile">{user.data && user.data.name}</Link>
              </div>
            ) : (
              <div className="search-bar-icon">
                <Link to="/login"><i className="fa-solid fa-user"></i></Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
