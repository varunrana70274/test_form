import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UpdateHandler } from '../Reducer/Reducer';
import './Output.css'
function Output() {
    let navigate = useNavigate();
    const [customerDetail, setCustomerDetail] = useState([]);
    const dispatch = useDispatch();

    const handleDelete = (id, e) => {
        console.log('id', id);
        e.preventDefault();
        axios.delete(`http://192.168.1.28:5000/customers/${id}`)
            .then(res => {
                const data = res.data;
                console.log('data', data);
                window.location.reload();

            }).catch(error => console.log('error', error))
    };
    const handleEdit = (item) => {
        dispatch(UpdateHandler(true , item))
        navigate('/');
    };
    useEffect(() => {
        axios.get('http://192.168.1.28:5000/customers').then(res => {
            const data = res.data;
            console.log('data', data);
            setCustomerDetail(data);
        }).catch(err => {
            console.log(err);
        })
    }, [])
console.log('customerDetail',customerDetail);
    return (
        <div className='w-full h-screen	 flex justify-center items-center'>
            <div className='w-1/2'>
                <table>
                    <tr>
                        <th>Store Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>CreateDate</th>
                        <th>Action</th>
                    </tr>
                    {customerDetail?.map((item) => (
                        <>
                            <tr key={item.id}>
                                <td>{item.store_id}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.email}</td>
                                <td>{item.created_at}</td>
                                <td>
                                    <button className=" bg-stone-900 text-white ml-8 text-center decoration-0 inline-block text-sm p-2  rounded-md" onClick={() => handleDelete(item)}>Delete</button>
                                    <button className=" bg-stone-900 text-white ml-8 text-center decoration-0 inline-block text-sm p-2 mt-2 rounded-md" onClick={() => handleEdit(item)}>Edit</button>
                                </td>
                            </tr>
                        </>
                    ))}
                </table>
            </div>
        </div>

    );
}

export default Output;
