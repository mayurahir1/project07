
import { React, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';



export default function Signup() {
    const [data, setData] = useState([])
    const [id, setId] = useState()

    useEffect(() => {
        if (localStorage.getItem('formData')) {
            let newData = JSON.parse(localStorage.getItem('formData'))
            setData(newData)
        }


        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => console.log(json))

    }, [])

    // axios.get('https://reqres.in/api/users?page=2')
    //     .then((response) => {
    //         // handle success
    //         console.log(response.data.data);
    //     })
    //     .catch((error) => {
    //         // handle error
    //         console.log(error);
    //     })



    // const initialValues = {
    //         firstName: '',
    //         lastName: '',
    //         email: '',
    //         password: '',
    //         confirmPassword: '',
    //         id: Date.now(),
    // };

    const selectedRowDataString = localStorage.getItem("selectedRowData");
    const selectedRowData = selectedRowDataString ? JSON.parse(selectedRowDataString) : null;

    const initialValues = {
        firstName: selectedRowData?.firstName || '', // Use the value from selectedRowData or an empty string if not available
        lastName: selectedRowData?.lastName || '',
        email: selectedRowData?.email || '',
        password: selectedRowData?.password || '',
        confirmPassword: selectedRowData?.confirmPassword || '',
        id: selectedRowData?.id || Date.now(),
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required').matches(/^[^0-9]+$/, 'First name cannot contain numbers'),
        lastName: Yup.string().required('Last name is required').matches(/^[^0-9]+$/, 'Last name cannot contain numbers'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(3, 'Password must be at least 3 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });
    const isEmailAndUsernameUnique = (Email) => {
        return !data.some((item) => item.email === Email);
    };

    const handleData = (values) => {
        setData([...data, values])
        localStorage.setItem("formData", JSON.stringify([...data, values]));
    }

    const onSubmit = (values, { resetForm }) => {
        const { email, firstName, lastName } = values;

        if (!isEmailAndUsernameUnique(email, firstName, lastName)) {
            alert('Email or username already exists. Please use a different one.');
            resetForm();
            return;
        }

        let updatedData = [];

        if (selectedRowData) {
            updatedData = data.map((item) => {
                if (item.id === selectedRowData?.id) {
                    return { ...item, ...values };
                }
                return item;
            });
            setData(updatedData);
            localStorage.setItem("formData", JSON.stringify(updatedData));
        } else {
            handleData(values);
        }

        if (selectedRowData) {
            localStorage.removeItem("selectedRowData");
        }
        resetForm();
        window.location.href = './Table';
    };





    return (
        <div style={{ marginTop: '50px' }}>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
                {({ isSubmitting }) => (
                    <Form style={{ textAlign: 'center' }}>
                        <h1>REGISTER EMPLOYEE</h1>
                        <div>
                            <label htmlFor="firstName">First Name::</label>
                            <Field type="text" id="firstName" name="firstName" />
                            <ErrorMessage name="firstName" component="div" className="error" />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name::</label>
                            <Field type="text" id="lastName" name="lastName" />
                            <ErrorMessage name="lastName" component="div" className="error" />
                        </div>
                        <div>
                            <label htmlFor="email">Email::</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>
                        <div>
                            <label htmlFor="password">Password::</label>
                            <Field type="password" id="password" name="password" />
                            <ErrorMessage name="password" component="div" className="error" />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password::</label>
                            <Field type="password" id="confirmPassword" name="confirmPassword" />
                            <ErrorMessage name="confirmPassword" component="div" className="error" />
                        </div>
                        <button type="submit" >

                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
