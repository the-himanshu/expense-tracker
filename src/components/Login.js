import LoginForm from "./LoginForm"
import "../styles/Login.css"

function Login(props) {
    //event handler for moving data from child component to parent component
    function onSuccessfulLoginHandler() {
        props.onSuccessfulLogin()
    }

    return <div className="login-body">
        <LoginForm onSuccessfulLogin={onSuccessfulLoginHandler}></LoginForm>
    </div>
}

export default Login