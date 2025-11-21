import express from "express";
import nodemailer from "nodemailer";
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
  const { name, email, number, date } = req.body;

  if (!name || !email || !number || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
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
    });

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

    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
