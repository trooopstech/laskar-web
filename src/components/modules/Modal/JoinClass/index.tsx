import Button from "components/elements/Button";
import Input from "components/elements/Form/input";
import Modal from "..";
import useModal from "../useModal";
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
            className="container p-4 flex flex-col items-center justify-center text-gray-50 md:w-120"
          >
            <p className="text-xl font-bold">Gabung Kelas</p>
            <Input
              type="text"
              label="Kode Kelas"
              placeholder="XXXXXX"
              name="token"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.token}
              error={errors.token}
            />
            <span className="text-xs font-thin">
              Gunakan kode kelas berupa 5-7 huruf atau angka, tanpa spasi maupun
              simbol
            </span>
            <div className="w-full flex justify-end mt-4">
              <Button
                variant="text"
                className="mr-2 text-gray-500 hover:text-gray-50"
                onClick={() => {
                  onClose();
                  if (openOther) {
                    openOther();
                  }
                }}
              >
                Buat Kelas
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Gabung
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default JoinClassModal;
