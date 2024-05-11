import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import '../SignUp/SignUp.scss'
import './Login.scss'
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { loadFromLocalStorage } from '../../Utils';
const Login = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userDatatoken, setUserDatatoken] = useState(null);
  const user = loadFromLocalStorage('user')
  setUserDatatoken(user.userDatatoken)
  const handleLogin = () => {
    if (user.username === username && user.password === password) {
      window.location.href = "/"
    }else{
      alert("Wrong username or password")
    }
  }
  useEffect(() => {fetch('https://dummyjson.com/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.userDatatoken}`, 
    },
    body: JSON.stringify({
      expiresInMins: 1800,
    })
  })
  .then(res => res.json())
  .then(console.log);
  }, []);
  console.log(userDatatoken);
  return (
    <div className="signUp">
      <div className="signUp_logo">
        <img src={logo} alt="Logo" />
        <p>Tell us what you think</p>
      </div>
      <div className="login_content">
        <div className="login_content-top">
          <h1>Hello</h1>
          <p>Sign in to eBay or <Link to="/signup">Create an account</Link></p>
          <div className="input_container">
            <input type="text" id="email" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type={isOpened ? "text" : "password"} id="email" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="eye" onClick={() => setIsOpened(!isOpened)}>{isOpened ? <FiEyeOff /> : <FiEye />}</div>
            <button onClick={handleLogin}>Continue</button>
          </div>
        </div>
        <div className="login_content-bottom">
          <div className="stay_signedIn">
            <input type="checkbox" checked={true} />
            <p>stay signed in</p>
          </div>
          <p>Using a public or shared device?</p>
          <p>Uncheck to protect your account.</p>
          <p><span>Learn more</span></p>
        </div>
      </div>
    </div>
  )
}

export default Login
