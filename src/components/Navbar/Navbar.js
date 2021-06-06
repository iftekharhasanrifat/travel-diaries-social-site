import React,{useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {clearUser} from '../../redux/action/userAction'
import M from 'materialize-css'
import { useDispatch, useSelector } from 'react-redux'
const NavBar = ()=>{
    const  searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
     const history = useHistory()
     useEffect(()=>{
         M.Modal.init(searchModal.current)
     },[])
     const user = useSelector((state)=>{
       return state.users;
     })
     const dispatch = useDispatch();
     const renderList = ()=>{
       if(user){
           return [
            <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
            <li className="navLink" key="2"><Link to="/profile">Profile</Link></li>,
            <li className="navLink" key="3"><Link to="/create">Create Post</Link></li>,
            <li className="navLink" key="4"><Link to="/myfollowingpost">My following Posts</Link></li>,
            <li className="navLink" key="5">
             <button className="btn #c62828 red darken-3"
            onClick={()=>{
              localStorage.clear()
              dispatch(clearUser())
              history.push('/signin')
            }}
            >
                Logout
            </button>
            </li>
         
            
           ]
       }else{
         return [
          <li className="navLink"  key="6"><Link to="/signin">Signin</Link></li>,
          <li className="navLink" key="7"><Link to="/signup">Signup</Link></li>
         
         ]
       }
     }


     const fetchUsers = (query)=>{
        setSearch(query)
        fetch('/search-users',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=>{
          setUserDetails(results.user)
        })
     }
    return(
        <nav>
        <div className="nav-wrapper navLink white">
          <Link to={user?"/":"/signin"} className="brand-logo left">Travel Diaries</Link>
          <ul id="nav-mobile" className="right">
             {renderList()}
  
          </ul>
        </div>
        <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== user._id?"/profile/"+item._id:"/profile"} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
      </nav>
    )
}


export default NavBar