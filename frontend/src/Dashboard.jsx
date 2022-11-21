import React, { useEffect } from 'react';
import "./Dashboard.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAllUsers } from "./actions/userActions";
import { Link } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {

    const dispatch = useDispatch();

    const { error, users } = useSelector(
        (state) => state.allUsers
    );


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            }
        },
    };

    const labels = [];
    users.map(user => labels.push(user.name));

    const sales = [];
    users.map(user => sales.push(user.totalSales));

    const data = {
        labels,
        datasets: [
            {
                label: 'Sales Values',
                data: sales,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    useEffect(() => {
        if (error) {
            console.log(error);
            dispatch(clearErrors);
        }
        dispatch(getAllUsers());
    }, [dispatch, error]);

    return (
        <div className='dashboard-container'>
            <h1 className='heading'>Welcome to Dashboard</h1>
            <div className='dashboard'>
                <Bar options={options} data={data} />
            </div>
            <Link to='/' className="btn btn-primary">Back</Link>
        </div>
    )
}

export default Dashboard
