import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from './components/Button';
import Input from './components/Input';
import Container from './components/Container';
import Section from './components/Section';
import { useState } from 'react';
import Balance from './components/Balance';

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit;
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (1 + rate);
  }

  return Math.round(total);
}


function App() {

  const [balance, setBalance] = useState('');

  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate));
    setBalance(formatter.format(val));
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return (
    <Container >
      <Section>
        <Formik initialValues={ {
          deposit: '',
          contribution: '',
          years: '',
          rate: '',
        } }
          onSubmit={ handleSubmit }
          validationSchema={ Yup.object({
            deposit: Yup.number().required('Required').typeError('Must be a number'),
            contribution: Yup.number().required('Required'),
            years: Yup.number().required('Required'),
            rate: Yup.number().required('Required').min(0, 'Must be greater than 0').max(1, 'Must be less than 1'),
          }) }
        >
          <Form>
            <Input name='deposit' label='Depósito inicial' />
            <Input name='contribution' label='Contribución anual' />
            <Input name='years' label='Año' />
            <Input name='rate' label='Interés estimado' />
            <Button type='submit'> Calcular </Button>
          </Form>
        </Formik>
        {
          balance !== '' ? <Balance > Balance final: { balance } </Balance> : null
        }
      </Section>
    </Container>
  );
}

export default App;
