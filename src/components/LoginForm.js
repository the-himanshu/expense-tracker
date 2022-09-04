import "../styles/LoginForm.css"
import { useState, useRef } from "react"
import loginUserAPI from "../apis/loginUser"
import signupUserAPI from "../apis/signupUser"

function LoginForm(props) {
    //create reference variables to get values from form
    const userNameReference = useRef()
    const passwordReference = useRef()
    const emailReference = useRef()

    //create state variables for validation
    const [isUserNameValid, setIsUserNameValid] = useState(1)
    const [isPasswordValid, setIsPasswordValid] = useState(1)
    
    //initialize the page as login or signup form by getting value from local storage
    const isLoginForm_ = localStorage.getItem('isLoginForm')
    const [isLoginForm, setIsLogin] = useState(parseInt(isLoginForm_) | 1)
    
    const buttonInputArray = ['Signup', 'Login', 'Already A User', 'First Time User']

    //function to switch between login and signup pages
    function switchForm() {
        localStorage.setItem('isLoginForm', toString((isLoginForm + 1) % 2))
        setIsLogin((isLoginForm + 1) % 2)
    }

    //user sign up handler
    async function signupUser(event) {
        event.preventDefault()
        const currentUserNameValue = userNameReference.current.value
        const currentEmailValue = emailReference.current.value
        const currentPasswordValue = passwordReference.current.value

        if(currentUserNameValue.length == 0 || currentPasswordValue.length == 0) {
            if(currentUserNameValue.length == 0) setIsUserNameValid(0)
            else if(currentPasswordValue.length == 0) setIsPasswordValid(0)
            return
        }

        const signupRequestBody = {
            username: currentUserNameValue,
            email: currentEmailValue,
            password: currentPasswordValue
        }
        
        //here we are calling the external api
        const signupUserResponse = await signupUserAPI(signupRequestBody)
        
        if(!signupUserResponse.isError) setIsLogin(1)

        //reset all the reference variables
        userNameReference.current.value = ''
        emailReference.current.value = ''
        passwordReference.current.value = ''
    }

    //user login handler
    async function loginUser(event) {
        event.preventDefault()
        const currentUserNameValue = userNameReference.current.value
        const currentPasswordValue = passwordReference.current.value

        if(currentUserNameValue.length == 0 || currentPasswordValue.length == 0) {
            if(currentUserNameValue.length == 0) setIsUserNameValid(0)
            else if(currentPasswordValue.length == 0) setIsPasswordValid(0)
            return
        }

        const loginRequestBody = {
            username: currentUserNameValue,
            password: currentPasswordValue
        }
        
        const loginUserResponse = await loginUserAPI(loginRequestBody)
        const currentTime = new Date()
        
        if(!loginUserResponse.isError) {
            const tokenObject = {
                accessToken: loginUserResponse.data?.accessToken,
                user: loginUserResponse.data?.user,
                timestamp: currentTime
            }

            //here we are storing the user token information in the local storage
            localStorage.setItem('tokenObject', JSON.stringify(tokenObject))
            props.onSuccessfulLogin()
        } else {
            //error handler models will come over here
        }
        
        userNameReference.current.value = ''
        passwordReference.current.value = ''
    }

    return (
        <form className="login-form" onSubmit={isLoginForm == 1 ? loginUser : signupUser}>
            <div className={`login-form-input-field ${isUserNameValid == 1? '' : 'invalid'}`}>
                <label>Username</label>
                <input type="text" ref={userNameReference}></input>
            </div>
            {isLoginForm == 0? 
            <div className={`login-form-input-field`}>
                <label>Email</label>
                <input type="email" ref={emailReference}></input>
            </div>: ''}
            <div className={`login-form-input-field ${isPasswordValid == 1? '' : 'invalid'}`}>
                <label>Password</label>
                <input type="password" ref={passwordReference}></input>
            </div>
            <div className="login-form-action">
                <button className="login-form-button" onClick={switchForm}>{buttonInputArray[isLoginForm + 2]}</button>
                <button className="login-form-button" type="submit">{buttonInputArray[isLoginForm]}</button>
            </div>
        </form>
    )
}

export default LoginForm