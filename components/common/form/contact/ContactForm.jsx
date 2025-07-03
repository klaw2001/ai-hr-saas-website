"use client";

import { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "India",
    streetAddress: "",
    cityState: "",
    area: "",
    pincode: "",
    showPhone: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/contact-info", formData);
      alert("Contact info submitted successfully!");
    } catch (err) {
      alert("Error submitting contact info");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container my-5">
      <h4 className="mb-3">Contact Information</h4>
      <p>
        Please fill out the form below. <span className="text-danger">*</span>{" "}
        required
      </p>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">First name *</label>
          <input
            type="text"
            name="firstName"
            required
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Last name *</label>
          <input
            type="text"
            name="lastName"
            required
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Phone *</label>
        <div className="input-group">
          <span className="input-group-text">+91</span>
          <input
            type="tel"
            name="phone"
            required
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            placeholder="81089-06521"
          />
        </div>
        <div className="form-check mt-2">
          <input
            type="checkbox"
            className="form-check-input"
            name="showPhone"
            id="showPhone"
            checked={formData.showPhone}
            onChange={handleChange}
          />
          <label htmlFor="showPhone" className="form-check-label">
            Show my number on AI HR
          </label>
        </div>
        <div className="form-text">
          By submitting the form with this box ticked, you agree to receive
          calls/texts/WhatsApp messages from employers and AI HR.
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
        />
      </div>

      <hr />
      <h5 className="mb-3">Location</h5>

      <div className="mb-3">
        <label className="form-label d-flex justify-content-between">
          <span>Country</span>
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => alert("Country picker not implemented")}
          >
            Change
          </button>
        </label>
        <input
          type="text"
          className="form-control"
          value={formData.country}
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Street address</label>
        <input
          type="text"
          name="streetAddress"
          className="form-control"
          value={formData.streetAddress}
          onChange={handleChange}
          placeholder="Not shown to employers"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">City, State *</label>
        <input
          type="text"
          name="cityState"
          className="form-control"
          required
          value={formData.cityState}
          onChange={handleChange}
          placeholder="Mumbai, Maharashtra"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Area</label>
        <input
          type="text"
          name="area"
          className="form-control"
          value={formData.area}
          onChange={handleChange}
          placeholder="e.g., Mumbai G.P.O."
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Pincode</label>
        <input
          type="text"
          name="pincode"
          className="form-control"
          value={formData.pincode}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default ContactForm;
