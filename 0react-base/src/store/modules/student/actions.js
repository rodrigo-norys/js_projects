import * as types from './types';

// GET STUDENTS
export function getStudentsRequest() {
  return {
    type: types.GET_STUDENTS_REQUEST,
  };
}

export function getStudentsSuccess(students) {
  return {
    type: types.GET_STUDENTS_SUCCESS,
    payload: students,
  };
}

export function getStudentsFailure() {
  return {
    type: types.GET_STUDENTS_FAILURE,
  };
}

// DELETE STUDENT
export function deleteRequest(id) {
  return {
    type: types.DELETE_STUDENT_REQUEST,
    payload: id,
  };
}

export function deleteSuccess(id) {
  return {
    type: types.DELETE_STUDENT_SUCCESS,
    payload: id,
  };
}

export function deleteFailure(id) {
  return {
    type: types.DELETE_STUDENT_FAILURE,
    payload: id,
  };
}
