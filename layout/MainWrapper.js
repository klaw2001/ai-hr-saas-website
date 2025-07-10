import Footer from "@/components/main-home/Footer";
import DefaulHeader from "../components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
const MainWrapper = ({ children }) => {
  return (
    <>
      <MobileMenu />
      <DefaulHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainWrapper;
