'use client'
import FormInfoBox from "./FormInfoBox";
import LogoUpload from "./LogoUpload";
import React, { useState } from "react";

const Index = () => {
  const [profileLogo, setProfileLogo] = useState("");

  return (
    <div className="widget-content">
      <LogoUpload onUpload={setProfileLogo} initialUrl={profileLogo} />
      {/* End logo and cover photo components */}

      <FormInfoBox profileLogo={profileLogo} setProfileLogo={setProfileLogo} />
      {/* compnay info box */}
    </div>
  );
};

export default Index;
