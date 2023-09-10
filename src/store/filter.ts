import { createAsyncThunk } from "@reduxjs/toolkit"

interface FilterStudent {
  // define type later
  lstGrade: any[],
  lstClass: any[],
}

const initialState = {
  lstGrade: [],
  lstClass: []
}

// export const getLstUnitAsync = createAsyncThunk('filter/getUnit', async (unitId: string) => {
//   return await 
// })
