import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersDB from '../firebase/firestoreDB';

// User
export const createUserDB = createAsyncThunk(
  'user/createUserDB',
  async (email) => {
    return await usersDB.create(email);
  });
export const updateUserDB = createAsyncThunk(
  'user/updateUserDB',
  async ({email,newEmail},{getState}) => {
    const state = getState();
    return await usersDB.copy(newEmail, state.user.mylist, state.user.history)
    .then(async() => {
      await usersDB.delete(email);
    });
  });
export const deleteUserDB = createAsyncThunk(
  'user/deleteUserDB',
  async (email) => {
    return await usersDB.delete(email);
  });

export const getUserDataDB = createAsyncThunk(
  'user/getUserDataDB',
  async (email) => {
    const result =  await usersDB.initialize(email);
    return result.data();
  });

  // Mylist
  export const addMyListDB = createAsyncThunk(
    'user/addMyListDB',
    async ({media,email}) => {
      await usersDB.insertMyList(email,media);
      return media;
    });
  
  export const removeMyListDB = createAsyncThunk(
    'user/removeMyListDB',
    async ({media,email}) => {
      await usersDB.removeMyList(email,media);
      return media;
    });

  // History
  export const addHistoryDB = createAsyncThunk(
    'user/addHistoryDB',
    async ({media,email}) => {
      await usersDB.insertHistory(email,media);
      return media;
    });
  
  export const removeHistoryDB = createAsyncThunk(
    'user/removeHistoryDB',
    async ({media,email}) => {
      await usersDB.removeHistory(email,media);
      return media;
    });

  export const clearHistoryDB = createAsyncThunk(
    'user/clearHistoryDB',
    async ({media,email}) => {
      await usersDB.clearHistory(email);
      return media;
    });


const initialState = {
  user: null,
  mylist: [],
  history: []
};


export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    
    logout: (state,) => {
      state.user = null;
    }
  },

  extraReducers: {
    // User
    [getUserDataDB.fulfilled]: (state, action) => {
      state.mylist = action.payload?.mylist? action.payload.mylist : [];
      state.history = action.payload?.history? action.payload.history.reverse() : [];
    },
    // Mylist
    [addMyListDB.fulfilled]: (state, action) => {
      state.mylist.push(action.payload);
    },
    [removeMyListDB.fulfilled]: (state, action) => {
      state.mylist = state.mylist.filter((media => !(media.id === action.payload.id && media.media_type === action.payload.media_type)));
    },
    // History
    [addHistoryDB.fulfilled]: (state, action) => {
      state.history.unshift(action.payload);
    },
    [removeHistoryDB.fulfilled]: (state, action) => {
      state.history = state.history.filter((media => !(media.id === action.payload.id && media.media_type === action.payload.media_type)));
    },
    [clearHistoryDB.fulfilled]: (state) => {
      state.history = [];
    }
  }
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectMyList = (state) => state.user.mylist;
export const selectHistory = (state) => state.user.history;

export default userSlice.reducer;
