import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaChevronRight,
} from "react-icons/fa";

const ProfilePage = () => {
  return (
    <div className="profile-container py-4">
      <div className="d-flex align-items-start justify-content-between mb-3 flex-column ">
        <div className="d-flex align-items-center justify-content-between w-100 mb-3" >
          <h1 className="mb-0">Sidd Kaskar</h1>
        <div className="me-3">
          <div
            className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
            style={{ width: "80px", height: "80px" }}
          >
            <span>SK</span>
          </div>
        </div>
        </div>
          <div className="text-muted">
            <div>
              <FaEnvelope className="me-2" />
              <a href="#">Add email</a>
            </div>
            <div>
              <FaPhone className="me-2" />
              081089 06521
            </div>
            <div>
              <FaMapMarkerAlt className="me-2" />
              Mumbai G.P.O., Mumbai, Maharashtra, IN
            </div>
          </div>
      </div>

      <div className="my-5">
        <h5 className="mb-3">Resume</h5>
        <div className="d-flex gap-3">
          <button className="btn btn-primary">Upload Resume</button>
          <button className="btn btn-outline-primary">
            Build an AI HR Resume
          </button>
        </div>
        <p className="text-muted mt-2" style={{ fontSize: "0.875rem" }}>
          By continuing, you agree to receive job opportunities from AI HR.
        </p>
      </div>

      <div>
        <h5 className="mb-3">Improve your job matches</h5>
        <div className="list-group">
          <a
            href="/profile/qualifications"
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>Qualifications</strong>
              <br />
              <small className="text-muted">
                Highlight your skills and experience.
              </small>
            </div>
            <div>
              <FaChevronRight />
            </div>
          </a>
          <a
            href="/profile/job-preferences"
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>Job preferences</strong>
              <br />
              <small className="text-muted">
                Save specific details like minimum desired pay and schedule.
              </small>
            </div>
            <div>
              <FaChevronRight />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
