import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { registration } from '../actions/UserActions'
import Loading from '../components/Loading'
import MessageBox from '../components/MessageBox'


function RegisterScreen(props) {
        const [name, setName] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [ConfirmPassword, setConfirmPassword] = useState('')
        const dispatch = useDispatch();

        const userRegistration = useSelector(state => state.userRegistration)
         const {userInfo, loading, error} = userRegistration

            // redirect script

            const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

        const submitHandler = (e) => {
            e.preventDefault();
            if (password === ConfirmPassword) {
                 dispatch(registration(name, email, password));
            }
            else{
                alert('your password and confirm password is same')
            }
        }

        useEffect(() => {
           if (userInfo) {
               props.history.push(redirect)
             }
        }, [props.history,userInfo,redirect])

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                   <h1> Create New Account</h1>
                </div>
                {loading && <Loading></Loading>}
                {error && <MessageBox variant="danger" >{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder='Enter Full name' value={name} id='name' onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} placeholder='Enter Email'  id='email' onChange={e => setEmail(e.target.value)} required />
                </div>
                 <div>
                    <label htmlFor="password">Password </label>
                    <input type="password" name="password" value={password} placeholder='********' id='password' onChange={e => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="ConfirmPassword"> Confirm Password </label>
                    <input type="password" name="ConfirmPassword" value={ConfirmPassword} placeholder='********' id='ConfirmPassword' onChange={e => setConfirmPassword(e.target.value)} required />
                </div>
                <div>
                    <label/>
                    <button type="submit" className='primary block'> Register </button>
                </div>

                 <div>
                     <label />
                     <p>Already Have an account ! {' '}
                      <Link to={`/signin?redirect=${redirect}`}>Sign In </Link>
                     </p>
                 </div>   

            </form>
        </div>
    )
}

export default RegisterScreen
