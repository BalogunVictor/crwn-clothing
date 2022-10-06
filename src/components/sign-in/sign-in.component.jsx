import React, { useState } from "react";
import './sign-in.styles.scss'
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { googleSignInStart, emailSignInStart } from "../../redux/user/user.action";
import { connect } from "react-redux";

const SignIn = ({ googleSignInStart,emailSignInStart }) => {

   const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
})

const {email , password} = userCredentials;

   const handleSubmit =  async event => {
    event.preventDefault();

    emailSignInStart(email,password);
   }
  

  const handleChange = event => {
    const {value, name} = event.target;

    setCredentials({...userCredentials, [name]: value})
  }

    return(
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={handleSubmit}>
          <FormInput name="email" 
          type='email' 
          handleChange={handleChange}
           label='Email' 
           value={email} 
           required 
           />

          <FormInput 
          name="password"
           type='password'
            value={password}
             label= 'Password'
              handleChange={handleChange}
               required />

           <div className="button">
              <CustomButton type='submit'>Sign In</CustomButton>
              <CustomButton type="button"
              onClick={googleSignInStart} 

              isGoogleSignIn>{''} Sign In with google {''}
              </CustomButton>
          </div>
        </form>
      </div>      
    );
  }


  const mapStateToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email,password) =>
     dispatch(emailSignInStart({email, password}))
  }); 


export default connect(null, mapStateToProps)(SignIn);