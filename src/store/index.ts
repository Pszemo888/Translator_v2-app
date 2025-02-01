// src/store/index.ts
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { adminReducer } from "./adminReducer"; // nasz custom reducer

// Łączymy ewentualnie kilka reducerów w rootReducer
const rootReducer = combineReducers({
  admin: adminReducer,
  // ... inne reducery w razie potrzeby
});

// Tworzymy store
const store = createStore(rootReducer);

export default store;
