import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const BillingInfo = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    postalCode: Yup.string().required('Postal Code is required'),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Billing Information</h2>
      <Formik
        initialValues={{ name: '', address: '', city: '', postalCode: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Navigate to order review page after submission
          navigate('/checkout/review');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="address">Address</label>
              <Field name="address" type="text" />
              <ErrorMessage name="address" component="div" />
            </div>

            <div>
              <label htmlFor="city">City</label>
              <Field name="city" type="text" />
              <ErrorMessage name="city" component="div" />
            </div>

            <div>
              <label htmlFor="postalCode">Postal Code</label>
              <Field name="postalCode" type="text" />
              <ErrorMessage name="postalCode" component="div" />
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isSubmitting}
            >
              Continue to Review
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BillingInfo;
