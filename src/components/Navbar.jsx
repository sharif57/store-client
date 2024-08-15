import { useContext } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'About', path: '/about' },
    ];

    const { user, logOut } = useContext(AuthContext)


    const handleLogOut = () => {
        logOut()
            .then(() => console.log('logout successfully'))
            .catch(error => console.error(error))

    }


    return (
        <div className="bg-base-300">
            <div className="navbar container mx-auto">
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
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <Link to={link.path}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="navbar-end">
               
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div>
                    {/* <CgShoppingCart className="size-10" /> */}
                    <ul>
                        {
                            !user && (
                                <li>
                                    <NavLink to={'/login'} className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>LogIn</NavLink>
                                </li>
                            )
                        }
                    </ul>
                    <div className="flex-none z-10">
                        {
                            user && (
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
                                            <NavLink className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>{user?.displayName}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='dashboard' className={({ isActive }) => isActive ? 'text-primary font-bold ' : 'font-bold'}>User Profile</NavLink>
                                        </li>



                                        <li className='mt-2'>
                                            <button onClick={handleLogOut} className='bg-gray-200 block text-center'>Logout</button>

                                        </li>

                                    </ul>

                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
