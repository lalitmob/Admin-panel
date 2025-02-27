import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { PayloadAction } from "@reduxjs/toolkit";
interface userState {
  token: string;
  userInfo: Record<string, any>;
}

const initialState: userState = {
  token: "",
  userInfo: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    userInformation: (state, action: PayloadAction<object | any>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { userToken, userInformation } = userSlice.actions;

export const userTokenSlice = (state: RootState) => state.user.token;
export const userInfoSlice = (state: RootState) => state.user.userInfo;

export default userSlice.reducer;
