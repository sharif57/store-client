



// import { useContext, useState, useEffect } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../AuthProvider/AuthProvider";
// import Login from "./Login";

// const Navbar = () => {
//     const { user, logOut } = useContext(AuthContext);

//     const handleLogOut = () => {
//         logOut()
//             .then(() => console.log('Logout successful'))
//             .catch(error => console.error(error));
//     };

//     const [stores, setStores] = useState([]);
//     const [brands, setBrands] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [sortOption, setSortOption] = useState('priceLowToHigh');
//     const [selectedBrand, setSelectedBrand] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10; // Number of items per page

//     useEffect(() => {
//         // Fetch products, brands, and categories
//         fetch('http://localhost:5000/storeInfo')
//             .then(res => res.json())
//             .then(data => {
//                 setStores(data);
//                 // Extract unique brands and categories
//                 const uniqueBrands = [...new Set(data.map(store => store.brandName))];
//                 const uniqueCategories = [...new Set(data.map(store => store.category))];
//                 setBrands(uniqueBrands);
//                 setCategories(uniqueCategories);
//             })
//             .catch(error => console.error('Error fetching store data:', error));
//     }, []);

//     const handleSearchChange = (event) => {
//         setSearchQuery(event.target.value);
//     };

//     const handleSortChange = (event) => {
//         setSortOption(event.target.value);
//     };

//     const handleBrandChange = (event) => {
//         setSelectedBrand(event.target.value);
//     };

//     const handleCategoryChange = (event) => {
//         setSelectedCategory(event.target.value);
//     };

//     const handlePriceRangeChange = (event) => {
//         const [min, max] = event.target.value.split(',').map(Number);
//         setPriceRange([min, max]);
//     };

//     const filteredAndSortedStores = stores
//         .filter(store =>
//             store.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
//             (selectedBrand ? store.brandName === selectedBrand : true) &&
//             (selectedCategory ? store.categoryName === selectedCategory : true) &&
//             (store.price >= priceRange[0] && store.price <= priceRange[1])
//         )
//         .sort((a, b) => {
//             switch (sortOption) {
//                 case 'priceLowToHigh':
//                     return a.price - b.price;
//                 case 'priceHighToLow':
//                     return b.price - a.price;
//                 case 'dateNewest':
//                     return new Date(b.createdAt) - new Date(a.createdAt);
//                 default:
//                     return 0;
//             }
//         });

//     // Pagination calculations
//     const totalItems = filteredAndSortedStores.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const paginatedStores = filteredAndSortedStores.slice(startIndex, startIndex + itemsPerPage);

//     const handlePageChange = (pageNumber) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber);
//         }
//     };

//     return (
//         <div>
//             <div className="bg-base-300">
//                 <div className="navbar container mx-auto">
//                     {/* Navbar code here (same as before) */}

