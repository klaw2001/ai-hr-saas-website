import Register from '@/components/common/form/register/Register';
import React from 'react'

const RegisterPage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{ height: "100vh", backgroundColor: "#e5f1fb" }}
    >
      <div className="p-4 rounded bg-light">
        <div className="login-form default-form">
          <Register />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage