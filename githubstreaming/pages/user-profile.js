import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../app/components/Header';
import styles from '../styles/page.module.css';
import { fetchCompanyDetails } from '../app/components/SB_Helpers';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rnogylocxdeybupnqeyt.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const UserSettings = ({ account }) => {
    const [companyDetails, setCompanyDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [companyOrVatNumber, setCompanyOrVatNumber] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (!account) {
            router.push('/');
        } else {
            const storedCompanyDetails = sessionStorage.getItem('companyDetails');

            if (storedCompanyDetails) {
                const parsedDetails = JSON.parse(storedCompanyDetails);
                setCompanyDetails(parsedDetails);
                setCompanyName(parsedDetails?.company_name || '');
                setAddress(parsedDetails?.address || '');
                setPostalCode(parsedDetails?.postal_code || '');
                setCity(parsedDetails?.city || '');
                setCountry(parsedDetails?.country || '');
                setCompanyOrVatNumber(parsedDetails?.company_vat_number || '');
                setLoading(false);  // Data is immediately available
            } else {
                loadCompanyDetails(account);
            }
        }
    }, [account]);

    const loadCompanyDetails = async (account) => {
        setLoading(true);  // Show loading while fetching data
        const data = await fetchCompanyDetails(account);

        // Save the data to both state and session storage
        setCompanyDetails(data);
        setCompanyName(data?.company_name || '');
        setAddress(data?.address || '');
        setPostalCode(data?.postal_code || '');
        setCity(data?.city || '');
        setCountry(data?.country || '');
        setCompanyOrVatNumber(data?.company_vat_number || '');
        sessionStorage.setItem('companyDetails', JSON.stringify(data));
        setLoading(false);  // Data has been loaded
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
            loadCompanyDetails(account);  // Refresh and update the storage
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
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    companyDetails ? (
                        <div className={styles.tableContainer}>
                            <h2 className={styles.tableTitle}>Company Details</h2>
                            <table className={styles.table}>
                                <tbody>
                                    <tr>
                                        <th>Company Name</th>
                                        <td>{companyDetails?.company_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <td>{companyDetails?.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Postal Code</th>
                                        <td>{companyDetails?.postal_code}</td>
                                    </tr>
                                    <tr>
                                        <th>City</th>
                                        <td>{companyDetails?.city}</td>
                                    </tr>
                                    <tr>
                                        <th>Country</th>
                                        <td>{companyDetails?.country}</td>
                                    </tr>
                                    <tr>
                                        <th>Company/VAT Number</th>
                                        <td>{companyDetails?.company_vat_number}</td>
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
                    )
                )}
            </div>
        </div>
    );
};

export default UserSettings;
