import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { PayloadAction } from "@reduxjs/toolkit";
interface TriggerState {
  showProfileModel: boolean;
}

const initialState: TriggerState = {
  showProfileModel: false,
};

export const toggleModel = createSlice({
  name: "trigger",
  initialState,
  reducers: {
    toggleProfileModel: (state, action: PayloadAction<boolean | undefined>) => {
      state.showProfileModel =
        action.payload !== undefined ? action.payload : !state.showProfileModel;
    },
  },
});

export const { toggleProfileModel } = toggleModel.actions;

export const selectShowProfileModel = (state: RootState) =>
  state.trigger.showProfileModel;

export default toggleModel.reducer;
