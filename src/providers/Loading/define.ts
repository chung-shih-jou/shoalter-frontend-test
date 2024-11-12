import { LoadingContextInterface } from './interface';

export const DefaultLoadingState = {
  open: () => {},
  close: () => {},
  toggle: () => {},
  withLoading: () => {},
  isOpen: false
} as LoadingContextInterface;
