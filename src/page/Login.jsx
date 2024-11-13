import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const defaultValue = {
        name: "",
        email: ""
    };
    
    const validationSchema = yup.object().shape({
        name: yup.string().required("Please Enter your Name"),
        email: yup.string().required("Please Enter your Email").email("Enter valid EMAIL format")
    });
    
    const handlesubmit = (values) => {
        console.log("values", values);
        navigate("/Card");
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6">
            <div className="w-full max-w-md p-8 bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4 drop-shadow-md">
                    Shopify Store
                </h1>
                <h2 className="text-2xl font-medium text-center text-gray-700 mb-10">Login</h2>
                <Formik
                    initialValues={defaultValue}
                    validationSchema={validationSchema}
                    onSubmit={handlesubmit}
                >
                    <Form className="space-y-6">
                        <div>
                            <Field
                                type="text"
                                name="name"
                                placeholder="Enter your Name"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                            />
                            <p className="text-red-500 text-sm mt-1">
                                <ErrorMessage name="name" />
                            </p>
                        </div>
                        
                        <div>
                            <Field
                                type="text"
                                name="email"
                                placeholder="Enter your Email"
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                            />
                            <p className="text-red-500 text-sm mt-1">
                                <ErrorMessage name="email" />
                            </p>
                        </div>

                        <div className="flex flex-col items-center space-y-4">
                            <button
                                type="submit"
                                className="w-full py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={handleSignup}
                                className="w-full py-3 text-purple-600 bg-white border border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white font-semibold shadow-md transition-transform transform hover:scale-105"
                            >
                                Signup
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Login;
