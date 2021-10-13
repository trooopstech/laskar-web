import LoginModal, {
  useLoginModal,
} from "components/modules/Modal/Auth/login.modal";
import RegisterModal, {
  useRegisterModal,
} from "components/modules/Modal/Auth/register.modal";
import Benefit from "./benefit";
import Faq from "./faq";
import Feature from "./feature";
import Hero from "./hero";

export interface LandingComponentProps {
  openRegister: () => void;
}

const Landing = () => {
  const { isLoginOpen, closeLogin, openLogin } = useLoginModal();
  const { isRegisterOpen, closeRegister, openRegister } = useRegisterModal();
  return (
    <div className="w-full">
      <Hero openRegister={openRegister} />
      <Feature openRegister={openRegister} />
      <Benefit openRegister={openRegister} />
      <Faq />
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
