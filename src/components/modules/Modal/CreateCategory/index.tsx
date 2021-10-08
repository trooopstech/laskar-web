import Button from "components/elements/Button";
import Input from "components/elements/Form/input";
import Modal from "..";
import useModal from "../useModal";
import { Formik } from "formik";
import useClassDetail from "hooks/useDetailClass";
import { useParams } from "react-router";

export const useCreateCategoryModal = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return {
    isCategoryOpen: isOpen,
    closeCategory: closeModal,
    openCategory: openModal,
  };
};

const CreateCategoryModal: React.FC<ModalProps> = ({ open, onClose }) => {
  const { createCategoryChannel } = useClassDetail();
  // @ts-ignore
  const { classId } = useParams();

  return (
    <Modal open={open} onClose={onClose}>
      <Formik
        initialValues={{ name: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            // @ts-ignore
            errors.className = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await createCategoryChannel({ ...values, class_id: classId });
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
            <p className="text-xl font-bold mb-4">Buat Kategori</p>
            <Input
              type="text"
              label="Nama Kategori"
              placeholder="General"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}
            <div className="w-full flex justify-end">
              <Button
                className="text-gray-500 hover:text-gray-50"
                onClick={onClose}
              >
                Batal
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Buat
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateCategoryModal;
