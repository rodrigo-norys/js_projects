import { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/student/actions.js';

import Loading from '../../components/Loading';

export default function Student() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.student.isLoading);

  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  let [age, setAge] = useState('');
  let [weight, setWeight] = useState('');
  let [height, setHeight] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    const age2 = parseInt(age);
    age = age2;

    const weight2 = parseFloat(weight);
    weight = weight2;

    const height2 = parseFloat(height);
    height = height2;

    if (name.length < 3 || name.length > 50) {
      formErrors = true;
      toast.error('Invalid name');
    }
    if (last_name.length < 3 || last_name.length > 50) {
      formErrors = true;
      toast.error('Invalid surname');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Invalid email');
    }
    if (age < 5 || age > 80) {
      formErrors = true;
      toast.error('Invalid age');
    }

    if (Number.isNaN(weight)) {
      formErrors = true;
      toast.error('Invalid weight');
    }

    if (Number.isNaN(height)) {
      formErrors = true;
      toast.error('Invalid height');
    }

    if (formErrors) return;

    dispatch(actions.createStudentRequest({ name, last_name, email, age, weight, height }));
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Student</h1>
      <Form onSubmit={handleSubmit}>
        <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Name' />
        <input type='text' value={last_name} onChange={e => setLastName(e.target.value)} placeholder='Surname' />
        <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
        <input type='number' value={age} onChange={e => setAge(e.target.value)} placeholder='Age' />
        <input type='number' value={weight} onChange={e => setWeight(e.target.value)} placeholder='Weight (Use "." instead "," for decimal numbers)' />
        <input type='number' value={height} onChange={e => setHeight(e.target.value)} placeholder='Height (Use "." instead "," for decimal numbers)' />
        <button type='submit'>Apply</button>
      </Form>
    </Container>
  );
}
