import Button from "components/elements/Button";
import Input from "components/elements/Form/input";
import Modal from ".";
import { Formik } from "formik";
import useModal from "./useModal";
import useAuth from "hooks/useAuth";

export const useRegisterModal = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return {
    isRegisterOpen: isOpen,
    closeRegister: closeModal,
    openRegister: openModal,
  };
};

const RegisterModal: React.FC<ModalProps> = ({ open, onClose, openOther }) => {
  const { register } = useAuth();
  return (
    <Modal open={open} onClose={onClose}>
      <Formik
        initialValues={{ email: "", password: "", name: "" }}
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
          register(values as UserCreateInput, () => setSubmitting(false));
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
            className="container p-4 flex flex-col items-center justify-center text-gray-50 md:w-80"
          >
            <p className="text-lg">Buat Akun Trooops</p>
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
              type="text"
              label="Full Name"
              placeholder="tono subejo"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
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
              Daftar
            </Button>
            <Button
              variant="text"
              className="mt-4 w-full text-gray-50"
              onClick={() => {
                onClose();
                if (openOther) {
                  openOther();
                }
              }}
            >
              Sudah punya akun? Masuk
            </Button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default RegisterModal;
