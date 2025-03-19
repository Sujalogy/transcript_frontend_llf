// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { storiesSlice } from './storiesSlice';
import authreducer from './authSlice';

export const store = configureStore({
  reducer: {
    storiesSlice: storiesSlice.reducer,
    auth: authreducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Example usage:
/*
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <YourComponents />
    </Provider>
  );
}
*/