//                     <div className="navbar-start">
//                         <div className="dropdown">
//                             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className="h-5 w-5"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor">
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M4 6h16M4 12h8m-8 6h16" />
//                                 </svg>
//                             </div>
//                             <ul
//                                 tabIndex={0}
//                                 className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//                                 <div className="mb-4">
//                                     <select
//                                         value={sortOption}
//                                         onChange={handleSortChange}
//                                         className="select select-bordered w-full"
//                                     >
//                                         <option value="priceLowToHigh">Price: Low to High</option>
//                                         <option value="priceHighToLow">Price: High to Low</option>
//                                         <option value="dateNewest">Date Added: Newest First</option>
//                                     </select>
//                                 </div>
//                                 <div className="mb-4">
//                                     <select
//                                         value={selectedBrand}
//                                         onChange={handleBrandChange}
//                                         className="select select-bordered w-full"
//                                     >
//                                         <option value="">Select Brand</option>
//                                         {brands.map((brand) => (
//                                             <option key={brand} value={brand}>{brand}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="mb-4">
//                                     <select
//                                         value={selectedCategory}
//                                         onChange={handleCategoryChange}
//                                         className="select select-bordered w-full"
//                                     >
//                                         <option value="">Select Category</option>
//                                         {categories.map((store) => (
//                                             <option key={store} value={store}>{store}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="mb-4">
//                                     <input
//                                         type="text"
//                                         placeholder="Price Range (min,max)"
//                                         className="input input-bordered w-full"
//                                         onChange={handlePriceRangeChange}
//                                     />
//                                 </div>
//                             </ul>
//                         </div>
//                         <Link className="btn btn-ghost text-xl">Mobile Store</Link>
//                     </div>
//                     <div className="navbar-center hidden lg:flex">
//                         <ul className="menu menu-horizontal px-1">
//                             <div className="mb-4">
//                                 <select
//                                     value={sortOption}
//                                     onChange={handleSortChange}
//                                     className="select select-bordered w-full"
//                                 >
//                                     <option value="priceLowToHigh">Price: Low to High</option>
//                                     <option value="priceHighToLow">Price: High to Low</option>
//                                     <option value="dateNewest">Date Added: Newest First</option>
//                                 </select>
//                             </div>
//                             <div className="mb-4">
//                                 <select
//                                     value={selectedBrand}
//                                     onChange={handleBrandChange}
//                                     className="select select-bordered w-full"
//                                 >
//                                     <option value="">Select Brand</option>
//                                     {brands.map((brand) => (
//                                         <option key={brand} value={brand}>{brand}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="mb-4">
//                                 <select
//                                     value={selectedCategory}
//                                     onChange={handleCategoryChange}
//                                     className="select select-bordered w-full"
//                                 >
//                                     <option value="">Select Category</option>
//                                     {categories.map((store) => (
//                                         <option key={store} value={store}>{store}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="mb-4">
//                                 <input
//                                     type="text"
//                                     placeholder="Price Range (min,max)"
//                                     className="input input-bordered w-full"
//                                     onChange={handlePriceRangeChange}
//                                 />
//                             </div>
//                         </ul>
//                     </div>
//                     <div className="navbar-end">
//                         <div className="flex items-center justify-center gap-2">
//                             <div className="form-control">
//                                 <input
//                                     type="text"
//                                     placeholder="Search by product name"
//                                     className="input input-bordered w-full"
//                                     value={searchQuery}
//                                     onChange={handleSearchChange}
//                                 />
//                             </div>

//                             <ul>
//                                 {!user && (
//                                     <li>

//                                         {/* Open the modal using document.getElementById('ID').showModal() method */}
//                                         <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}><NavLink to={'/login'} className={({ isActive }) => isActive ? 'text-primary font-bold' : 'font-bold'}>Login</NavLink></button>
//                                         <dialog id="my_modal_2" className="modal">
//                                             <div className="modal-box bg-slate-400">
//                                                 <Login></Login>

//                                             </div>
//                                             <form method="dialog" className="modal-backdrop">
//                                                 <button>close</button>
//                                             </form>
//                                         </dialog>
//                                     </li>

//                                 )}
//                             </ul>
//                         </div>
//                         <div className="flex-none z-10">
//                             {user && (
//                                 <div className='dropdown dropdown-end z-50'>
//                                     <div
//                                         tabIndex={0}
//                                         role='button'
//                                         className='btn btn-ghost btn-circle avatar'
//                                     >
//                                         <div title={user?.displayName} className='w-10 rounded-full'>
//                                             <img
//                                                 referrerPolicy='no-referrer'
//                                                 alt='User Profile Photo'
//                                                 src={user?.photoURL}
//                                             />
//                                         </div>
//                                     </div>
//                                     <ul
//                                         tabIndex={0}
//                                         className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
//                                     >
//                                         <li>
//                                             <NavLink className={({ isActive }) => isActive ? 'text-primary font-bold' : 'font-bold'}>{user?.displayName}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to='dashboard' className={({ isActive }) => isActive ? 'text-primary font-bold' : 'font-bold'}>User Profile</NavLink>
//                                         </li>
//                                         <li className='mt-2'>
//                                             <button onClick={handleLogOut} className='bg-gray-200 block text-center'>Logout</button>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//             </div>
//             <div className="container mx-auto p-4">
//                 <div className="mb-4">

//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {paginatedStores.length > 0 ? (
//                         paginatedStores.map(store => (
//                             <div key={store.id} className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden mx-auto">
//                                 <img className="w-full h-48 object-cover object-center" src={store.productImage} alt={store.productName} />
//                                 <div className="p-4">
//                                     <h2 className="text-gray-900 text-lg font-semibold">{store.productName}</h2>
//                                     <p className="text-gray-600 text-sm mt-2">{store.description}</p>
//                                     <div className="flex justify-between items-center mt-4">
//                                         <span className="text-gray-900 font-bold">${store.price}</span>
//                                         <span className="text-yellow-500 text-sm">{`⭐ ${store.ratings}`}</span>
//                                     </div>
//                                     <div className="text-gray-500 text-xs mt-1">Added on: {new Date(store.createdAt).toLocaleDateString()}</div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No products available.</p>
//                     )}
//                 </div>
//                 <div className="flex justify-center mt-4">
//                     <button
//                         className="btn btn-outline"
//                         onClick={() => handlePageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                     >
//                         Previous
//                     </button>
//                     <span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
//                     <button
//                         className="btn btn-outline"
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;








