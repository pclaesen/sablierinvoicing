import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../app/components/Header';
import styles from '../styles/page.module.css';
import { fetchCompanyDetails } from '../app/components/SB_Helpers'; // Import the function
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://rnogylocxdeybupnqeyt.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY; // Ensure this env variable is set
const supabase = createClient(supabaseUrl, supabaseKey);

const UserSettings = ({ account }) => {
    const [companyDetails, setCompanyDetails] = useState(null);
    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [companyOrVatNumber, setCompanyOrVatNumber] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (!account) {
            router.push('/');
        } else {
            loadCompanyDetails(account);
        }
    }, [account]);

    const loadCompanyDetails = async (account) => {
        const data = await fetchCompanyDetails(account);
        setCompanyDetails(data);
    };

    const saveCompanyDetailsToSupabase = async () => {
        const { error } = await supabase
            .from('companyDetails')
            .insert({
                user_address: account,
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
            loadCompanyDetails(account); // Refresh the company details after saving
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveCompanyDetailsToSupabase();
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.main}>
                {companyDetails ? (
                    <div className={styles.tableContainer}>
                        <h2 className={styles.tableTitle}>Company Details</h2>
                        <table className={styles.table}>
                            <tbody>
                                <tr>
                                    <th>Company Name</th>
                                    <td>{companyDetails.company_name}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{companyDetails.address}</td>
                                </tr>
                                <tr>
                                    <th>Postal Code</th>
                                    <td>{companyDetails.postal_code}</td>
                                </tr>
                                <tr>
                                    <th>City</th>
                                    <td>{companyDetails.city}</td>
                                </tr>
                                <tr>
                                    <th>Country</th>
                                    <td>{companyDetails.country}</td>
                                </tr>
                                <tr>
                                    <th>Company/VAT Number</th>
                                    <td>{companyDetails.company_vat_number}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h2 className={styles.formTitle}>Company Details</h2>
                        <table className={styles.table}>
                            <tbody>
                                <tr>
                                    <th><label htmlFor="companyName">Company Name</label></th>
                                    <td>
                                        <input
                                            type="text"
                                            id="companyName"
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            required
                                            className={styles.inputField}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="address">Address</label></th>
                                    <td>
                                        <input
                                            type="text"
                                            id="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                            className={styles.inputField}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="postalCode">Postal Code</label></th>
                                    <td>
                                        <input
                                            type="text"
                                            id="postalCode"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            required
                                            className={styles.inputField}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="city">City</label></th>
                                    <td>
                                        <input
                                            type="text"
                                            id="city"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                            className={styles.inputField}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="country">Country</label></th>
                                    <td>
                                        <input
                                            type="text"
                                            id="country"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                            className={styles.inputField}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="companyOrVatNumber">Company/VAT Number</label></th>
                                    <td>
                                        <input
                                            type="text"
                                            id="companyOrVatNumber"
                                            value={companyOrVatNumber}
                                            onChange={(e) => setCompanyOrVatNumber(e.target.value)}
                                            required
                                            className={styles.inputField}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" className={styles.submitButton}>Save</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserSettings;
