'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { register } from '@/features/auth/authSlice';

const FormContent = ({ role }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: role,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(register(form)).unwrap();
      if (result?.data.token) {
        router.push('/home');
      }
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="john@example.com"
          required
          value={form.email}
          onChange={handleChange}
        />
      </div>
      {/* name */}

      <div className="form-group">
        <label>Password</label>
        <input
          id="password-field"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      {/* password */}
      {error && <p className="text-danger">{error}</p>}

      <div className="form-group">
        <button
          className="theme-btn btn-style-one"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
      {/* login */}
    </form>
  );
};

export default FormContent;

