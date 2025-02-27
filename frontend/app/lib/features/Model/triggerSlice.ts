import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { PayloadAction } from "@reduxjs/toolkit";
interface TriggerState {
  showProfileModel: boolean;
  selectOption: string | null;
  sidebarOptions: string | null;
}

const initialState: TriggerState = {
  showProfileModel: false,
  selectOption: null,
  sidebarOptions: null,
};

export const toggleModel = createSlice({
  name: "trigger",
  initialState,
  reducers: {
    toggleProfileModel: (state, action: PayloadAction<boolean>) => {
      state.showProfileModel = action.payload
    },
    userModelTrigger: (state, action: PayloadAction<string>) => {
      state.selectOption = action.payload;
    },
    sidebaroptionsTrigger: (state, action: PayloadAction<string>) => {
      state.sidebarOptions = action.payload;
    },
  },
});

export const { toggleProfileModel, userModelTrigger,sidebaroptionsTrigger } = toggleModel.actions;

export const selectShowProfileModel = (state: RootState) =>
  state.trigger.showProfileModel;
export const selectUserOption = (state: RootState) =>
  state.trigger.selectOption;
export const selectSidebarOptions = (state: RootState) =>
  state.trigger.sidebarOptions;
export default toggleModel.reducer;
