import Button from "components/elements/Button";
import useAuth from "hooks/useAuth";
import LoginModal, { useLoginModal } from "../Modal/login.modal";
import RegisterModal, { useRegisterModal } from "../Modal/register.modal";
import logo from "assets/full_logo_white.png";

const Navbar = () => {
  const { isLoginOpen, closeLogin, openLogin } = useLoginModal();
  const { isRegisterOpen, closeRegister, openRegister } = useRegisterModal();
  const { user, logout } = useAuth();

  return (
    <div className="lg:px-20 px-4 md:px-15 bg-transparent w-screen fixed top-0 left-0 h-16 flex items-center z-20">
      <div className="w-full">
        <img src={logo} alt="logo" width="25%" />
      </div>
      <div className="w-full flex justify-end">
        {!user ? (
          <>
            <div className="m-2">
              <Button variant="text" onClick={openLogin}>
                Masuk
              </Button>
            </div>
            <div className="mt-2 ml-2 mb-2">
              <Button variant="primary" onClick={openRegister}>
                Daftar
              </Button>
            </div>
          </>
        ) : (
          <div className="mt-2 ml-2 mb-2">
            <Button variant="text" onClick={logout}>
              Keluar
            </Button>
          </div>
        )}
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

export default Navbar;
