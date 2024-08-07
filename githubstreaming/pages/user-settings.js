import React, { useEffect, useState } from 'react';
import styles from '../styles/page.module.css';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://rnogylocxdeybupnqeyt.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY; // Ensure this env variable is set
const supabase = createClient(supabaseUrl, supabaseKey);

const UserSettings = ({ account }) => {

    //write account as PKEY to Supabase + company details
    //prevent duplicates when account already has details

    //state
    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [companyOrVatNumber, setCompanyOrVatNumber] = useState("");

    const handleInputChangeCompanyName = (e) => {
        const value = e.target.value;
        setCompanyName(value);
    };

    const handleInputChangeAddress = (e) => {
        const value = e.target.value;
        setAddress(value);
    };

    const handleInputChangePostalCode = (e) => {
        const value = e.target.value;
        setPostalCode(value);
    };

    const handleInputChangeCity = (e) => {
        const value = e.target.value;
        setCity(value);
    };

    const handleInputChangeCountry = (e) => {
        const value = e.target.value;
        setCountry(value);
    };

    const handleInputChangeCompanyOrVatNumber = (e) => {
        const value = e.target.value;
        setCompanyOrVatNumber(value);
    };

    //write function
    const saveCompanyDetailsToSupabase = async () => {
        const { error } = await supabase
        .from('companyDetails')
        .insert({ 
            user_address: "0x1b39c76b7bbf7f16795f461ce5298e882b63a7d6",
            company_name: companyName,
            address: address,
            postal_code: postalCode,
            city: city,
            country: country,
            company_vat_number: companyOrVatNumber            
        }, { onConflict: 'user_address' });
    
        if (error) {
        console.error('Error saving company details to Supabase:', error);
        } else {
        console.log('Company details saved successfully.');
        }
    };
    // const saveCompanyDetailsToSupabase = async () => {
    //     const { error } = await supabase
    //     .from('companyDetails')
    //     .insert({ 
    //         user_address: "0x1b39c76b7bbf7f16795f461ce5298e882b63a7d6",
    //         company_name: "pc",
    //         address: "pop 33",
    //         postal_code: "8400",
    //         city: "Bredene",
    //         country: "Belgium",
    //         company_vat_number: "1234"            
    //     }, { onConflict: 'user_address' });
    
    //     if (error) {
    //     console.error('Error saving company details to Supabase:', error);
    //     } else {
    //     console.log('Company details saved successfully.');
    //     }
    // };
    

    return(
        <div>
            <input
                type="text"
                value={companyName}
                onChange={handleInputChangeCompanyName}
                className={styles.input}
                placeholder="Enter company name"
            />
            <br />
            <input
                type="text"
                value={address}
                onChange={handleInputChangeAddress}
                className={styles.input}
                placeholder="Enter address and house number"
            />
            <br />
            <input
                type="text"
                value={postalCode}
                onChange={handleInputChangePostalCode}
                className={styles.input}
                placeholder="Enter postal code"
            />
            <br />
            <input
                type="text"
                value={city}
                onChange={handleInputChangeCity}
                className={styles.input}
                placeholder="Enter city"
            />
            <br />
            <input
                type="text"
                value={country}
                onChange={handleInputChangeCountry}
                className={styles.input}
                placeholder="Enter country"
            />
            <br />
            <input
                type="text"
                value={companyOrVatNumber}
                onChange={handleInputChangeCompanyOrVatNumber}
                className={styles.input}
                placeholder="Enter company or VAT number"
            />
            <button onClick={saveCompanyDetailsToSupabase}>Save details</button>
        </div>
    )



}

export default UserSettings;