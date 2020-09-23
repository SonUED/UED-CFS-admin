import { call, all } from "redux-saga/effects";
import { confessionSaga } from "./confession/confession.saga";
export default function* rootSaga() {
  yield all([call(confessionSaga)]);
}
