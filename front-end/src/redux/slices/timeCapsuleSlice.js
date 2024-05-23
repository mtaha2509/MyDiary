import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openedCapsules: [],
  activeModal: null, // Store the active modal capsule ID here
};

export const timeCapsuleSlice = createSlice({
  name: "timeCapsule",
  initialState,
  reducers: {
    openCapsule: (state, action) => {
      state.openedCapsules.push(action.payload);
    },
    setActiveModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

export const { openCapsule, setActiveModal, closeModal } =
  timeCapsuleSlice.actions;
export default timeCapsuleSlice.reducer;
