import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
    let navigate = useNavigate();
    const { isUpdate, updateData } = useSelector(state => state.CustomerForms);
    const url = 'http://192.168.1.28:5000/customer';
    const initialState =
    {
        storeId: '',
        firstname: '',
        lastname: '',
        email: '',
        created_at: '',
    }
    const updateDataMaker = () => {
        console.log('updateData', updateData);
        const obj = {
            storeId: updateData?.store_id,
            firstname: updateData?.firstname,
            lastname: updateData?.lastname,
            email: updateData?.email,
            created_at: updateData?.created_at,
        }
        return obj;
    }

    const [customer, setCustomer] = useState(isUpdate ? updateDataMaker() : initialState);

    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(url, {
            customer: {
                "storeId": customer.storeId,
                "firstname": customer.firstname,
                "lastname": customer.lastname,
                "email": customer.email,
                "created_at": customer.created_at,
            }
        })
            .then(res => {
                console.log(res.data)
            })
        setCustomer(initialState);
        alert('added');
        navigate(`OutputPage`);
    };
    const handleReset = () => {
        setCustomer(initialState);
    }
    const handleOutput = () => {
        navigate(`OutputPage`);
    }
    const handleUpdateClick = (e) => {
        e.preventDefault();
        axios.put(`http://192.168.1.28:5000/customers/${updateData?.id}`, {
            customer: {
                "firstname": customer.firstname,
                "lastname": customer.lastname,
                "email": customer.email,
            }
        }).then(res => {
                const data = res.data;
                console.log('data', data);
                setCustomer(initialState);
                navigate(`OutputPage`);
                // dispatch(UpdateHandler(false, {}));
            }).catch(error => console.log('error', error))
    };
    return (
        <div className="flex justify-center	h-screen items-center	">
            <div className="mt-5 md:col-span-2 md:mt-0 w-2/6" >
                <form>
                    <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                            <h1 className="font-bold text-xl italic">Customer Detail</h1>
                            <hr className="col-span-6 sm:col-span-6 mb-3" />
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-6">
                                    <label className=" text-md font-medium text-gray-700 pr-8">Store ID : </label>
                                    <input onChange={handleChange} placeholder='Enter Store Id' value={customer.storeId} type="text" name="storeId" className="mt-1 w-4/5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 ml-0.5 focus:ring-indigo-500 md:text-md border-2 pl-0.5" />
                                </div>
                                <div className="col-span-6 sm:col-span-6">
                                    <label className=" text-md font-medium text-gray-700 pr-5">First Name :</label>
                                    <input onChange={handleChange} placeholder='Enter First Name' value={customer.firstname} type="text" name="firstname" className="mt-1 w-4/5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 md:text-md border-2 pl-0.5" />
                                </div>
                                <div className="col-span-6 sm:col-span-6">
                                    <label className=" text-md font-medium text-gray-700 pr-5">Last Name :</label>
                                    <input onChange={handleChange} placeholder='Enter Last Name' value={customer.lastname} type="text" name="lastname" className="mt-1 w-4/5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 ml-0.5 focus:ring-indigo-500 md:text-md border-2 pl-0.5" />
                                </div>
                                <div className="col-span-6 sm:col-span-6">
                                    <label className=" text-md font-medium text-gray-700 pr-14">Email :</label>
                                    <input onChange={handleChange} placeholder='Enter Email' value={customer.email} type="text" name="email" className="mt-1 w-4/5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ml-0.5 md:text-md border-2 pl-0.5" />
                                </div>
                                <div className="col-span-6 sm:col-span-6">
                                    <label className=" text-md font-medium text-gray-700 pr-14">Date :</label>
                                    <input onChange={handleChange} placeholder='Enter Date' value={customer.created_at} type="date" name="created_at" className="mt-1 w-4/5 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ml-0.5 md:text-md border-2 pl-0.5" />
                                </div>
                                <hr className="col-span-6 sm:col-span-6" />
                                <div className="col-span-6 sm:col-span-6">
                                    {!isUpdate ?
                                        <button className=" bg-stone-900 text-white ml-8 text-center decoration-0 inline-block text-sm p-3  rounded-md" onClick={handleSubmit}>Submit</button>
                                        :
                                        <button className=" bg-stone-900 text-white ml-8 text-center decoration-0 inline-block text-sm p-3  rounded-md" onClick={handleUpdateClick}>Update</button>
                                    }
                                    <button className=" bg-stone-900 ml-40 text-white text-center decoration-0 inline-block text-sm p-3  rounded-md" onClick={handleReset}>Reset</button>
                                    <button className=" bg-stone-900 text-white ml-40 text-center decoration-0 inline-block text-sm p-3  rounded-md" onClick={handleOutput}>Output</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Home;
