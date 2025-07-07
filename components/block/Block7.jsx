const Block7 = () => {
  const blockContent = [
    {
      id: 1,
      icon: "icon-case",
      title: "Create Your Profile",
      text: `Sign up, tell us your experience, and choose a template.`,
    },
    {
      id: 2,
      icon: "icon-contact",
      title: "Generate & Customize",
      text: `Let AI generate your resume and cover letters. Edit anytime.`,
    },
    {
      id: 3,
      icon: "icon-doc",
      title: "Apply Automatically",
      text: `Turn on RecruitVerse ApplyBot and let the job hunt run 24/7.`,
    },
    {
      id: 4,
      icon: "icon-doc",
      title: "Track Progress",
      text: `Monitor your applications and interviews in a smart dashboard.`,
    },
  ];
  return (
    <>
      {blockContent.map((item) => (
        <div className="col-lg-3 col-md-6 col-sm-12" key={item.id}>
          <div className="work-block -type-3 mb-0">
            <div className="inner-box">
              <div className="icon-wrap -green">
                <span className={`icon ${item.icon}`}></span>
              </div>
              <h4 className="fw-bold">{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Block7;
