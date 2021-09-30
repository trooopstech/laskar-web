import Button from "components/elements/Button";
import Input from "components/elements/Form/input";
import Modal from ".";
import useModal from "./useModal";
import { Formik } from "formik";
import useClassDetail from "hooks/useDetailClass";
import { useParams } from "react-router";
import Select from "components/elements/Form/select";

export const useCreateChannelModal = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return {
    isChannelOpen: isOpen,
    closeChannel: closeModal,
    openChannel: openModal,
  };
};

interface CreateChannelModalProps extends ModalProps {
  data: { [key: string]: string };
}

const CreateChannelModal: React.FC<CreateChannelModalProps> = ({
  open,
  onClose,
  openOther,
  data,
}) => {
  const { createChannel } = useClassDetail();
  // @ts-ignore
  const { classId } = useParams();

  return (
    <Modal open={open} onClose={onClose}>
      <Formik
        initialValues={{ name: "", channel_type: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            // @ts-ignore
            errors.name = "Required";
          }
          if (!values.channel_type || values.channel_type === "") {
            // @ts-ignore
            errors.channel_type = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await createChannel({
            ...values,
            class_id: classId,
            channel_type: values.channel_type as unknown as ChannelType,
            channel_category_id: data.categoryId,
          });
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
            className="container p-4 flex flex-col items-center justify-center text-gray-50 md:w-80"
          >
            <p className="text-lg">Buat Channel Baru</p>
            <Input
              type="text"
              label="Channel Name"
              placeholder="General"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}
            <Select
              label="Tipe Channel"
              name="channel_type"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.channel_type}
              option={[
                { key: "", value: "Pilih Channel" },
                { key: "CHAT", value: "Chat" },
                { key: "QNA", value: "QnA" },
              ]}
            />
            {errors.channel_type && touched.channel_type && errors.channel_type}
            <Button
              variant="primary"
              className="mt-4 w-full"
              type="submit"
              disabled={isSubmitting}
            >
              Buat Channel
            </Button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateChannelModal;
