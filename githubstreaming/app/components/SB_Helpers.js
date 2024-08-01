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