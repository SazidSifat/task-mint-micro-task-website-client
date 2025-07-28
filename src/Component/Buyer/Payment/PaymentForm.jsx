import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAuth from '../../../Hook/useAuth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const { id } = useParams()
    const { user } = useAuth()
    const [errorMsg, setErrorMsg] = useState('')
    const [coinP, setCoinP] = useState({})
    useEffect(() => {

        axios.get("/coinPackage.json")
            .then(res => {
                const coinPackage = res.data.find(d => d.id === id)
                setCoinP(coinPackage)
            })
    }, [id])


    const handlePayment = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)


        if (!card) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card

        })

        if (error) {
            setErrorMsg(error.message)
        } else {
            setErrorMsg('')
        }

        const amountInCents = parseInt(coinP.price) * 100

        // 
        const res = await axios.post('http://localhost:3000/create-payment-intent', {
            amountInCents
        })

        const clientSecret = res.data.clientSecret


        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email
                }
            }
        })

        if (result.error) {
            toast.error(result.error)
        } else {
            if (result.paymentIntent.status === 'succeeded') {

                axios.post('http://localhost:3000/payment', {
                    coins: coinP.coins,
                    amount: amountInCents,
                    currency: result.paymentIntent.currency,
                    transactionID: result.paymentIntent.id,
                    email: user.email,
                    name: user.displayName

                })
                    .then(res => {
                        if (res.data) {
                            Swal.fire({
                                title: "Payment Successful!",
                                text: `${coinP.coins} coins are added to your account`,
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500
                            });

                        }
                    })
            }
        }
    }

    return (
        <form onSubmit={handlePayment} className="max-w-md mx-auto p-10 bg-white shadow-lg rounded-xl space-y-6">
            <h2 className="text-xl font-bold text-center text-primary">Complete Payment</h2>

            <div className="p-4 border rounded-md">
                <CardElement />
            </div>
            {
                errorMsg && <p className='text-red-400'>{errorMsg}</p>
            }

            <button

                type="submit"
                disabled={!stripe}
                className={`w-full py-3 rounded-xl bg-primary text-primary-content font-medium transition `}
            >
                Pay ${coinP.price}
            </button>
        </form>
    );
};


export default PaymentForm;