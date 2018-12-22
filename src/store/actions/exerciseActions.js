import {
  CLEAR_TIMESTAMPS,
  CREATE_EXERCISE,
  INITIALIZE_UNFIXED_MISTAKES,
  UPDATE_MISTAKE_INDEXES,
  UPDATE_TIMESTAMP,
  UPDATE_TYPED_TEXT,
  UPDATE_UNFIXED_MISTAKES,
} from './types';

export const createExercise = (title, text) => {
  return {
    type: CREATE_EXERCISE,
    payload: {
      title,
      text,
    },
  };
};

export const updateTypedText = (text) => {
  return {
    type: UPDATE_TYPED_TEXT,
    payload: text,
  };
};

export const updateMistakeIndexes = (index) => {
  return {
    type: UPDATE_MISTAKE_INDEXES,
    payload: index,
  };
};

export const initializeUnfixedMistakes = (array) => {
  return {
    type: INITIALIZE_UNFIXED_MISTAKES,
    payload: array,
  };
};

export const updateUnfixedMistakes = (index, value) => {
  return {
    type: UPDATE_UNFIXED_MISTAKES,
    payload: {
      index,
      value,
    },
  };
};

export const addTimestamp = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  return {
    type: UPDATE_TIMESTAMP,
    payload: timestamp,
  };
};

export const clearTimestamps = () => {
  return {
    type: CLEAR_TIMESTAMPS,
  };
};

export const initializeExerciseState = (text) => (dispatch) => {
  dispatch(updateTypedText(''));
  dispatch(updateMistakeIndexes([]));
  dispatch(initializeUnfixedMistakes(text.split('').map(() => 0)));
  dispatch(clearTimestamps());
};
