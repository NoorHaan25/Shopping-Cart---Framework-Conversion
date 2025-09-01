import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    option: "searchTitle", // default search by title
    term: "",// default search term is empty
  },
  reducers: {
    setOption: (state, action) => { //update search option like title or category
      state.option = action.payload;
    },
    setTerm: (state, action) => { //update search term
      state.term = action.payload;
    },
    resetSearch: (state) => { // reset search to default values
      state.option = "searchTitle";
      state.term = "";
    },
  },
});

export const { setOption, setTerm, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
