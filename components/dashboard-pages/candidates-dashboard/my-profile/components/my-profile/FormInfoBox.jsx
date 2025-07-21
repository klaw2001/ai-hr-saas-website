
'use client'

import React, { useEffect, useState } from "react";
import Select from "react-select";
import JobseekerServices from "@/apiServices/JobseekerServices";
import { toast } from "react-toastify";

const catOptions = [
  { value: "Banking", label: "Banking" },
  { value: "Digital & Creative", label: "Digital & Creative" },
  { value: "Retail", label: "Retail" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Managemnet", label: "Managemnet" },
  { value: "Accounting & Finance", label: "Accounting & Finance" },
  { value: "Digital", label: "Digital" },
  { value: "Creative Art", label: "Creative Art" },
];

const salaryOptions = [
  { value: "40-70 K", label: "40-70 K" },
  { value: "50-80 K", label: "50-80 K" },
  { value: "60-90 K", label: "60-90 K" },
  { value: "70-100 K", label: "70-100 K" },
  { value: "100-150 K", label: "100-150 K" },
  { value: "120-350 K", label: "120-350 K" },
];

const ageOptions = [
  { value: "23 - 27 Years", label: "23 - 27 Years" },
  { value: "24 - 28 Years", label: "24 - 28 Years" },
  { value: "25 - 29 Years", label: "25 - 29 Years" },
  { value: "26 - 30 Years", label: "26 - 30 Years" },
];

const allowOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

const FormInfoBox = ({ profileLogo, setProfileLogo }) => {
  const [form, setForm] = useState({
    full_name: "",
    job_title: "",
    phone: "",
    email: "",
    website: "",
    current_salary: "",
    expected_salary: "",
    experience: "",
    age: "",
    education_level: "",
    languages: "",
    categories: [],
    allow_in_listing: true,
    description: "",
    profile_logo: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await JobseekerServices.getJobseekerProfile();
        if (res.data?.status && res.data.data) {
          const data = res.data.data;
          setForm({
            full_name: data.full_name || "",
            job_title: data.job_title || "",
            phone: data.phone || "",
            email: data.email || "",
            website: data.website || "",
            current_salary: data.current_salary || "",
            expected_salary: data.expected_salary || "",
            experience: data.experience || "",
            age: data.age || "",
            education_level: data.education_level || "",
            languages: data.languages || "",
            categories: Array.isArray(data.categories)
              ? data.categories.map((cat) =>
                  catOptions.find((opt) => opt.value === cat) || { value: cat, label: cat }
                )
              : [],
            allow_in_listing: data.allow_in_listing !== undefined ? data.allow_in_listing : true,
            description: data.description || "",
            profile_logo: data.profile_logo || "",
          });
          if (data.profile_logo) {
            setProfileLogo(data.profile_logo);
          }
        }
      } catch (err) {
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setForm((prev) => ({ ...prev, profile_logo: profileLogo }));
  }, [profileLogo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoriesChange = (selected) => {
    setForm((prev) => ({
      ...prev,
      categories: selected || [],
    }));
  };

  const handleAllowChange = (e) => {
    setForm((prev) => ({
      ...prev,
      allow_in_listing: e.target.value === "true",
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        categories: form.categories.map((cat) => cat.value),
        profile_logo: profileLogo,
      };
      const res = await JobseekerServices.updateJobseekerProfile(payload);
      if (res.data?.success || res.data?.status) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(res.data?.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Full Name */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            placeholder="Jerome"
            required
          />
        </div>
        {/* Job Title */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Title</label>
          <input
            type="text"
            name="job_title"
            value={form.job_title}
            onChange={handleChange}
            placeholder="UI Designer"
            required
          />
        </div>
        {/* Phone */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="0 123 456 7890"
            required
          />
        </div>
        {/* Email */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="creativelayers"
            required
          />
        </div>
        {/* Website */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="www.jerome.com"
          />
        </div>
        {/* Current Salary */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Current Salary($)</label>
          <select
            className="chosen-single form-select"
            name="current_salary"
            value={form.current_salary}
            onChange={handleSelectChange}
            required
          >
            <option value="">Select</option>
            {salaryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {/* Expected Salary */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Expected Salary($)</label>
          <select
            className="chosen-single form-select"
            name="expected_salary"
            value={form.expected_salary}
            onChange={handleSelectChange}
            required
          >
            <option value="">Select</option>
            {salaryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {/* Experience */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <input
            type="text"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="5-10 Years"
            required
          />
        </div>
        {/* Age */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Age</label>
          <select
            className="chosen-single form-select"
            name="age"
            value={form.age}
            onChange={handleSelectChange}
            required
          >
            <option value="">Select</option>
            {ageOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {/* Education Level */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Education Levels</label>
          <input
            type="text"
            name="education_level"
            value={form.education_level}
            onChange={handleChange}
            placeholder="Certificate"
            required
          />
        </div>
        {/* Languages */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Languages</label>
          <input
            type="text"
            name="languages"
            value={form.languages}
            onChange={handleChange}
            placeholder="English, Turkish"
            required
          />
        </div>
        {/* Categories */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Categories </label>
          <Select
            isMulti
            name="categories"
            options={catOptions}
            value={form.categories}
            onChange={handleCategoriesChange}
            className="basic-multi-select"
            classNamePrefix="select"
            required
          />
        </div>
        {/* Allow In Search & Listing */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Allow In Search & Listing</label>
          <select
            className="chosen-single form-select"
            name="allow_in_listing"
            value={form.allow_in_listing}
            onChange={handleAllowChange}
            required
          >
            {allowOptions.map((opt) => (
              <option key={opt.value.toString()} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {/* Description */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe yourself"
            required
          />
        </div>
        {/* Submit */}
        <div className="form-group col-lg-6 col-md-12">
          <button
            type="submit"
            className="theme-btn btn-style-one"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
