import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.components";
import Header from "./components/header/header.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {selectCurrentUser} from './redux/user/user.selector'
import CheckoutPage from "./pages/checkout/checkout.component";
import {  useEffect } from 'react';

import CollectionsOverview from "./components/collection-overview/collections-overview.component";
import CollectionPage from "./pages/collection/collection.component";
import { checkUserSession } from "./redux/user/user.action";




  const App = ({currentUser,checkUserSession}) => {
 
     useEffect( () => { checkUserSession() }, [checkUserSession]);

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
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})
 

export default connect(
  mapStateToProps,
  mapDispatchToProps)(App);

