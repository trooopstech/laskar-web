import Button from "components/elements/Button";
import Input from "components/elements/Form/input";
import Modal from "..";
import useModal from "../useModal";
import { Formik } from "formik";
import useClassDetail from "hooks/useDetailClass";
import { useParams } from "react-router";
import Select from "components/elements/Form/select";
import { FaHashtag, FaLock, FaQuestion } from "react-icons/fa";
import { BiLockAlt } from "react-icons/bi";
import Switch from "components/elements/Form/switch";
import { useEffect, useState } from "react";

export const useCreateChannelModal = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return {
    isChannelOpen: isOpen,
    closeChannel: closeModal,
    openChannel: openModal,
  };
};

interface CreateChannelModalProps extends Omit<ModalProps, "openOther"> {
  data: { [key: string]: string };
  openOther: (channel: Channel) => void;
}

const ChannelTypeChoice = ({
  value,
  description,
  icon,
  active,
  setActive,
}: {
  value: { [key: string]: string };
  description: string;
  icon: JSX.Element;
  active: boolean;
  setActive: (active: string) => void;
}) => {
  return (
    <div
      className={`rounded-lg w-full px-4 py-2 flex hover:bg-gray-600 items-center my-2 cursor-pointer ${
        active ? "bg-gray-600" : "bg-gray-700"
      }`}
      onClick={() => setActive(value.key)}
    >
      <div className="w-8">
        <div
          className={`w-3 h-3 rounded-full border-2 border-gray-50 ${
            active && "bg-gray-50"
          }`}
        />
      </div>
      {icon}
      <div className="w-full flex flex-col ml-2">
        <h1 className="text-base font-thin">{value.value}</h1>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
};

const CreateChannelModal: React.FC<CreateChannelModalProps> = ({
  open,
  onClose,
  openOther,
  data,
}) => {
  const { createChannel, getUserClassMember } = useClassDetail();
  // @ts-ignore
  const { classId } = useParams();
  const member = getUserClassMember();
  const [privates, setPrivate] = useState(false);
  const [choice, setChoice] = useState("CHAT");

  useEffect(() => {
    if (choice === "QNA") {
      setPrivate(false);
    }
  }, [choice]);

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
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const newChannel = await createChannel({
            ...values,
            class_id: classId,
            channel_type: choice as unknown as ChannelType,
            channel_category_id: data.categoryId,
            is_private: privates,
            oid: member.oid,
          });
          setSubmitting(false);

          if (privates && openOther) {
            openOther(newChannel);
            setPrivate(false);
          }

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
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl font-bold">Buat Channel</h1>
              <p className="text-xs text-gray-500 font-thin">
                Buat Channel di {data.name.toUpperCase()}
              </p>
            </div>
            <div className="w-full">
              <ChannelTypeChoice
                icon={<FaHashtag className="text-2xl font-bold" />}
                value={{ key: "CHAT", value: "Chat" }}
                description="Diskusi, Ngobrol, Kirim Foto dan File"
                active={choice === "CHAT"}
                setActive={setChoice}
              />
              <ChannelTypeChoice
                icon={<FaQuestion className="text-2xl font-bold" />}
                value={{ key: "QNA", value: "QnA" }}
                description="Tanya dan Jawab"
                active={choice === "QNA"}
                setActive={setChoice}
              />
            </div>
            <Input
              type="text"
              label="Nama Channel"
              placeholder="General"
              name="name"
              startAddorment={
                choice === "QNA" ? (
                  <FaQuestion className="font-bold text-xl" />
                ) : (
                  <FaHashtag className="font-bold text-xl" />
                )
              }
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}
            {choice !== "QNA" && (
              <div className="w-full flex justify-between">
                <div className="flex flex-col justify-start">
                  <div className="flex items-start">
                    <BiLockAlt className="font-bolder mr-1 text-xl" />
                    <h1 className="font-bold">Mode Private</h1>
                  </div>
                  <p className="font-thin text-xs">
                    Gunakan mode private apabila channel hanya ingin diakses
                    beberapa member
                  </p>
                </div>
                <Switch checked={privates} setChecked={setPrivate} />
              </div>
            )}
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