// import { useContext, useState, useEffect } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../AuthProvider/AuthProvider";
// import Login from "./Login";
// import Register from './Register'

// const Navbar = () => {
//     const { user, logOut } = useContext(AuthContext);

//     const [modalContent, setModalContent] = useState('login'); // State to switch between login and register

//     const handleOpenModal = (content) => {
//         setModalContent(content);
//         document.getElementById('auth_modal').showModal();
//     };


//     const handleLogOut = () => {
//         logOut()
//             .then(() => console.log('Logout successful'))
//             .catch(error => console.error(error));
//     };

//     const [stores, setStores] = useState([]);
//     const [brands, setBrands] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [sortOption, setSortOption] = useState('priceLowToHigh');
//     const [selectedBrand, setSelectedBrand] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10; // Number of items per page

//     useEffect(() => {
//         // Fetch products, brands, and categories
//         fetch('http://localhost:5000/storeInfo')
//             .then(res => res.json())
//             .then(data => {
//                 setStores(data);
//                 // Extract unique brands and categories
//                 const uniqueBrands = [...new Set(data.map(store => store.brandName))];
//                 const uniqueCategories = [...new Set(data.map(store => store.category))];
//                 setBrands(uniqueBrands);
//                 setCategories(uniqueCategories);
//             })
//             .catch(error => console.error('Error fetching store data:', error));
//     }, []);

//     const handleSearchChange = (event) => {
//         setSearchQuery(event.target.value);
//     };

//     const handleSortChange = (event) => {
//         setSortOption(event.target.value);
//     };

//     const handleBrandChange = (event) => {
//         setSelectedBrand(event.target.value);
//     };

//     const handleCategoryChange = (event) => {
//         setSelectedCategory(event.target.value);
//     };

//     const handlePriceRangeChange = (event) => {
//         const [min, max] = event.target.value.split(',').map(Number);
//         setPriceRange([min, max]);
//     };

//     const filteredAndSortedStores = stores
//         .filter(store =>
//             store.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
//             (selectedBrand ? store.brandName === selectedBrand : true) &&
//             (selectedCategory ? store.categoryName === selectedCategory : true) &&
//             (store.price >= priceRange[0] && store.price <= priceRange[1])
//         )
//         .sort((a, b) => {
//             switch (sortOption) {
//                 case 'priceLowToHigh':
//                     return a.price - b.price;
//                 case 'priceHighToLow':
//                     return b.price - a.price;
//                 case 'dateNewest':
//                     return new Date(b.createdAt) - new Date(a.createdAt);
//                 default:
//                     return 0;
//             }
//         });

//     // Pagination calculations
//     const totalItems = filteredAndSortedStores.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const paginatedStores = filteredAndSortedStores.slice(startIndex, startIndex + itemsPerPage);

//     const handlePageChange = (pageNumber) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber);
//         }
//     };

//     return (
//         <div>
//             <div className="bg-base-300">
//                 <div className="navbar container mx-auto">
//                     {/* Navbar code here (same as before) */}

