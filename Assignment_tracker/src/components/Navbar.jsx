import React from 'react'
import { Link } from 'react-router'

function Navbar() {
  return (
    <div>
       <nav>
           <Link to="#" className='nav'>Landing</Link>
           <Link to="/dashborad" className='nav'>Landing</Link>
           <Link to="/login" className='nav'>Login</Link>
           <Link to="/signup" className='nav'>Sign Up</Link>
      </nav>

    </div>
  )
}

export default Navbar