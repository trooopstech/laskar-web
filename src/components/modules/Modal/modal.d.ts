interface ModalProps {
  open: number;
  onClose: () => void;
  openOther?: () => void;
  permanent?: boolean;
  noBg?: boolean;
}
