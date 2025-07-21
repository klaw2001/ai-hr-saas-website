'use client'
import { useState } from "react";
import JobseekerServices from "@/apiServices/JobseekerServices";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Form = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { oldPassword, newPassword, confirmPassword };
    const response = await JobseekerServices.resetJobseekerPassword(payload);

    if(response.data.status){
      toast.success(response.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      router.push("/candidates-dashboard/dashboard");
    }else{
      toast.error(response.data.message);
    }
  };
  return (
    <form className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-7 col-md-12">
          <label>Old Password </label>
          <input type="password" name="name" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-7 col-md-12">
          <label>New Password</label>
          <input type="password" name="name" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-7 col-md-12">
          <label>Confirm Password</label>
          <input type="password" name="name" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
