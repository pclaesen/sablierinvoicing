const checkInvoiceExists = async (transactionHash) => {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select('invoice_number, transaction_hash')
      .eq('transaction_hash', transactionHash);

    if (error) {
      console.error('Error checking invoice existence:', error);
      return false;
    }

    console.log('Supabase response:', data); // Log the response

    if (data && data.length > 0) {
      console.warn(`Warning: Transaction ${transactionHash} already has an invoice number: ${data[0].invoice_number}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Unexpected error checking invoice existence:', error);
    return false;
  }
};