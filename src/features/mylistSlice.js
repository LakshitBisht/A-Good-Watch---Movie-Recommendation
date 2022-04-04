import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mylist: []
};


export const mylistSlice = createSlice({
  name: 'mylist',
  initialState: initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addToList: (state, action) => {
      state.mylist.push(action.payload);
    },
    
    removeFromList: (state, action) => {
      state.mylist = state.mylist.filter((media => !(media.id === action.payload.id && media.media_type === action.payload.media_type)));
    }
  },
});

export const { addToList, removeFromList } = mylistSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMyList = (state) => state.mylist.mylist;

export default mylistSlice.reducer;
