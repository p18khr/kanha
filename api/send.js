// Vercel serverless function to send email via Gmail API (OAuth2)
// Expects env vars: GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_USER
import { google } from 'googleapis';

export default async function handler(req, res) {
  const allowedEnv = process.env.CORS_ORIGIN || process.env.CORS_ORIGINS || '';
  const allowList = allowedEnv
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const setCors = () => {
    // Emergency permissive CORS to unblock immediately
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Max-Age', '86400');
  };

  if (req.method === 'OPTIONS') {
    setCors();
    return res.status(204).end();
  }
  if (req.method === 'GET') {
    setCors();
    const present = {
      GMAIL_CLIENT_ID: Boolean(process.env.GMAIL_CLIENT_ID),
      GMAIL_CLIENT_SECRET: Boolean(process.env.GMAIL_CLIENT_SECRET),
      GMAIL_REFRESH_TOKEN: Boolean(process.env.GMAIL_REFRESH_TOKEN),
      GMAIL_USER: Boolean(process.env.GMAIL_USER),
    };
    return res.json({ ok: true, present });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, number, date, message } = req.body || {};
  if (!name || !email || !number || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
  const gmailUser = process.env.GMAIL_USER;

  try {
    setCors();
    if (!clientId || !clientSecret || !refreshToken || !gmailUser) {
      return res.status(500).json({ message: 'Email service not configured.' });
    }

    const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const html = `
      <h2>Visitor Details</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile Number:</strong> ${number}</p>
      <p><strong>Date of Visit:</strong> ${date}</p>
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
    `;

    const raw = [
      `From: ${gmailUser}`,
      `To: gojungleeadventures@gmail.com`,
      `Reply-To: ${email}`,
      `Subject: New Visitor Entry from ${name}`,
      'Content-Type: text/html; charset=UTF-8',
      '',
      html,
    ].join('\r\n');

    const encoded = Buffer.from(raw)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({ userId: 'me', requestBody: { raw: encoded } });
    return res.json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Vercel send error:', err?.message || err);
    return res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
}
