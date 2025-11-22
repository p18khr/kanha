import express from "express";
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientBuildPath = path.join(__dirname, "..", "client", "build");
app.use(express.static(clientBuildPath));

app.post("/send", async (req, res) => {
  console.log('/send called with body:', req.body);
  const { name, email, number, date } = req.body;

  if (!name || !email || !number || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Prefer SendGrid if an API key is provided (recommended for production)
    const sendGridKey = process.env.SENDGRID_API_KEY;
    if (sendGridKey) {
      sgMail.setApiKey(sendGridKey);
      const fromAddress = process.env.SENDGRID_SENDER || process.env.SMTP_USER || 'no-reply@kanhasafaribooking.in';
      const msg = {
        to: "gojungleeadventures@gmail.com",
        from: fromAddress,
        replyTo: email,
        subject: `New Visitor Entry from ${name}`,
        html: `
          <h2>Visitor Details</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mobile Number:</strong> ${number}</p>
          <p><strong>Date of Visit:</strong> ${date}</p>
        `,
      };

      try {
        const resp = await sgMail.send(msg);
        console.log('SendGrid send response:', resp && resp[0] && resp[0].statusCode ? resp[0].statusCode : resp);
        return res.json({ message: 'Email sent successfully!' });
      } catch (sgErr) {
        console.error('SendGrid error:', sgErr && sgErr.message ? sgErr.message : sgErr);
        // fall through to attempt SMTP if configured
      }
    }
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.error("SMTP_USER or SMTP_PASS is not set in environment variables");
      return res.status(500).json({ message: "Email service not configured." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      logger: true,
      debug: true,
    });

    try {
      await transporter.verify();
      console.log('SMTP connection verified');
    } catch (verifyErr) {
      console.error('SMTP verify failed:', verifyErr);
      return res.status(500).json({ message: 'Email service not available.' });
    }

    const mailOptions = {
      from: email,
      to: "gojungleeadventures@gmail.com",
      subject: `New Visitor Entry from ${name}`,
      html: `
        <h2>Visitor Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile Number:</strong> ${number}</p>
        <p><strong>Date of Visit:</strong> ${date}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info && info.response ? info.response : info);
    res.json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
});

// Temporary debug endpoint: reports whether SMTP env vars are set and whether
// the server can verify an SMTP connection. Does not expose credentials.
app.get('/__debug', async (req, res) => {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const result = {
    smtpUserSet: !!smtpUser,
    smtpPassSet: !!smtpPass,
  };

  if (!smtpUser || !smtpPass) {
    return res.json({ ...result, verified: false, message: 'SMTP env vars missing' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: smtpUser, pass: smtpPass },
    });
    await transporter.verify();
    return res.json({ ...result, verified: true, message: 'SMTP verified' });
  } catch (err) {
    return res.json({ ...result, verified: false, error: err && err.message ? err.message : String(err) });
  }
});

// Serve React app for any other route (keep after API routes so they are reachable)
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
