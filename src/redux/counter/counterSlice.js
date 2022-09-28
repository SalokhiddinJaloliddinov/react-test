import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 90;
    },
    decrement: (state) => {
      state.value -= 90;
    },
    incrementByAmount: (state, action) => {
      console.log((state.value += action.payload));
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
