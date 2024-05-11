import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import './SignUp.scss'
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../../Utils';
const SignUp = () => {
    const [isOpened, setIsOpened] = useState(false)
    const [userDatatoken, setUserDatatoken] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   const handleSignUp = () => {
      const user = loadFromLocalStorage('user') || [];
      if(user.length == 0){
        saveToLocalStorage('user', {username, password, userDatatoken})
      }else{
        alert('User already exists')
      }
   }
    useEffect(() => {
      fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'kminchelle',
          password: '0lelplR',
          expiresInMins: 1800, 
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to login');
        }
      })
      .then(data => {
        setUserDatatoken(data.token);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }, []);
  return (
    <div className="signUp">
      <div className="signUp_logo">
        <img src={logo} alt="Logo" />
            <p>Already have an account? <br /> <Link to="/login">Log in</Link></p>
        </div>
        <div className="signUp_content">
          <h1>Create an account</h1>
          <div className="input_container">
            <input type="text" id="email" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type={isOpened ? "text" : "password"} id="email" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div className="eye" onClick={() => setIsOpened(!isOpened)}>{isOpened ? <FiEyeOff /> : <FiEye />}</div>
            <p>By Creating an account, you agree to our User Agreement and acknowledge reading our User Privacy Notice .</p>
          <button onClick={handleSignUp}>Create an account</button>
          </div>
      </div>
    </div>
  )
}

export default SignUp
