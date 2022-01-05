import { configureStore } from '@reduxjs/toolkit';
import consentReducer from '../features/consent/consentsSlice'

export const store = configureStore({
  reducer: {
    consents: consentReducer,
  },
});
