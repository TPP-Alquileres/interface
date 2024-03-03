"use client"

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorAlert from '@/components/ui/error-alert';
import { Api } from '@/javascript/api';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Correo electrónico inválido').required('Requerido'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Requerido'),
});

export default function SignIn() {
  const router = useRouter();
  const [ error, setError ] = useState(null);

  const submitForm = async ( formData ) => {
    const api = new Api();
    try {
      const response = await api.post( { url: '/api/signin', body: formData } );
      localStorage.setItem("currentUser", JSON.stringify(response.user));
      router.push('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  const onCloseErrorAlert = () => {
    setError(null);
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        { !!error && <ErrorAlert error={error} onCloseAlert={onCloseErrorAlert}/> }
        <Formik
          initialValues={ { email: '', password: '' } }
          validationSchema={SigninSchema}
          onSubmit={submitForm}
        >
          {props => (
            <form onSubmit={props.handleSubmit}>
              <>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="email" component="div" />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="password" component="div" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
                >
                  Log In
                </button>
              </>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}