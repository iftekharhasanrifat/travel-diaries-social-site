import React, { useRef, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { clearUser } from '../../redux/action/userAction'
import M from 'materialize-css'
import { useDispatch, useSelector } from 'react-redux'
const NavBar = () => {
  const searchModal = useRef(null)
  const [search, setSearch] = useState('')
  const [userDetails, setUserDetails] = useState([])
  const history = useHistory()
  useEffect(() => {
    M.Modal.init(searchModal.current)
  }, [])
  const user = useSelector((state) => {
    return state.users;
  })
  const dispatch = useDispatch();
  const renderList = () => {
    if (user) {
      return [
        <li key="1"><span data-target="modal1" className="material-icons modal-trigger">
          search
            </span></li>,
        <li className="navLink" key="2"><Link to="/profile"><span className="material-icons">
          face
            </span></Link></li>,
        <li className="navLink" key="3"><Link to="/create"><span className="material-icons">
          post_add
            </span></Link></li>,
        <li className="navLink" key="4"><Link to="/myfollowingpost"><span className="material-icons">
          favorite
            </span></Link></li>,
        <li className="navLink" key="5">
          <button className="log_button"
            onClick={() => {
              localStorage.clear()
              dispatch(clearUser())
              history.push('/signin')
            }}
          >
            <span class="material-icons">
              logout
            </span>
          </button>
        </li>


      ]
    } else {
      return [
        <li className="navLink" key="6"><Link to="/signin">Signin</Link></li>,
        <li className="navLink" key="7"><Link to="/signup">Signup</Link></li>

      ]
    }
  }


  const fetchUsers = (query) => {
    setSearch(query)
    fetch('https://vast-river-59602.herokuapp.com/search-users', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    }).then(res => res.json())
      .then(results => {
        setUserDetails(results.user)
      })
  }
  return (
    <nav>
      <div className="nav-wrapper navLink #d32f2f red darken-2">
        <Link to={user ? "/" : "/signin"} className="brand-logo left">Travel Diaries</Link>
        <ul style={{paddingTop:"8px"}} id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
      <div id="modal1" className="modal" ref={searchModal} style={{ color: "black" }}>
        <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection">
            {userDetails.map(item => {
              return <Link to={item._id !== user._id ? "/profile/" + item._id : "/profile"} onClick={() => {
                M.Modal.getInstance(searchModal.current).close()
                setSearch('')
              }}><li className="collection-item">{item.email}</li></Link>
            })}

          </ul>
        </div>
        <div className="modal-footer">
          <button className="modal-close create_btn" onClick={() => setSearch('')}><i class="medium material-icons">
            highlight_off</i></button>
        </div>
      </div>
    </nav>
  )
}


export default NavBar