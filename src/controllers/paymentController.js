import { snap } from '../config/midtrans.js';

export const createTransaction = async (req, res) => {
  const { order_id, gross_amount, customer } = req.body;

  const parameter = {
    transaction_details: {
      order_id, 
      gross_amount, 
    },
    customer_details: {
      name : customer.name,
      email: customer.email,
      phone: customer.phone,
    },
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    res.status(200).json({ token: transaction.token }); 
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Failed to create transaction' });
  }
};
