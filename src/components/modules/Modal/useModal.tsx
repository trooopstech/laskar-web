import { useState } from "react";

const useModal = () => {
  const [isOpen, setOpen] = useState<number>(0);

  const closeModal = () => {
    setOpen(0);
  };

  const openModal = () => {
    setOpen(1);
  };

  return { isOpen, closeModal, openModal };
};

export default useModal;
