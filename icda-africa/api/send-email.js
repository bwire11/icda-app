import nodemailer from "nodemailer";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message, helpType, subject } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Fallback to a known contact email if EMAIL_USER is not set
  const destinationEmail = process.env.EMAIL_USER || "hesyra.healthhub@gmail.com";
  const sourceEmail = process.env.EMAIL_USER || destinationEmail;

  try {
    await transporter.sendMail({
      from: sourceEmail,
      replyTo: email,
      to: destinationEmail,
      subject: subject || `New message from ${name}`,
      html: `
        <h2>New Message from Website</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${helpType ? `<p><strong>Interest:</strong> ${escapeHtml(helpType)}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
      text: `
        New Message from Website

        Name: ${name}
        Email: ${email}
        ${helpType ? `Interest: ${helpType}` : ''}

        Message:
        ${message}
      `
    });

    res.status(200).json({ success: true, message: "Thank you for reaching out!" });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: error.message });
  }
}

// Helper function to escape HTML special characters
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
