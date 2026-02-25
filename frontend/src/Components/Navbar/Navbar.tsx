import React from 'react'
import logo from "./logo.png"
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/UserAuth';
type Props = {}

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

    {/* Logo + Dashboard */}
    <div className="flex items-center gap-6">
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="h-9 w-auto hover:scale-105 transition"
        />
      </Link>
      <Link
        to="/search"
        className="text-slate-200 hover:text-white font-medium transition"
      >
        Search
      </Link>
    </div>
        {isLoggedIn() ? (
    
          <div className="flex items-center gap-4">
            <span className="text-slate-300 text-sm">Welcom, {user?.userName}</span>

            <a
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 
                   text-white text-sm font-semibold 
                   transition shadow-md hover:shadow-lg"
            >
              Logout
            </a>
          </div>
        ) : (
            
            <div className="flex items-center gap-4">
              <Link to="/login"><span className="text-slate-300 text-sm">Login</span></Link>

              <Link to="/register"

                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 
                   text-white text-sm font-semibold 
                   transition shadow-md hover:shadow-lg"
              >
                Sign up
              </Link>
            </div>
    )}
        
    {/* Login / Signup */}
    

  </div>
</nav>
  );
}

export default Navbar