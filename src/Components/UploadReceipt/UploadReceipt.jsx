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

    const handleOrderConfirmation = async () => {
        if (!userDetails) {
            setMessage('User is not logged in');
            return;
        }
    
        const formData = new FormData();
        formData.append('user_id', userDetails.id);  // User ID
        formData.append('totalPrice', getTotalCartAmount());  // Total price
        formData.append('receipt', receipt);  // Receipt file
    
        Object.keys(cartItems).forEach(itemId => {
            cartItems[itemId].forEach(item => {
                // Append each cart item as a JSON string
                formData.append('items', JSON.stringify(item));
            });
        });
    
        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const data = await response.json();
                setMessage('Order placed successfully');
                console.log(data);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Error placing order');
                console.error(errorData);
            }
        } catch (error) {
            setMessage('Error placing order');
            console.error('Error:', error);
        }
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
