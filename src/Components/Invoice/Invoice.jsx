import React, { useContext, useState } from 'react';
import './Invoice.css';
import { ShopContext } from '../../Context/ShopContext';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../Assets/Logo/Celestial flames logo 2.0.jpg';

const Invoice = () => {
  const { cartItems, getTotalCartAmount, userDetails, ready_made_products, discount } = useContext(ShopContext);
  const [useAccountAddress, setUseAccountAddress] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState(userDetails.address);

  const handleCheckboxChange = () => {
    setUseAccountAddress(!useAccountAddress);
    if (useAccountAddress) {
      setDeliveryAddress('');
    } else {
      setDeliveryAddress(userDetails.address);
    }
  };

  const handleAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
  };

  const generatePDF = () => {
    const input = document.getElementById('invoice');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('invoice.pdf');
      });
  };

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className='invoice-container'>
      <label>
        <input
          type='checkbox'
          checked={useAccountAddress}
          onChange={handleCheckboxChange}
        />
        Delivery address same as account address
      </label>
      {!useAccountAddress && (
        <input
          type='text'
          value={deliveryAddress}
          onChange={handleAddressChange}
          placeholder='Enter delivery address'
        />
      )}
      <div id='invoice' className='invoice'>
        <img src={logo} alt="Company Logo" className="logo" />
        <div className='invoice-header'>
          <div className='invoice-left'>
            <p><strong>ISSUED TO:</strong><br/>{userDetails.name}</p>
            <p>{userDetails.email}</p>
            <p>{deliveryAddress}</p>
            <p>{userDetails.phone}</p>
          </div>
          <div className='invoice-right'>
            <p><strong>INVOICE NO:</strong> 2024001</p>
            <p><strong>DATE:</strong> {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Shape</th>
              <th>Color</th>
              <th>Scent</th>
              <th>Wax</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(cartItems).map((itemId) => (
              cartItems[itemId].map((item, index) => {
                const product = ready_made_products.find((e) => e.id === itemId);
                return (
                  <tr key={`${itemId}-${index}`}>
                    <td>{product.name}</td>
                    <td>{item.color}</td>
                    <td>{item.fragrance}</td>
                    <td>{item.waxType}</td>
                    <td>{item.quantity}</td>
                    <td>Rs.{item.total.toFixed(2)}</td>
                    <td>Rs.{(item.total * item.quantity).toFixed(2)}</td>
                  </tr>
                );
              })
            ))}
            <tr>
              <td style={{ height: '100px' }} colSpan="7"></td>
            </tr>
            <tr>
              <td colSpan="6">Subtotal</td>
              <td>Rs.{getTotalCartAmount().toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="6">Discount</td>
              <td>{100 - discount * 100}%</td>
            </tr>
            <tr>
              <td colSpan="6">Shipping Fee</td>
              <td>Rs.500</td>
            </tr>
            <tr>
              <td colSpan="6">Total</td>
              <td>Rs.{(getTotalCartAmount() * discount + 500).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <div className='invoice-footer'>
          <p><strong>Payment method:</strong> Bank Transfer</p>
          <p className='footer-details'>Celestial Flames <br/>Account No: 8019507770 <br/>Commercial Bank Delkanda</p>
          <p><strong>Note:</strong> Delivery will take 4-7 days</p>
        </div>
      </div>
      <button onClick={generatePDF}>Download Invoice</button>
    </div>
  );
}

export default Invoice;
