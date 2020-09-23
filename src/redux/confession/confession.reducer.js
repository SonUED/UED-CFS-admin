import ConfessionTypes from "./confession.types";
const INITIAL_STATE = {
  confessions: null,
  isFetching: false,
};
const confessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ConfessionTypes.FECTH_CFS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ConfessionTypes.FECTH_CFS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        confessions: action.payload,
      };
    case ConfessionTypes.FECTH_CFS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default confessionReducer;
