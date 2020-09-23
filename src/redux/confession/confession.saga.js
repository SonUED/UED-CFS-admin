import { call, put, all, takeLatest } from "redux-saga/effects";
import firebase from "../../firebase.utils";
import {
  fetchConfessionSuccess,
  fetchConfessionFailure,
} from "./confesstion.actions";
import ConfessionTypes from "./confession.types";
export function* fetchConfessionAsync() {
  try {
    var data = [];
    yield firebase
      .database()
      .ref("messages")
      .child("coffessions")
      .on("child_added", (snapshot) => {
        snapshot.forEach((snap) => data.push(snap.val()));
      });
    console.log(data);
    yield put(fetchConfessionSuccess(data));
  } catch (error) {
    fetchConfessionFailure(error);
  }
}
function* fetchCollectionStart() {
  yield takeLatest(ConfessionTypes.FECTH_CFS_START, fetchConfessionAsync);
}
export function* confessionSaga() {
  yield all([call(fetchCollectionStart)]);
}
