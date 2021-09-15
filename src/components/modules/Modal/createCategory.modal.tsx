import Button from "components/elements/Button";
import Input from "components/elements/Form/input";
import Modal from ".";
import useModal from "./useModal";
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

const CreateCategoryModal: React.FC<ModalProps> = ({
  open,
  onClose,
  openOther,
}) => {
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
            className="container p-4 flex flex-col items-center justify-center text-black md:w-80"
          >
            <p className="text-lg">Buat Kategory Baru</p>
            <Input
              type="text"
              label="Category Name"
              placeholder="General"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}
            <Button
              variant="primary"
              className="mt-4 w-full"
              type="submit"
              disabled={isSubmitting}
            >
              Buat Kategori
            </Button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateCategoryModal;
