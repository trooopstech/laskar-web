import logo from "assets/full_logo_white.png";
import { MdCopyright } from "react-icons/md";
import LoginModal, { useLoginModal } from "../Modal/Auth/login.modal";
import RegisterModal, { useRegisterModal } from "../Modal/Auth/register.modal";

const Footer = () => {
  const { isLoginOpen, closeLogin, openLogin } = useLoginModal();
  const { isRegisterOpen, closeRegister, openRegister } = useRegisterModal();
  return (
    <div className="lg:px-20 px-4 md:px-15 bg-gray-700 w-screen py-8 md:py-12 lg:py-16">
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full">
          <img
            src={logo}
            alt="logo"
            className="w-1/2 md:w-1/5 lg:w-1/4 -ml-2"
            style={{ minWidth: "50px", maxWidth: "120px" }}
          />
          <p className="font-thin cursor-pointer" onClick={openLogin}>
            Masuk
          </p>
          <p className="font-thin cursor-pointer" onClick={openRegister}>
            Daftar Gratis
          </p>
        </div>
        <div className="w-full flex flex-col items-start md:items-end mt-8 md:mt-0">
          <p>Jl. Kebon Jeruk no 11, Tangerang, Banten</p>
          <p className="font-thin text-gray-500 md:text-right">
            Ada pertanyaan? Email kita di <b>hello@trooops.id</b> <br /> atau
            hubungi kami di <b>081310028280</b>
          </p>
        </div>
      </div>
      <div className="w-full flex items-center mt-8">
        <MdCopyright className="mr-2" />
        2021 Trooops
      </div>
      <LoginModal
        open={isLoginOpen}
        onClose={closeLogin}
        openOther={openRegister}
      />
      <RegisterModal
        open={isRegisterOpen}
        onClose={closeRegister}
        openOther={openLogin}
      />
    </div>
  );
};

export default Footer;
