import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from './types';
import axios from '../../../services/axios';

function* getStudents() {
  try {
    const response = yield call(axios.get, '/students');
    yield put(actions.getStudentsSuccess(response.data.allStudents));
  } catch (err) {
    yield put(actions.getStudentsFailure());
  }
}

function* deleteRequest({ payload }) {
  const id = payload;
  try {
    if (id) {
      yield call(axios.delete, `students/${id}`)
      yield put(actions.deleteSuccess(id));
      toast.success('Successfully student deleted');
    }
  } catch (err) {
    const errors = get(err, 'response.data.errors', []);
    errors.map(error => toast.error(error));

    yield put(actions.deleteFailure());
  }
}

export default all([
  takeLatest(types.GET_STUDENTS_REQUEST, getStudents),
  takeLatest(types.DELETE_STUDENT_REQUEST, deleteRequest),
]);
