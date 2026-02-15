import fetch from "node-fetch";
import nodemailer from "nodemailer";

const PAYPAL_API = "https://api.sandbox.paypal.com"; // Use "https://api.paypal.com" for production
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

// Get PayPal Access Token
async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
  
  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });

  const data = await response.json();
  return data.access_token;
}

// Verify PayPal Order
async function verifyPayPalOrder(orderID) {
  const accessToken = await getPayPalAccessToken();
  
  const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });

  return response.json();
}

// Send Thank You Email
async function sendDonationEmail(email, name, amount, transactionID) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thank You for Your Donation to ICDA Africa",
    html: `
      <h2>Thank You, ${name}!</h2>
      <p>We received your donation of $${amount} to ICDA Africa.</p>
      <p><strong>Transaction ID:</strong> ${transactionID}</p>
      <p>Your support helps us improve oral health across Africa. We will send you updates on how your donation is making an impact.</p>
      <p>Best regards,<br>ICDA Africa Team</p>
    `
  };

  return transporter.sendMail(mailOptions);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { orderID, email, name, amount } = req.body;

    // Verify the order with PayPal
    const orderDetails = await verifyPayPalOrder(orderID);

    if (orderDetails.status !== "COMPLETED") {
      return res.status(400).json({ error: "Order not completed" });
    }

    // Send thank you email
    await sendDonationEmail(email, name, amount, orderID);

    // Optionally: Save donation to database
    // await saveDonationToDatabase({ email, name, amount, orderID, date: new Date() });

    res.status(200).json({ 
      success: true, 
      transactionID: orderID,
      message: "Donation received successfully"
    });

  } catch (error) {
    console.error("PayPal webhook error:", error);
    res.status(500).json({ error: error.message });
  }
}