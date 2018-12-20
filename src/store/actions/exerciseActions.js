import { GET_EXERCISE } from './types';

export const getExercise = (id) => {
  return {
    type: GET_EXERCISE,
    payload: id,
  };
};
