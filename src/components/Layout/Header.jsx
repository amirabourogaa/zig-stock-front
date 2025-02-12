import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../styles/styles'
import { productData, categoriesData } from '../../static/data'
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart
} from 'react-icons/ai'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { BiMenuAltLeft } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import DropDown from './DropDown'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import { backend_url } from '../../server'
import Cart from '../cart/Cart'
import Wishlist from '../Wishlist/Wishlist'
import { RxCross1 } from 'react-icons/rx'
import logo from '../../Assests/img/logo-zig.png'

const Header = ({ activeHeading }) => {
  const { isSeller } = useSelector(state => state.seller)
  const { cart } = useSelector(state => state.cart)
  const { wishlist } = useSelector(state => state.wishlist)
  const { isAuthenticated, user } = useSelector(state => state.user)
  const { allProducts } = useSelector(state => state.products)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchData, setSearchData] = useState(null)
  const [active, setActive] = useState(false)
  const [dropDown, setDropDown] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [openWishlist, setOpenWishlist] = useState(false)
  const [open, setOpen] = useState(false) // mobile menu

  // Handle search change
  const handleSearchChange = e => {
    const term = e.target.value
    setSearchTerm(term)

    // Filter products
    const filteredProducts =
      allProducts &&
      allProducts.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      )
    setSearchData(filteredProducts)
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 70) {
      setActive(true)
    } else {
      setActive(false)
    }
  })

  return (
    <>
      <div className={`${styles.section}`}>
        <div className='hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
  <Link 
    to='/' 
    className='flex items-center space-x-2 group hover:text-cyan-500 transition duration-300 ease-in-out'
  >
    <img className='h-45 w-40' src={logo} alt='logo zig' />
    <h3 
      className='text-lg font-semibold text-cyan-700 group-hover:text-cyan-500 transition duration-300 ease-in-out'
    >
      Zig & Stock
    </h3>
  </Link>
</div>


          {/*Search box  */}
          <div className='w-[50%] relative'>
            <input
              type='text'
              placeholder='Search for product...'
              value={searchTerm}
              onChange={handleSearchChange}
              className='h-[40px] w-full px-2 border-cyan-500 border-[2px] rounded-md '
            />
            <AiOutlineSearch
              size={30}
              className='absolute right-2 top-1.5 cursor-pointer'
            />
            {
              // Search data if length is not 0 then show
              searchData && searchData.length !== 0 ? (
                <div className='absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4'>
                  {searchData &&
                    searchData.map((i, index) => {
                      const d = i.name

                      return (
                        <Link to={`/product/${i._id}`}>
                          <div className='w-full flex items-start-py-3'>
                            <img
                              src={`${backend_url}/${i.images[0]}`}
                              alt='img'
                              className='w-[40px] h-[40px] mr-[10px]'
                            />
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      )
                    })}
                </div>
              ) : null
            }
          </div>
          {/* Search end */}

          {/* Become a Seller */}
          <div className={`${styles.button}`}>
            <Link to={`${isSeller ? '/dashboard' : '/shop-create'}`}>
              <h1 className='text-[#fff] flex items-center'>
                {isSeller ? 'Go Dashboard' : 'Become Seller'}{' '}
                <IoIosArrowForward className='ml-1' />
              </h1>
            </Link>
          </div>
          {/* Become a Seller end */}
        </div>
      </div>

     
      {/* 2nd part of header start */}
      <div
        className={`${
          active ? 'shadow-sm fixed top-0 left-0 z-10' : null
        } transition hidden 800px:flex items-center justify-between w-full bg-cyan-500 h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* Categories */}
          <div onClick={() => setDropDown(!dropDown)}>
  <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
    <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
    <button
      className={`h-full w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-medium select-none rounded-t-md hover:bg-gray-200 transition-all`}
    >
      All Categories
    </button>
    <IoIosArrowDown
      size={20}
      className="absolute right-2 top-4 cursor-pointer"
      onClick={() => setDropDown(!dropDown)}
    />
    {dropDown && (
      <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-md shadow-md z-20 max-h-[300px] overflow-y-auto">
        {/* Static list for testing visibility */}
        <ul>
          {categoriesData.map((category, index) => (
          <li
          key={index}
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center space-x-2"
        >
          <img width={24} src={category.image_Url} alt={category.title} />
          <span>{category.title}</span>
        </li>
          ))}
        </ul>
      </div>
    )}
  </div>
</div>

          {/* Nav Items */}
          <div className={`${styles.noramlFlex}`}>
            <ul className='flex space-x-6'>
              {[{page:"Home",path:'/'}, {page:'Shop',path:'/products'}, {page:'About',path:'/faq'}, {page:'Contact',path:'/contact'}].map((item, index) => (
               <Link to={`${item.path}`}>
               <li
                  key={index}
                  className="relative text-white font-semibold text-lg cursor-pointer border-b-2 border-gray-300 hover:border-white hover:text-gray-300 transition-all after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-gray-300 after:transition-all after:duration-300 hover:after:bg-white"
                >
                  {item.page}
                </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* Icons Section */}
          <div className='flex items-center space-x-4'>
            {/* Wishlist Icon */}
            <div
              className='relative cursor-pointer hover:scale-110 transition-transform'
              onClick={() => setOpenWishlist(true)}
            >
              <AiOutlineHeart size={30} color='rgb(255 255 255 / 83%)' />
              <span className='absolute right-0 top-0 rounded-full bg-black w-4 h-4 text-white text-[12px] flex items-center justify-center'>
                {wishlist && wishlist.length}
              </span>
            </div>

            {/* Cart Icon */}
            <div
              className='relative cursor-pointer hover:scale-110 transition-transform'
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} color='rgb(255 255 255 / 83%)' />
              <span className='absolute right-0 top-0 rounded-full bg-black w-4 h-4 text-white text-[12px] flex items-center justify-center'>
                {cart && cart.length}
              </span>
            </div>

            {/* Profile Avatar */}
            <div className='relative cursor-pointer'>
              {isAuthenticated ? (
                <Link to='/profile'>
                  <img
                    src={`${backend_url}/${user.avatar}`}
                    className='w-9 h-9 rounded-full hover:opacity-90 transition-opacity'
                    alt='Profile Avatar'
                  />
                </Link>
              ) : (
                <Link
                  to='/login'
                  className='hover:scale-110 transition-transform'
                >
                  <CgProfile size={30} color='rgb(255 255 255 / 83%)' />
                </Link>
              )}
            </div>

            {/* Cart Popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* Wishlist Popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div
        className={`${
          active === true ? 'shadow-sm fixed top-0 left-0 z-10' : null
        }
            w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className='w-full flex items-center justify-between'>
          <div>
            <BiMenuAltLeft
              size={40}
              className='ml-4'
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to='/' className='flex items-center space-x-0 '>
              <img className='h-24 w-24' src={logo} alt='logo zig' />
              <h3 className='text-lg font-semibold'>Zig & Stock</h3>
            </Link>
          </div>

          <div>
            <div
              className='relative mr-[20px]'
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span class='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center'>
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>
      </div>

      {/*  side bar*/}
      {open ? (
        <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
          <div className='fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll'>
            <div className='w-full justify-between flex pr-3'>
              <div>
                <div
                  className='relative mr-[15px]'
                  onClick={() => setOpenWishlist(true) || setOpen(false)}
                >
                  <AiOutlineHeart size={30} className='mt-5 ml-3' />
                  <span class='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center'>
                    {wishlist && wishlist.length}
                  </span>
                </div>
              </div>

              <RxCross1
                size={30}
                className='ml-4 mt-5 cursor-pointer'
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Search Bar */}
            <div className='my-8 w-[92%] m-auto h-[40px relative]'>
              <input
                type='search'
                placeholder='Search for products'
                className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md'
                value={searchTerm}
                onChange={handleSearchChange}
              />

              {searchData && (
                <div className='absolute bg-[#fff] z-10 shadow w-full left-0 p-3'>
                  {searchData.map(i => {
                    const d = i.name

                    const Product_name = d.replace(/\s+/g, '-')
                    return (
                      <Link to={`/product/${Product_name}`}>
                        <div className='flex items-center'>
                          <img
                            src={i.image_Url[0].url}
                            alt=''
                            className='w-[50px] mr-2'
                          />
                          <h5>{i.name}</h5>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
            <Navbar active={activeHeading} />
            <div className={`${styles.button} ml-4 !rounded-[4px]`}>
              <Link to={`${isSeller ? '/dashboard' : '/shop-create'}`}>
                <h1 className='text-[#fff] flex items-center'>
                  {isSeller ? 'Go Dashboard' : 'Become Seller'}{' '}
                  <IoIosArrowForward className='ml-1' />
                </h1>
              </Link>
            </div>
            <br />
            <br />
            <br />

            {/* Mob Login */}
            <div className='flex w-full justify-center'>
              {isAuthenticated ? (
                <div>
                  <Link to='/profile'>
                    <img
                      src={`${backend_url}/${user.avatar}`}
                      alt='Profile img'
                      className='w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]'
                    />
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to='/login'
                    className='text-[18px] pr-[10px] text-[#000000b7]'
                  >
                    Login{' '}
                  </Link>
                  <Link to='/sign-up' className='text-[18px] text-[#000000b7]'>
                    Sign up{' '}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Header
