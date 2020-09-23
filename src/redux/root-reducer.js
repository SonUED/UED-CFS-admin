import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import confessionReducer from "./confession/confession.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["confessions"],
};
const rootReducer = combineReducers({
  cfs: confessionReducer,
});
export default persistReducer(persistConfig, rootReducer);
