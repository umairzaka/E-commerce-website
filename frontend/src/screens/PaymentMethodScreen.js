import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SavePaymentMethod } from '../actions/CartAction';
import CheckOutStep from '../components/CheckOutStep'

function PaymentMethodScreen(props) {
    const [paymentMethod, setPaymentMethod] = useState('paypal')
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if (!shippingAddress.address) {
        // alert(shippingAddress.fullName)
        props.history.push('/shipping')
    }

    const submitHandler =(e) => {
        e.preventDefault();
        dispatch(SavePaymentMethod({paymentMethod}))
        props.history.push('/placeorder')
    }

    return (
        <div>
            <CheckOutStep step1 step2 step3></CheckOutStep>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    Payment Method
                </div>
                <div>
                    <input type="radio" name="paymentMethod" value="paypal" id='paypal' required checked onChange={e => setPaymentMethod(e.target.value)} />
                    <label htmlFor="paypal">Paypal</label>
                </div>
                <div>
                    <input type="radio" name="paymentMethod" value="stripe" id='stripe' required  onChange={e => setPaymentMethod(e.target.value)} />
                    <label htmlFor="stripe">Stripe</label>
                </div>
                <div>
                    <button type='submit' className='primary block'>Continue</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentMethodScreen
