import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_OFFER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const CreateOfferForm = () => {
    const [palletQty, setPalletQty] = useState('');
    const [price, setPrice] = useState('');
    const [material, setMaterial] = useState('');
    const [dimension, setDimension] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [image, setImage] = useState('default.jpeg');

    /*const [formState, setFormState] = useState({
        palletQty: 0,
        price: 0,
        material: '',
        dimension: '',
        address: '',
        state: '',
        image: '',
    });*/

    const [requiredField, setRequiredField] = useState('');

    const [addOffer, { error }] = useMutation(ADD_OFFER);

    const handleChange = (event) => {
        
        const { target } = event;
        const name = target.name;
        const value = target.value;

        if (name === 'palletQty') {
            setPalletQty(Number(value));
        } if (name === 'price') {
            setPrice(Number(value));
        } if (name === 'material') {
            setMaterial(value);
        } if (name === 'dimension') {
            setDimension(value);
        } if (name === 'address') {
            setAddress(value);
        } if (name === 'state') {
            setState(value);
        } if (name === 'image') {
            setImage(value);
        }

        /*setFormState({
            ...formState,
            [name]: value,
        });
        if (type === "number") {
            setFormState({
                ...formState,
                [name]: Number(value),
            })
        } if (type === "text") {
            setFormState({
                ...formState,
                [name]: value,
            });
        }
        console.log(formState);*/

        console.log(palletQty, price, material, dimension, address, state, image);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!palletQty || palletQty <= 0) {
            setRequiredField("Pallet quantity is required");
            return;
        } if (!price || palletQty <= 0) {
            setRequiredField("Price is required");
            return;
        } if (!material || material === '') {
            setRequiredField("Please select a Material");
            return;
        } if (!dimension || dimension === '') {
            setRequiredField("Please select a Dimension");
            return;
        } if (!address) {
            setRequiredField("Address is required");
            return;
        } if (!state || state === '') {
            setRequiredField("Please select a State");
            return;
        } if (!image || image === '') {
            setImage('default.png')
        }

        try {
            const { data } = await addOffer({
                variables: { palletQty, price, material, dimension, address, state, image },
            });
            if (!data) {
                throw new Error('something did not work!');
            }
        } catch (err) {
            console.error(err);
        }

        window.location.assign('me/myOffers');
    };

    if (!Auth.loggedIn()) {
        return (
            <h3>You need to be logged in</h3>
        );
    } if (Auth.getProfile().data.userType !== 'Seller') {
        return (
            <h3>Content available only for Sellers</h3>
        )
    }

    return (
        <section>
            <h2>Create Offer</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="palletQty">Pallet Quantity:</label>
                <input 
                    name="palletQty"
                    type="number"
                    value={palletQty}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price:</label>
                <input 
                    name="price"
                    type="number"
                    value={price}
                    onChange={handleChange}
                />
                <label htmlFor="material">Material:</label>
                <select name="material" defaultValue="" onChange={handleChange}>
                    <option value=""></option>
                    <option value="HDPE">HDPE</option>
                    <option value="PP">PP</option>
                </select>
                <label htmlFor="dimension">Dimension:</label>
                <select name="dimension" defaultValue="" onChange={handleChange}>
                    <option value=""></option>
                    <option value='48" x 40"'>48" x 40"</option>
                    <option value='48" x 48"'>48" x 48"</option>
                </select>
                <label htmlFor="address">Address:</label>
                <input 
                    name="address"
                    type="text"
                    value={address}
                    onChange={handleChange}
                />
                <label htmlFor="state">State:</label>
                <select name="state" defaultValue="" onChange={handleChange}>
                    <option value=""></option>
                    <option value="Aguascalientes">Aguascalientes</option>
                    <option value="Baja California">Baja California</option>
                    <option value="Baja California Sur">Baja California Sur</option>
                    <option value="Campeche">Campeche</option>
                    <option value="Coahuila">Coahuila</option>
                    <option value="Colima">Colima</option>
                    <option value="Chiapas">Chiapas</option>
                    <option value="Chihuahua">Chihuahua</option>
                    <option value="Ciudad de México">Ciudad de México</option>
                    <option value="Durango">Durango</option>
                    <option value="Guanajuato">Guanajuato</option>
                    <option value="Guerrero">Guerrero</option>
                    <option value="Hidalgo">Hidalgo</option>
                    <option value="Jalisco">Jalisco</option>
                    <option value="Estado de México">Estado de México</option>
                    <option value="Michoacán">Michoacán</option>
                    <option value="Morelos">Morelos</option>
                    <option value="Nayarit">Nayarit</option>
                    <option value="Nuevo León">Nuevo León</option>
                    <option value="Oaxaca">Oaxaca</option>
                    <option value="Puebla">Puebla</option>
                    <option value="Querétaro">Querétaro</option>
                    <option value="Quintana Roo">Quintana Roo</option>
                    <option value="San Luis Potosí">San Luis Potosí</option>
                    <option value="Sinaloa">Sinaloa</option>
                    <option value="Sonora">Sonora</option>
                    <option value="Tabasco">Tabasco</option>
                    <option value="Tamaulipas">Tamaulipas</option>
                    <option value="Tlaxcala">Tlaxcala</option>
                    <option value="Veracruz">Veracruz</option>
                    <option value="Yucatán">Yucatán</option>
                    <option value="Zacatecas">Zacatecas</option>
                </select>
                <label htmlFor="image">Image:</label>
                <input 
                    name="image"
                    type="text"
                    value={image}
                    onChange={handleChange}
                />
                {requiredField && (
                    <p>{requiredField}</p>
                )}
                <button type="submit">Create Offer</button>
            </form>
            {error && (
                <p>{error.message}</p>
            )}
        </section>
    );
};

export default CreateOfferForm;