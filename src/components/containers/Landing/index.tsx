import LoginModal, {
  useLoginModal,
} from "components/modules/Modal/Auth/login.modal";
import RegisterModal, {
  useRegisterModal,
} from "components/modules/Modal/Auth/register.modal";
import logo from "assets/full_logo_white.png";
import Button from "components/elements/Button";

export interface LandingComponentProps {
  openRegister: () => void;
}

const Landing = () => {
  const { isLoginOpen, closeLogin, openLogin } = useLoginModal();
  const { isRegisterOpen, closeRegister, openRegister } = useRegisterModal();
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-800 text-white flex-col">
      <div className="w-full flex justify-center">
        <img
          src={logo}
          alt="logo"
          className="w-1/2"
          style={{ minWidth: "120px", maxWidth: "250px" }}
        />
      </div>
      <h1 className="text-xl md:text-3xl my-2 text-center">
        Platform Teknologi untuk Pendidikan
      </h1>
      <div className="flex flex-col w-1/3">
        <Button variant="primary" className=" mt-4" onClick={openLogin}>
          Masuk
        </Button>
        <Button variant="text" className="mt-4" onClick={openRegister}>
          Daftar
        </Button>
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

export default Landing;
