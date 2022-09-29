import React, { useRef } from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.components";
import Header from "./components/header/header.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import {setCurrentUser} from './redux/user/user.action'
import {selectCurrentUser} from './redux/user/user.selector'
import CheckoutPage from "./pages/checkout/checkout.component";
// import { useState, useEffect } from 'react';

import CollectionsOverview from "./components/collection-overview/collections-overview.component";
import CollectionPage from "./pages/collection/collection.component";
import {selectCollectionsForPreview} from './redux/shop/shop.selector';
import { useEffect } from "react";


const App = ({ currentUser,setCurrentUser}) => {

 const unsubscribeFromAuth = useRef('');

  useEffect(() => {
    setCurrentUser();


    unsubscribeFromAuth.current = auth.onAuthStateChanged (async userAuth => {
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

  },[setCurrentUser]); 
  
 
    return (
      <Router>
      <Header/>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/shop"  element={<ShopPage/>}>
          <Route index element={<CollectionsOverview/>} />
          <Route path=":collectionId" element={<CollectionPage/>} />  
          </Route>
          <Route path="/checkout" exact element={<CheckoutPage/>} />
          <Route path="/signin" exact element={
             currentUser ? 
            (<Navigate replace to="/" />) : (<SignInAndSignUpPage/>)
          }
          />
        </Routes>
      </Router> 
  
  );
}


const mapStateToProps = createStructuredSelector({ 
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})
 
const mapDispatchToProps = dispatch => ({ 
  setCurrentUser:user => dispatch(setCurrentUser(user))

})
  
export default connect(
  mapStateToProps,
  mapDispatchToProps)(App);

