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
    const [image, setImage] = useState('');

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
            setRequiredField("Please select a sample image for now");
            return;
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
        <section id="createOffer-section" className="section-cards">
            <h2 className="section-headings">Create Offer</h2>
            <form id="createOffer-form" className="forms" onSubmit={handleFormSubmit}>
                <label className="forms-labels" htmlFor="palletQty">Pallet Quantity:</label>
                <input 
                    className="form-inputs"
                    name="palletQty"
                    type="number"
                    value={palletQty}
                    onChange={handleChange}
                />
                <label className="forms-labels" htmlFor="price">Price:</label>
                <input 
                    className="form-inputs"
                    name="price"
                    type="number"
                    value={price}
                    onChange={handleChange}
                />
                <label className="forms-labels" htmlFor="material">Material:</label>
                <select className="form-selects" name="material" defaultValue="" onChange={handleChange}>
                    <option value=""></option>
                    <option value="HDPE">HDPE</option>
                    <option value="PP">PP</option>
                </select>
                <label className="forms-labels" htmlFor="dimension">Dimension:</label>
                <select className="form-selects" name="dimension" defaultValue="" onChange={handleChange}>
                    <option value=""></option>
                    <option value='48" x 40"'>48" x 40"</option>
                    <option value='48" x 48"'>48" x 48"</option>
                </select>
                <label className="forms-labels" htmlFor="address">Address:</label>
                <input 
                    className="form-inputs"
                    name="address"
                    type="text"
                    value={address}
                    onChange={handleChange}
                />
                <label className="forms-labels" htmlFor="state">State:</label>
                <select className="form-selects" name="state" defaultValue="" onChange={handleChange}>
                    <option value=""></option>
                    <option value="Aguascalientes">Aguascalientes</option>
                    <option value="Baja California">Baja California</option>
                    <option value="Baja California Sur">Baja California Sur</option>
                    <option value="Campeche">Campeche</option>
                    <option value="Coahuila">Coahuila</option>
                    <option value="Colima">Colima</option>
                    <option value="Chiapas">Chiapas</option>
                    <option value="Chihuahua">Chihuahua</option>
                    <option value="Ciudad de M??xico">Ciudad de M??xico</option>
                    <option value="Durango">Durango</option>
                    <option value="Guanajuato">Guanajuato</option>
                    <option value="Guerrero">Guerrero</option>
                    <option value="Hidalgo">Hidalgo</option>
                    <option value="Jalisco">Jalisco</option>
                    <option value="Estado de M??xico">Estado de M??xico</option>
                    <option value="Michoac??n">Michoac??n</option>
                    <option value="Morelos">Morelos</option>
                    <option value="Nayarit">Nayarit</option>
                    <option value="Nuevo Le??n">Nuevo Le??n</option>
                    <option value="Oaxaca">Oaxaca</option>
                    <option value="Puebla">Puebla</option>
                    <option value="Quer??taro">Quer??taro</option>
                    <option value="Quintana Roo">Quintana Roo</option>
                    <option value="San Luis Potos??">San Luis Potos??</option>
                    <option value="Sinaloa">Sinaloa</option>
                    <option value="Sonora">Sonora</option>
                    <option value="Tabasco">Tabasco</option>
                    <option value="Tamaulipas">Tamaulipas</option>
                    <option value="Tlaxcala">Tlaxcala</option>
                    <option value="Veracruz">Veracruz</option>
                    <option value="Yucat??n">Yucat??n</option>
                    <option value="Zacatecas">Zacatecas</option>
                </select>
                <label className="forms-labels" htmlFor="image">Sample Image: <br></br><span className="cards-spans">(upload not available now, coming soon)</span></label>
                <select className="form-selects" name="image" defaultValue="" onChange={handleChange}>
                    <option value=""></option>
                    <option value="default.jpeg">default.jpeg</option>
                    <option value="damaged-pallets-1.jpeg">damaged-pallets-1.jpeg</option>
                    <option value="damaged-pallets-2.jpeg">damaged-pallets-2.jpeg</option>
                    <option value="damaged-pallets-3.jpeg">damaged-pallets-3.jpeg</option>
                    <option value="damaged-pallets-4.jpeg">damaged-pallets-4.jpeg</option>
                    <option value="damaged-pallets-5.jpeg">damaged-pallets-5.jpeg</option>
                    <option value="damaged-pallets-6.jpeg">damaged-pallets-6.jpeg</option>
                </select>
                {requiredField && (
                    <p className="required-fields">{requiredField}</p>
                )}
                <div className="forms-btn-div">
                    <button id="createOffer-btn" className="btns" type="submit">Create Offer</button>
                </div>
            </form>
            {error && (
                <p className="error-messages">{error.message}</p>
            )}
        </section>
    );
};

export default CreateOfferForm;