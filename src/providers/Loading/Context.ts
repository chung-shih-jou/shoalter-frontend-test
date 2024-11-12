import { createContext } from 'react';

import { LoadingContextInterface } from './interface';
import { DefaultLoadingState } from './define';

type ContextType = LoadingContextInterface;

export const Context = createContext<ContextType>(DefaultLoadingState);

export default Context;
