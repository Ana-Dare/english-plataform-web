export type ToasVariants = "success" | "error" | "info" | "warning";

export interface IToast {
  id: string;
  message: string;
  title?: string;
  type: ToasVariants;
  duration?: number;
  isClosable?: boolean;
}
