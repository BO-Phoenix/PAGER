// import { createSlice } from '@reduxjs/toolkit';
// import { getAllEvents, getUserGroups } from '../actions';

// // action updates the state, state gets sent back

// // initial state is basically whats in the useState
// // reducer acts setUsers
// // users is the state
// // const [users, setUsers] = useState([]);

// const initialState = {
//   allEvents: [],
//   allUserGroups: [],
// };

// // combination of actions and reducers
// const dataSlice = createSlice({
//   name: 'pager-data',
//   initialState,
//   reducers: {
//     //
//   },
//   extraReducers: (builder) => { // only for async things
//     builder
//       .addCase(getAllEvents.fullfilled, (state, action) => {
//         state.allEvents = action.payload;
//       })
//       .addCase(getAllEvents.rejected, (state, action) => {
//         state.allEvents = [];
//         console.log('all events rejected');
//       })
//       .addCase(getUserGroups.fullfilled, (state, action) => {
//         state.allEvents = action.payload;
//       })
//       .addCase(getUserGroups.rejected, (state, action) => {
//         state.allEvents = [];
//         console.log('all user groups rejected');
//       })
//   },
// });

// // export const {  } = dataSlice.actions;

// export default dataSlice.reducer; // dispatch actions on front end and getData gets invoked as a callback