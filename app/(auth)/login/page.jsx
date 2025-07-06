import FormContent from '@/components/common/form/login/FormContent';
import React from 'react'

const Login = () => {
  return (
    <div
    className="d-flex justify-content-center align-items-center "
    style={{ height: "100vh", backgroundColor: "#e5f1fb" }}
  >
    <div className="p-4 rounded bg-light">
      <div className="login-form default-form">
        <FormContent />
      </div>
    </div>
  </div>
  );
}

export default Login