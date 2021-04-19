import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { signin } from '../actions/UserActions'


function SignScreen(props) {

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const dispatch = useDispatch();
        const userSignin = useSelector(state => state.userSignin)
         const {userInfo} = userSignin

            // redirect script

            const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

        const submitHandler = (e) => {
            e.preventDefault();
            dispatch(signin(email,password));
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
                    Sign In
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} id='email' onChange={e => setEmail(e.target.value)} required />
                </div>
                 <div>
                    <label htmlFor="password">Password Address</label>
                    <input type="password" name="password" value={password} id='password' onChange={e => setPassword(e.target.value)} required />
                </div>
                <div>
                    <labe/>
                    <button type="submit" className='primary block'>Sign In </button>
                </div>

                 <div>
                     <label />
                     <p>Create New Account {' '}
                      <Link to='/registration'>Register</Link>
                     </p>
                 </div>   

            </form>
        </div>
    )
}

export default SignScreen
