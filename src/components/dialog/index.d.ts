type closeFn = (isConfirm: boolean) => void;
export type dialogPropsType = {
  visible: boolean;
  title?: string;
  hideTitle?: boolean;
  hideFooter?: boolean;
  closeDialog?: closeFn;
};
