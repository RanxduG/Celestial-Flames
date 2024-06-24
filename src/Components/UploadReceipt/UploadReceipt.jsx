import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import axios from 'axios';

const UploadReceipt = () => {
    const { cartItems, userDetails, getTotalCartAmount } = useContext(ShopContext);
    const [receipt, setReceipt] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setReceipt(e.target.files[0]);
    };

    const handleOrderConfirmation = () => {
        if (!userDetails) {
            setMessage('User is not logged in');
            return;
        }

        const formData = new FormData();
        console.log("User Details: ", userDetails)
        console.log("User ID: ", userDetails.id);
        console.log("Total Price: ", getTotalCartAmount());

        formData.append('user_id', userDetails.id); // Ensure this matches the correct user ID property
        formData.append('totalPrice', getTotalCartAmount());
        formData.append('receipt', receipt);
        console.log("Cart Items: ", cartItems);

        Object.keys(cartItems).forEach(itemId => {
        console.log("Item ID: ", itemId);
            cartItems[itemId].forEach(item => {

                formData.append('items', JSON.stringify(item));
            });
        });

        console.log("FormData being sent: ", formData);

        axios.post('http://localhost:5000/place_orders', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setMessage('Order placed successfully');
            console.log(response.data);
        })
        .catch(error => {
            setMessage('Error placing order');
            console.error(error);
        });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleOrderConfirmation} disabled={!receipt}>Confirm Order</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadReceipt;
