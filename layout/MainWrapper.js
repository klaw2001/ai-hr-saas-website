import DefaulHeader from "../components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import FooterDefault from "@/components/footer/common-footer";
const MainWrapper = ({ children }) => {
  return (
    <>
      <MobileMenu />
      <DefaulHeader />
      <main>{children}</main>
      <FooterDefault />
    </>
  );
};

export default MainWrapper;
