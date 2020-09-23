import ConfessionTypes from "./confession.types";
export const fetchConfessionStart = () => ({
  type: ConfessionTypes.FECTH_CFS_START,
});
export const fetchConfessionSuccess = (confessions) => ({
  type: ConfessionTypes.FECTH_CFS_SUCCESS,
  payload: confessions,
});
export const fetchConfessionFailure = (error) => ({
  type: ConfessionTypes.FECTH_CFS_FAILURE,
  payload: error,
});
