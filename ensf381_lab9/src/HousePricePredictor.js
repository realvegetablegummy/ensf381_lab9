import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './HousePricePredictor.css';

function HousePricePredictor () {

    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [lease_term, setLeaseTerm] = useState('');
    const [type, setType] = useState('');
    const [beds, setBeds] = useState('');
    const [baths, setBaths] = useState('');
    const [sq_feet, setSqFeet] = useState('');
    const [furnishing, setFurnishing] = useState('');
    const [smoking, setSmoking] = useState('');
    const [pets, setPets] = useState(true);

    const [priceBoolean, setPriceBoolean] = useState(false);
    const [price, setPrice] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
      
        const backendEndpoint = '/predict_house_price';

        try {
            const response = await fetch(backendEndpoint, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'city':city, 
                    'province':province, 
                    'latitude':latitude, 
                    'longitude':longitude, 
                    'lease_term':lease_term, 
                    'type':type, 
                    'beds':beds, 
                    'baths':baths, 
                    'sq_feet':sq_feet, 
                    'furnishing':furnishing, 
                    'smoking':smoking, 
                    'pets':pets
                }),
            });
            
            const data = await response.json();
        
            if (response.ok) {
                setPriceBoolean(true);
                setPrice(data);
                // console.log('price!');
            } else {
                setPriceBoolean(false);
                // console.error('ermm no price');
            }
            } catch (error) {
                setPriceBoolean(false);
                // console.error('error during submission: ', error);
            }
        };
    return (
        <div class="predictorbox">
        <form onSubmit={handleSubmit}>
            <h2>House Price Predictor</h2>

            <label for="city">City:</label>
            <input 
            type="text" 
            id="city" 
            name="city" 
            onChange={(e) => setCity(e.target.value)} 
            required/>

            <label for="province">Province:</label>
            <input 
            type="text" 
            id="province" 
            name="province" 
            onChange={(e) => setProvince(e.target.value)} 
            required/>

            <label for="latitude">Latitude:</label>
            <input 
            type="text" 
            id="latitude" 
            name="latitude" 
            onChange={(e) => setLatitude(e.target.value)} 
            required/>

            <label for="longitude">Longitude:</label>
            <input 
            type="text" 
            id="longitude" 
            name="longitude" 
            onChange={(e) => setLongitude(e.target.value)} 
            required/>

            <label for="lease_term">Lease Term:</label>
            <input 
            type="text" 
            id="lease_term" 
            name="lease_term" 
            onChange={(e) => setLeaseTerm(e.target.value)} 
            required/>

            <label for="type">Type:</label>
            <input 
            type="text" 
            id="type" 
            name="type" 
            onChange={(e) => setType(e.target.value)} 
            required/>

            <label for="beds">Beds:</label>
            <input 
            type="text" 
            id="beds" 
            name="beds" 
            onChange={(e) => setBeds(e.target.value)} 
            required/>

            <label for="baths">Baths:</label>
            <input 
            type="text" 
            id="baths" 
            name="baths" 
            onChange={(e) => setBaths(e.target.value)} 
            required/>

            <label for="sq_feet">Square Feet:</label>
            <input 
            type="text" 
            id="sq_feet" 
            name="sq_feet" 
            onChange={(e) => setSqFeet(e.target.value)} 
            required/>

            <label for="furnishing">Furnishing:</label>
            <select 
            id="furnishing" 
            name="furnishing" 
            onChange={(e) => setFurnishing(e.target.value)} 
            required>
                <option value="unfurnished">Unfurnished</option>
                <option value="partially_furnished">Partially Furnished</option>
                <option value="fully_furnished">Fully Furnished</option>
            </select>

            <label for="smoking">Smoking:</label>
            <input 
            type="text" 
            id="smoking" 
            name="smoking" 
            onChange={(e) => setSmoking(e.target.value)} 
            required/>

            <label for="pets">Pets:</label>
            <input 
            type="checkbox" 
            id="pets" 
            name="pets" 
            value="yes"
            onChange={(e) => setPets(e.target.checked)} 
            checked={pets}
            required/>

            <button type="submit">Predict</button>
        </form>

        {priceBoolean && (
            <div class="pricebox">
            <p id="price">{price}</p>
            </div>
        )}
        </div>
    ); 
};

export default HousePricePredictor;
