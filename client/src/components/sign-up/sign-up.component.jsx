import React, { useState } from "react";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signUpStart } from "../../redux/user/user.action";
import "./sign-up.styles.scss";

const SignUp = ({signUpStart}) => {

 const [userCredentials, setCredentials] = useState({
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
})
   
const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = userCredentials;
    if (password !== confirmPassword) {
      alert("passwords dont match");
      return;
    }
      setCredentials({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      signUpStart({displayName,email,password})
  };

   const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({...userCredentials, [name]: value });
  };


    

    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={handleChange}
            label="Display Name"
            required
          ></FormInput>
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            label="Email"
            required
          ></FormInput>
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            label="Password"
            required
          ></FormInput>
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            label="confirmPassword"
            required
          ></FormInput>
          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }
 const mapDispatchToProps = dipatch => ({
  signUpStart: userCredentials => dipatch(signUpStart(userCredentials))
 })

export default connect(null,mapDispatchToProps)(SignUp);