//                     <div className="navbar-start">
//                         <div className="dropdown">
//                             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className="h-5 w-5"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor">
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M4 6h16M4 12h8m-8 6h16" />
//                                 </svg>
//                             </div>
//                             <ul
//                                 tabIndex={0}
//                                 className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//                                 <div className="mb-4">
//                                     <select
//                                         value={sortOption}
//                                         onChange={handleSortChange}
//                                         className="select select-bordered w-full"
//                                     >
//                                         <option value="priceLowToHigh">Price: Low to High</option>
//                                         <option value="priceHighToLow">Price: High to Low</option>
//                                         <option value="dateNewest">Date Added: Newest First</option>
//                                     </select>
//                                 </div>
//                                 <div className="mb-4">
//                                     <select
//                                         value={selectedBrand}
//                                         onChange={handleBrandChange}
//                                         className="select select-bordered w-full"
//                                     >
//                                         <option value="">Select Brand</option>
//                                         {brands.map((brand) => (
//                                             <option key={brand} value={brand}>{brand}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="mb-4">
//                                     <select
//                                         value={selectedCategory}
//                                         onChange={handleCategoryChange}
//                                         className="select select-bordered w-full"
//                                     >
//                                         <option value="">Select Category</option>
//                                         {categories.map((store) => (
//                                             <option key={store} value={store}>{store}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="mb-4">
//                                     <input
//                                         type="text"
//                                         placeholder="Price Range (min,max)"
//                                         className="input input-bordered w-full"
//                                         onChange={handlePriceRangeChange}
//                                     />
//                                 </div>
//                             </ul>
//                         </div>
//                         <Link className="btn btn-ghost text-xl">Mobile Store</Link>
//                     </div>
//                     <div className="navbar-center hidden lg:flex">
//                         <ul className="menu menu-horizontal px-1">
//                             <div className="mb-4">
//                                 <select
//                                     value={sortOption}
//                                     onChange={handleSortChange}
//                                     className="select select-bordered w-full"
//                                 >
//                                     <option value="priceLowToHigh">Price: Low to High</option>
//                                     <option value="priceHighToLow">Price: High to Low</option>
//                                     <option value="dateNewest">Date Added: Newest First</option>
//                                 </select>
//                             </div>
//                             <div className="mb-4">
//                                 <select
//                                     value={selectedBrand}
//                                     onChange={handleBrandChange}
//                                     className="select select-bordered w-full"
//                                 >
//                                     <option value="">Select Brand</option>
//                                     {brands.map((brand) => (
//                                         <option key={brand} value={brand}>{brand}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="mb-4">
//                                 <select
//                                     value={selectedCategory}
//                                     onChange={handleCategoryChange}
//                                     className="select select-bordered w-full"
//                                 >
//                                     <option value="">Select Category</option>
//                                     {categories.map((store) => (
//                                         <option key={store} value={store}>{store}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="mb-4">
//                                 <input
//                                     type="text"
//                                     placeholder="Price Range (min,max)"
//                                     className="input input-bordered w-full"
//                                     onChange={handlePriceRangeChange}
//                                 />
//                             </div>
//                         </ul>
//                     </div>
//                     <div className="navbar-end">
//                         <div className="flex items-center justify-center gap-2">
//                             <div className="form-control">
//                                 <input
//                                     type="text"
//                                     placeholder="Search by product name"
//                                     className="input input-bordered w-full"
//                                     value={searchQuery}
//                                     onChange={handleSearchChange}
//                                 />
//                             </div>

//                             <ul className="flex space-x-4">
//                                 {!user && (
//                                     <li>
//                                         {/* Button to open modal with login or register content */}
//                                         <button
//                                             className="btn"
//                                             onClick={() => handleOpenModal('login')}
//                                         >
//                                             <NavLink
//                                                 to={'/login'}
//                                                 className={({ isActive }) => isActive ? 'text-primary font-bold' : 'font-bold'}
//                                             >
//                                                 Login / Register
//                                             </NavLink>
//                                         </button>
//                                     </li>
//                                 )}

//                                 {/* Modal */}
//                                 <dialog id="auth_modal" className="modal">
//                                     <div className="modal-box bg-slate-400">
//                                         {modalContent === 'login' && <Login />}
//                                         {modalContent === 'register' && <Register />}
//                                         <div className="flex justify-between mt-4">
//                                             <button
//                                                 className="text-black hover:underline"
//                                                 onClick={() => handleOpenModal('register')}
//                                             >
//                                                 <div className="mt-4">
//                                                     <p>Create a new account <Link to={'/register'} className="font-bold  border-b-2 border-emerald-500">Register</Link></p>
//                                                 </div>                                            </button>
//                                             <button
//                                                 className="text-black hover:underline"
//                                                 onClick={() => handleOpenModal('login')}
//                                             >
//                                                 <div className="mt-4">
//                                                     <p>                                                Already have an account?
//                                                     <Link to={'/register'} className="font-bold  border-b-2 border-emerald-500">Login</Link></p>
//                                                 </div>
//                                             </button>
//                                         </div>
//                                     </div>
//                                     <form method="dialog" className="modal-backdrop">
//                                         <button>Close</button>
//                                     </form>
//                                 </dialog>
//                             </ul>
//                         </div>
//                         <div className="flex-none z-10">
//                             {user && (
//                                 <div className='dropdown dropdown-end z-50'>
//                                     <div
//                                         tabIndex={0}
//                                         role='button'
//                                         className='btn btn-ghost btn-circle avatar'
//                                     >
//                                         <div title={user?.displayName} className='w-10 rounded-full'>
//                                             <img
//                                                 referrerPolicy='no-referrer'
//                                                 alt='User Profile Photo'
//                                                 src={user?.photoURL}
//                                             />
//                                         </div>
//                                     </div>
//                                     <ul
//                                         tabIndex={0}
//                                         className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
//                                     >
//                                         <li>
//                                             <NavLink className={({ isActive }) => isActive ? 'text-primary font-bold' : 'font-bold'}>{user?.displayName}</NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink to='dashboard' className={({ isActive }) => isActive ? 'text-primary font-bold' : 'font-bold'}>User Profile</NavLink>
//                                         </li>
//                                         <li className='mt-2'>
//                                             <button onClick={handleLogOut} className='bg-gray-200 block text-center'>Logout</button>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//             </div>
//             <div className="container mx-auto p-4">
//                 <div className="mb-4">

