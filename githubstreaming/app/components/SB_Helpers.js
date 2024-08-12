import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://rnogylocxdeybupnqeyt.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY; // Ensure this env variable is set
const supabase = createClient(supabaseUrl, supabaseKey);

export const checkInvoiceExists = async (transactionHash) => {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select('invoice_number, transaction_hash')
      .eq('transaction_hash', transactionHash);

    if (error) {
      console.error('Error checking invoice existence:', error);
      return { exists: false, invoiceNumber: null };
    }

    if (data && data.length > 0) {
      return { exists: true, invoiceNumber: data[0].invoice_number };
    }

    return { exists: false, invoiceNumber: null };
  } catch (error) {
    console.error('Unexpected error checking invoice existence:', error);
    return { exists: false, invoiceNumber: null };
  }
};

export const fetchCompanyDetails = async (account) => {
  try {
    const { data, error } = await supabase
      .from('companyDetails')
      .select('*')
      .eq('user_address', account)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching company details from Supabase:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching company details:', error);
    return null;
  }
};

export const checkInvoiceNumberExists = async (invoiceNumber) => {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select('invoice_number')
      .eq('invoice_number', invoiceNumber)
      .single();
    
    if (error) {
      console.error('Error checking invoice number:', error);
      return false;
    }
    
    return data !== null;
  } catch (error) {
    console.error('Unexpected error checking invoice number:', error);
    return false;
  }
};

