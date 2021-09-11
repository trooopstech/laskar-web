import Button from "components/elements/Button";
import Input from "components/elements/Form/input";
import Modal from ".";
import useModal from "./useModal";
import { Formik } from "formik";
import useAuth from "hooks/useAuth";

export const useLoginModal = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return {
    isLoginOpen: isOpen,
    closeLogin: closeModal,
    openLogin: openModal,
  };
};

const LoginModal: React.FC<ModalProps> = ({ open, onClose, openOther }) => {
  const { login } = useAuth();
  return (
    <Modal open={open} onClose={onClose}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            // @ts-ignore
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            // @ts-ignore
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            // @ts-ignore
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          login(values as UserLoginInput, () => setSubmitting(false));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form
            onSubmit={handleSubmit}
            className="container p-4 flex flex-col items-center justify-center text-black md:w-80"
          >
            <p className="text-lg">Masuk Akun Trooops</p>
            <Input
              type="email"
              label="Email"
              placeholder="user@trooops.id"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <Input
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <Button
              variant="primary"
              className="mt-4 w-full"
              type="submit"
              disabled={isSubmitting}
            >
              Masuk
            </Button>
            <Button
              variant="text"
              className="mt=4 w-full text-red-500"
              onClick={() => {
                onClose();
                if (openOther) {
                  openOther();
                }
              }}
            >
              Belum punya akun? Daftar
            </Button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default LoginModal;