//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {paginatedStores.length > 0 ? (
//                         paginatedStores.map(store => (
//                             <div key={store.id} className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden mx-auto">
//                                 <img className="w-full h-48 object-cover object-center" src={store.productImage} alt={store.productName} />
//                                 <div className="p-4">
//                                     <h2 className="text-gray-900 text-lg font-semibold">{store.productName}</h2>
//                                     <p className="text-gray-600 text-sm mt-2">{store.description}</p>
//                                     <div className="flex justify-between items-center mt-4">
//                                         <span className="text-gray-900 font-bold">${store.price}</span>
//                                         <span className="text-yellow-500 text-sm">{`⭐ ${store.ratings}`}</span>
//                                     </div>
//                                     <div className="text-gray-500 text-xs mt-1">Added on: {new Date(store.createdAt).toLocaleDateString()}</div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No products available.</p>
//                     )}
//                 </div>
//                 <div className="flex justify-center mt-4">
//                     <button
//                         className="btn btn-outline"
//                         onClick={() => handlePageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                     >
//                         Previous
//                     </button>
//                     <span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
//                     <button
//                         className="btn btn-outline"
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;


import { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Login from "./Login";
import Register from './Register';
import { GrTechnology } from "react-icons/gr";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const [modalContent, setModalContent] = useState('login'); // State to switch between login and register

    const handleOpenModal = (content) => {
        setModalContent(content);
        document.getElementById('auth_modal').showModal();
    };

    const handleLogOut = () => {
        logOut()
            .then(() => console.log('Logout successful'))
            .catch(error => console.error(error));
    };

    const [stores, setStores] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('priceLowToHigh');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    useEffect(() => {
        // Fetch products, brands, and categories
        fetch('http://localhost:5000/storeInfo')
            .then(res => res.json())
            .then(data => {
                setStores(data);
                // Extract unique brands and categories
                const uniqueBrands = [...new Set(data.map(store => store.brandName))];
                const uniqueCategories = [...new Set(data.map(store => store.category))];
                setBrands(uniqueBrands);
                setCategories(uniqueCategories);
            })
            .catch(error => console.error('Error fetching store data:', error));
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handlePriceRangeChange = (event) => {
        const [min, max] = event.target.value.split(',').map(Number);
        setPriceRange([min, max]);
    };

    const filteredAndSortedStores = stores
        .filter(store =>
            store.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedBrand ? store.brandName === selectedBrand : true) &&
            (selectedCategory ? store.category === selectedCategory : true) &&
            (store.price >= priceRange[0] && store.price <= priceRange[1])
        )
        .sort((a, b) => {
            switch (sortOption) {
                case 'priceLowToHigh':
                    return a.price - b.price;
                case 'priceHighToLow':
                    return b.price - a.price;
                case 'dateNewest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                default:
                    return 0;
            }
        });

    // Pagination calculations
    const totalItems = filteredAndSortedStores.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedStores = filteredAndSortedStores.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <div className="bg-base-300">
                <div className="navbar container mx-auto">
                    {/* Navbar code here (same as before) */}

                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <div className="mb-4">
                                    <select
                                        value={sortOption}
                                        onChange={handleSortChange}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="priceLowToHigh">Price: Low to High</option>
                                        <option value="priceHighToLow">Price: High to Low</option>
                                        <option value="dateNewest">Date Added: Newest First</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <select
                                        value={selectedBrand}
                                        onChange={handleBrandChange}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Select Brand</option>
                                        {brands.map((brand) => (
                                            <option key={brand} value={brand}>{brand}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <select
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Price Range (min,max)"
                                        className="input input-bordered w-full"
                                        onChange={handlePriceRangeChange}
                                    />
                                </div>
                            </ul>
                        </div>
                        <Link to={'/'} className="btn btn-ghost text-xl"> <GrTechnology /> <span className="text-error font-bold font-serif">Tech</span>
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <div className="mb-4">
                                <select
                                    value={sortOption}
                                    onChange={handleSortChange}
                                    className="select select-bordered w-full"
                                >
                                    <option value="priceLowToHigh">Price: Low to High</option>
                                    <option value="priceHighToLow">Price: High to Low</option>
                                    <option value="dateNewest">Date Added: Newest First</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <select
                                    value={selectedBrand}
                                    onChange={handleBrandChange}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Brand</option>
                                    {brands.map((brand) => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <select
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Price Range (min,max)"
                                    className="input input-bordered w-full"
                                    onChange={handlePriceRangeChange}
                                />
                            </div>
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <div className="flex items-center justify-center gap-2">
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="Search by product name"
                                    className="input input-bordered w-full"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>

                            <ul className="flex space-x-4">
                                {!user && (
                                    <li>
                                        {/* Button to open modal with login or register content */}
                                        <button
                                            className="btn"
                                            onClick={() => handleOpenModal('login')}
                                        >
                                            <NavLink
                                                to={'/login'}
                                                className={({ isActive }) => isActive ? 'text-primary font-bold' : 'font-bold'}
                                            >
                                                Login 
                                            </NavLink>
                                        </button>
                                    </li>
                                )}

                                {/* Modal */}
                                <dialog id="auth_modal" className="modal">
                                    <div className="modal-box bg-slate-400">
                                        {modalContent === 'login' && <Login />}
                                        {modalContent === 'register' && <Register />}
                                        <div className="flex justify-between mt-4">
                                            <button
                                                className="text-black hover:underline"
                                                onClick={() => handleOpenModal('register')}
                                            >
                                                <div className="mt-4">
                                                    <p>Create a new account <Link to={'/register'} className="font-bold  border-b-2 border-emerald-500">Register</Link></p>
                                                </div>                                            </button>
                                            <button
                                                className="text-black hover:underline"
                                                onClick={() => handleOpenModal('login')}
                                            >
                                                <div className="mt-4">
                                                    <p>Already have an account?
                                                    <Link to={'/login'} className="font-bold  border-b-2 border-emerald-500 font-serif">Login</Link></p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <form method="dialog" className="modal-backdrop">
                                        <button>Close</button>
                                    </form>
                                </dialog>
                            </ul>
                        </div>
                        <div className="flex-none z-10">
                            {user && (
                                <div className='dropdown dropdown-end z-50'>
                                    <div
                                        tabIndex={0}
                                        role='button'
                                        className='btn btn-ghost btn-circle avatar'
                                    >
                                        <div title={user?.displayName} className='w-10 rounded-full'>
                                            <img
                                                referrerPolicy='no-referrer'
                                                alt='User Profile Photo'
                                                src={user?.photoURL}
                                            />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                                    >
                                        <li>
                                            <NavLink className={({ isActive }) => isActive ? 'text-primary font-bold' : 'font-bold'}>{user?.displayName}</NavLink>
                                        </li>
                                       
                                        <li className='mt-2'>
                                            <button onClick={handleLogOut} className='bg-gray-200 block text-center'>Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
            <div className="container mx-auto p-4">
                <div className="mb-4">

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {paginatedStores.length > 0 ? (
                        paginatedStores.map(store => (
                            <div key={store.id} className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden mx-auto">
                                <img className="w-full h-48 object-cover object-center" src={store.productImage} alt={store.productName} />
                                <div className="p-4">
                                    <h2 className="text-gray-900 text-lg font-semibold">{store.productName}</h2>
                                    <p className="text-gray-600 text-sm mt-2">{store.description}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-gray-900 font-bold">${store.price}</span>
                                        <span className="text-yellow-500 text-sm">{`⭐ ${store.ratings}`}</span>
                                    </div>
                                    <div className="text-gray-500 text-xs mt-1">Added on: {new Date(store.createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        className="btn btn-outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
                    <button
                        className="btn btn-outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
