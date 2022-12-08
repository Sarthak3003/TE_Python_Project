import React from 'react'

const Payment = () => {
    const pay = () => {
        let options = {
            "key": "rzp_test_i0MRWIGptKRVZA",
            "amount": "1000",
            "currency": "INR",
            "description": "Acme Corp",
            "prefill": {
                "email": "gaurav.kumar@example.com",
                "contact": +919900000000,
            },
            "method": {
                "upi": true,
                "netbanking": false,
                "card": false,
                "wallet": false,
                "nb": false,
            },
            "handler": (response) => {
                console.log(response);
            },
        };
        var rzp = new window.Razorpay(options);
        rzp.open();
    }
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <button className='px-3 py-2 rounded bg-purplegray-900 text-purplegray-400' onClick={() => pay()}>Pay</button>
        </div>
    )
}

export default Payment