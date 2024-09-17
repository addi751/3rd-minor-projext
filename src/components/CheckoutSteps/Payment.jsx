import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { processPayment } from '../../redux/slices/paymentSlice';

const Payment = () => {
  const dispatch = useDispatch();
  const paymentStatus = useSelector((state) => state.payment.status);

  const paymentSchema = Yup.object({
    cardNumber: Yup.string().required('Card number is required'),
    cardHolder: Yup.string().required('Cardholder name is required'),
    expirationDate: Yup.string().required('Expiration date is required'),
    cvv: Yup.string().required('CVV is required'),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <Formik
        initialValues={{ cardNumber: '', cardHolder: '', expirationDate: '', cvv: '' }}
        validationSchema={paymentSchema}
        onSubmit={(values) => {
          dispatch(processPayment(values));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="cardNumber">Card Number</label>
              <Field name="cardNumber" type="text" />
              <ErrorMessage name="cardNumber" component="div" />
            </div>

            <div>
              <label htmlFor="cardHolder">Cardholder Name</label>
              <Field name="cardHolder" type="text" />
              <ErrorMessage name="cardHolder" component="div" />
            </div>

            <div>
              <label htmlFor="expirationDate">Expiration Date</label>
              <Field name="expirationDate" type="text" />
              <ErrorMessage name="expirationDate" component="div" />
            </div>

            <div>
              <label htmlFor="cvv">CVV</label>
              <Field name="cvv" type="text" />
              <ErrorMessage name="cvv" component="div" />
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isSubmitting}
            >
              Pay Now
            </button>

            {paymentStatus && <p className="mt-4 text-green-500">{paymentStatus}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Payment;
