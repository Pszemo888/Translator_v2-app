import { createStore, combineReducers } from "redux";
import { adminReducer } from "./adminReducer"; 


const rootReducer = combineReducers({
  admin: adminReducer,
});

const store = createStore(rootReducer);

export default store;
