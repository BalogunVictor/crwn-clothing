import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.components";
import Header from "./components/header/header.component";
import { connect } from "react-redux";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import {setCurrentUser} from './redux/user/user.action'



class App extends React.Component {

  

  unsubscribeFromAuth = null;

    componentDidMount () {
      const {setCurrentUser} = this.props;
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if (userAuth){
          const UserRef = await createUserProfileDocument(userAuth);

          UserRef.onSnapshot(snapShot => {
            setCurrentUser({
                id: snapShot.id,...snapShot.data()
              });
            });
      
        }
        setCurrentUser(userAuth);
      })
    }

      componentWillUnmount(){
        this.unsubscribeFromAuth();     
      }
    
  
  render() {
    return (
      <Router>
      <Header/>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/shop" exact element={<ShopPage/>} />
          <Route path="/signin" exact element={<SignInAndSignUpPage/>} />
        </Routes>
      </Router> 
  
  );
}
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser:user => dispatch(setCurrentUser(user))

})
  
export default connect(mapDispatchToProps)(App);
