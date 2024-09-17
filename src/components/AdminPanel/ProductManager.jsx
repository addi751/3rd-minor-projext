import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, deleteProduct } from '../../redux/slices/productSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProductManager = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const productSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    price: Yup.number().required('Price is required'),
    description: Yup.string().required('Description is required'),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded bg-white">
            <h3 className="font-bold">{product.name}</h3>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <button className="text-red-500 mt-2" onClick={() => handleDelete(product.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-6">Add/Update Product</h3>
      <Formik
        initialValues={{ name: '', price: '', description: '' }}
        validationSchema={productSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(addProduct(values));
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Product Name</label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <Field name="price" type="text" />
              <ErrorMessage name="price" component="div" />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <Field name="description" type="text" />
              <ErrorMessage name="description" component="div" />
            </div>

            <button
              type="submit"
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductManager;
