"use client";

import { Ichildren } from '@/types/children';
import { Provider } from 'react-redux'
import { ReduxStore } from './store';
export const ReduxProvider : React.FC <Ichildren> = ({children}) => {

    return <Provider store={ReduxStore}>{children}</Provider>}
