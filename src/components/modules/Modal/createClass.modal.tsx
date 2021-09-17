import Button from "components/elements/Button";
import Input from "components/elements/Form/input";
import Modal from ".";
import useModal from "./useModal";
import { Formik } from "formik";
import useClass from "hooks/useClasses";

export const useCreateClassModal = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return {
    isCreateClassOpen: isOpen,
    closeCreateClass: closeModal,
    openCreateClass: openModal,
  };
};

const CreateClassModal: React.FC<ModalProps> = ({
  open,
  onClose,
  openOther,
}) => {
  const { createClass } = useClass();

  return (
    <Modal open={open} onClose={onClose}>
      <Formik
        initialValues={{ name: "", description: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            // @ts-ignore
            errors.email = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const callback = () => {
            setSubmitting(false);
            onClose();
          };
          // @ts-ignore
          createClass(values as CreateClassInput, () => callback());
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
            <p className="text-lg">Buat Kelas Baru</p>
            <Input
              type="text"
              label="Class Name"
              placeholder="Analisis Numerik"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}
            <Input
              type="text"
              label="Description"
              placeholder="Deskripsi Kelas ...."
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            <Button
              variant="primary"
              className="mt-4 w-full"
              type="submit"
              disabled={isSubmitting}
            >
              Buat Kelas
            </Button>
            <Button
              variant="text"
              className="mt=4 w-full text-gray-400"
              onClick={() => {
                onClose();
                if (openOther) {
                  openOther();
                }
              }}
            >
              Gabung Kelas
            </Button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateClassModal;
