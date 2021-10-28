import Button from "components/elements/Button";
import Input from "components/elements/Form/input";
import Modal from "..";
import useModal from "../useModal";
import { Formik } from "formik";
import useClass from "hooks/useClasses";

interface FormSectionProps extends ModalProps {
  purpose: string;
  setPurpose: (value: string) => void;
}
const FormSection: React.FC<FormSectionProps> = ({
  open,
  onClose,
  setPurpose,
  purpose,
}) => {
  const { createClass } = useClass();

  return (
    <Formik
      initialValues={{ name: "", description: "", institution: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          // @ts-ignore
          errors.name = "Required";
        }
        if (!values.institution) {
          // @ts-ignore
          errors.institution = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const callback = () => {
          setSubmitting(false);
          setPurpose("");
          onClose();
        };
        // @ts-ignore
        createClass({ ...values, purposes: purpose } as CreateClassInput, () =>
          callback()
        );
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
          className="container p-4 flex flex-col items-center justify-center md:w-120"
        >
          <p className="text-lg">Buat Kelas Baru</p>
          <Input
            type="text"
            label="Nama Kelas"
            placeholder="Analisis Numerik"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={errors.name}
          />
          <Input
            type="text"
            label="Nama Institusi"
            placeholder="Nama Institusi"
            name="institution"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.institution}
            error={errors.institution}
          />
          <Input
            type="text"
            label="Deskripsi (optional)"
            placeholder="Deskripsi Kelas"
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          />
          <div className="w-full flex justify-end items-center mt-4">
            <Button
              variant="text"
              className="text-gray-500 hover:text-gray-50"
              onClick={() => {
                setPurpose("");
              }}
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
  );
};

export default FormSection;
