import Navbar from "./components/Navbar/Navbar";
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from "./components/Screens/Home/Home";
import Login from "./components/Screens/Login/Login";
import Signup from "./components/Screens/Signup/Signup";
import Profile from "./components/Screens/Profile/Profile";
function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Route exact path="/">
        <Home></Home>
      </Route>
      <Route path="/signin">
        <Login></Login>
      </Route>
      <Route path="/signup">
        <Signup></Signup>
      </Route>
      <Route path="/profile">
        <Profile></Profile>
      </Route>
    </BrowserRouter>

  );
}

export default App;
