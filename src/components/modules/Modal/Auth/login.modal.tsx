import Button from "components/elements/Button";
import Input from "components/elements/Form/input";
import Modal from "..";
import useModal from "../useModal";
import { Formik } from "formik";
import useAuth from "hooks/useAuth";
import GoogleSection from "./google.section";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export const useLoginModal = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return {
    isLoginOpen: isOpen,
    closeLogin: closeModal,
    openLogin: openModal,
  };
};

const LoginModal: React.FC<ModalProps> = ({ open, onClose, openOther }) => {
  const { login, loading } = useAuth();
  const [reveal, setReveal] = useState(false);

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
            className="container p-4 flex flex-col items-center justify-center text-gray-50 md:w-96"
          >
            <p className="text-xl font-bold">Masuk Akun Trooops</p>
            <GoogleSection text="Masuk dengan Google" />
            <Input
              type="email"
              label="Email"
              placeholder="user@trooops.id"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email}
            />
            <Input
              type={reveal ? "text" : "password"}
              label="Password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password}
              endAddorment={
                reveal ? (
                  <FaEyeSlash
                    onClick={() => setReveal(false)}
                    className="text-gray-500"
                  />
                ) : (
                  <FaEye
                    onClick={() => setReveal(true)}
                    className="text-gray-500"
                  />
                )
              }
            />
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Button
                variant="primary"
                className="mt-4 w-full"
                type="submit"
                disabled={isSubmitting}
              >
                Masuk
              </Button>
            )}
            <Button
              variant="text"
              className="mt-2 w-full text-gray-50"
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
