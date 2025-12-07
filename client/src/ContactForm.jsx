import React, { useState } from "react";
import "./ContactForm.css";
import bgImage from "./assets/photoCollage.png";

const ContactForm = () => {
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      number: formData.get("number"),
      date: formData.get("date"),
      message: formData.get("message"),
    };

    try {
      const url = 'https://kanha-national-park-q3eg5ghtg.vercel.app/api/send';
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatusMessage("Details sent successfully!");
        event.target.reset();
      } else {
        setStatusMessage("Failed to send details. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">Kanha National Park Safari</div>&nbsp;
        <div style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "brown", // solid WhatsApp green
            color: "white",
            padding: "10px 24px",
            borderRadius: "9999px",
            textDecoration: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            fontFamily: "sans-serif",
          }}>
          Phone Number - <strong>+91-9369147258</strong>
        </div>
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "brown", // solid WhatsApp green
            color: "white",
            padding: "10px 24px",
            borderRadius: "9999px",
            textDecoration: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            fontFamily: "sans-serif",
          }}>GoJunglee Adventures</div>
        <a
          href="https://wa.me/9369147258"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#25D366", // solid WhatsApp green
            color: "white",
            padding: "10px 24px",
            borderRadius: "9999px",
            textDecoration: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            fontFamily: "sans-serif",
          }}
        >
          <span style={{ fontSize: "12px", lineHeight: "14px" }}>
            Chat with us
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              style={{
                width: "20px",
                height: "20px",
                background: "white",
                borderRadius: "50%",
                padding: "2px",
              }}
            />
            <span style={{ fontWeight: "600", fontSize: "15px" }}>
              WhatsApp
            </span>
          </div>
          <span style={{ fontSize: "11px", opacity: 0.9 }}>Click Here </span>
        </a>
      </nav>
      <div
        className="form-container"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="intro-text">
          <div className="kanha-box">
            <h1>
              <strong>
                Plan your getaway Jungle safari, Resort and Taxi booking
              </strong>
            </h1>
            <p>
              As an experienced travel operator specializing in wildlife tours,
              we help you explore the majestic beauty of Kanha National Park one
              of India's finest Tiger reserves. Whether you're seeking
              adventure, photography or a peaceful retreat in nature, we offer
              curated travel packages tailored to your needs.
            </p>
          </div>
          <div className="kanha-box">
            <h2>
              <strong>Let Us Plan your KANHA Jungle Safari</strong>
            </h2>
            <p>
              <strong>Monsoon Season in Buffer Zone:</strong> Available from{" "}
              <em>01 July to 30 September</em>.
            </p>
            <p>
              <strong>Booking:</strong> For Core and Buffer Zones is accepted
              from <em>01st October Onwards</em>.
            </p>
            <p>
              The best way to ensure you have an amazing time observing wildlife
              at <strong>Kanha Tiger Reserve</strong>&nbsp; is to make your
              reservations before your visit. Online booking is highly
              recommended since entries are limited.
            </p>
          </div>

          {/* Box 2: Access Points */}
          <div className="kanha-box">
            <h2>
              <strong>Nearest Access Points</strong>
            </h2>
            <ul>
              <li>
                <strong>Nearest Airport:</strong> Jabalpur, Raipur
              </li>
              <li>
                <strong>Nearest Railway Station:</strong> Jabalpur, Gondia
              </li>
            </ul>
          </div>

          {/* Box 3: Safari Zones */}
          <div className="kanha-box">
            <h2>
              <strong>Safari Zones</strong>
            </h2>
            <p>
              <strong>Core Zones:</strong> Kanha, Kisli, Mukki, Sarhi
            </p>
            <p>
              <strong>Buffer Zones:</strong> Khatia, Khapa
            </p>
          </div>

          {/* Box 4: Safari Timings */}
          <div className="kanha-box">
            <h2>
              <strong>Safari Timings</strong>
            </h2>
            <p>
              <strong>Morning:</strong> 06:30 AM - 10:00 AM
            </p>
            <p>
              <strong>Evening:</strong> 02:00 PM - 06:00 PM
            </p>
            <p>
              <em>(Timings are tentative and may vary by season or gate.)</em>
            </p>
          </div>

          {/* Box 5: Night Safari */}
          <div className="kanha-box">
            <h2>
              <strong>Night Safari</strong>
            </h2>
            <p>
              Experience the thrill of wildlife after sunset!{" "}
              <strong>Night Safari</strong> in Kanha Tiger Reserve runs from{" "}
              <strong>6:00 PM to 9:00 PM</strong> in{" "}
              <strong>buffer zones only</strong>.
            </p>
          </div>

          {/* Box 6: Charges */}
          <div className="kanha-box">
            <h2>
              <strong>Safari Charges</strong>
            </h2>
            <ul>
              <li>
                <strong>Core Zone:</strong> ₹8,500 (Mon–Fri) | ₹9,200 (Sat–Sun)
              </li>
              <li>
                <strong>Buffer Zone:</strong> ₹7,200 (All Days)
              </li>
              <li>
                <strong>Night Safari:</strong> ₹7,500 (All Days)
              </li>
            </ul>
            <p>
              <em>
                All charges include entry fee, permit, guide, driver, gypsy, and
                service charge.
              </em>
            </p>
            <p>
              <strong>Note:</strong> Pickup and drop from resort available at
              extra charge.
            </p>
          </div>

          {/* Box 7: Tourist Info */}
          <div className="kanha-box">
            <h2>
              <strong>Additional Information for Tourists</strong>
            </h2>
            <ul>
              <li>
                Book your Kanha Safari at least{" "}
                <strong>120 days in advance</strong>.
              </li>
              <li>
                Carry valid ID (Driver’s License, Passport, PAN, or Voter ID).
              </li>
              <li>
                <em>
                  Safaris are non-cancellable, non-transferable, and
                  non-refundable.
                </em>
              </li>
              <li>
                Each safari jeep accommodates up to <strong>6 persons</strong>{" "}
                (children under 5 enter free).
              </li>
            </ul>
          </div>

          {/* Box 8: Places */}
          <div className="kanha-box">
            <h2>
              <strong>Places to Visit in Kanha National Park</strong>
            </h2>
            <ul>
              <li>Kanha Museum</li>
              <li>Lapsi Kabar</li>
              <li>Shravan Tal</li>
              <li>Sindoor Trees</li>
            </ul>
          </div>

          {/* Box 9: Form Intro */}
          <div className="kanha-box">
            <p>
              Share your details with us using the below form, and we’ll get
              back to you with the <strong>best available quotes</strong> — no
              hidden costs, just personalized, affordable, and unforgettable
              jungle experiences.
            </p>
          </div>
        </div>

        <form
          className="container contact-form"
          onSubmit={handleSubmit}
          style={{ padding: "70px", textAlign: "center" }}
        >
          <h2 className="form-title">Visitor Details Form</h2>

          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Enter your name"
            required
          />

          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            required
          />

          <label className="form-label" htmlFor="number">
            Mobile Number
          </label>
          <input
            type="tel"
            id="number"
            name="number"
            className="form-input"
            placeholder="Enter your mobile number"
            required
          />

          <label className="form-label" htmlFor="date">
            Date of Visit
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-input"
            required
          />

          <label className="form-label" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="form-input"
            placeholder="Enter your message (optional)"
            rows="4"
          ></textarea>

          <button type="submit" className="submit-button">
            Send Details
          </button>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </form>
        <br/><br/>
        <div className="kanha-box">
            <h2>
              <strong>Address</strong>
            </h2>
            <ul>
              <li>
                Kanha Tiger Reserve, 55, Chiraidongri - Kanha Rd, near Kisli, Village Khatia, Madhya Pradesh 481768
              </li>
            </ul>
          </div>
      </div>
    </div>
  );
};

export default ContactForm;
