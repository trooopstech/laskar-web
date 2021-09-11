import Button from "components/elements/Button";
import Input from "components/elements/Form/input";
import Modal from ".";
import useModal from "./useModal";
import { Formik } from "formik";
import useClass from "hooks/useClasses";

export const useJoinClassModal = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return {
    isJoinClassOpen: isOpen,
    closeJoinClass: closeModal,
    openJoinClass: openModal,
  };
};

const JoinClassModal: React.FC<ModalProps> = ({ open, onClose, openOther }) => {
  const { joinByToken } = useClass();
  return (
    <Modal open={open} onClose={onClose}>
      <Formik
        initialValues={{ token: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.token) {
            // @ts-ignore
            errors.token = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await joinByToken(values.token);
          setSubmitting(false);
          onClose();
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
            <p className="text-lg">Gabung Kelas dengan Token</p>
            <Input
              type="text"
              label="Class Token"
              placeholder="XXXXXX"
              name="token"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.token}
            />
            {errors.token && touched.token && errors.token}
            <Button
              variant="primary"
              className="mt-4 w-full"
              type="submit"
              disabled={isSubmitting}
            >
              Gabung
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
              Buat Kelas
            </Button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default JoinClassModal;
