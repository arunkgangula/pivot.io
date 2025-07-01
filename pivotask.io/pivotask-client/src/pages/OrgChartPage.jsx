
// src/pages/OrgChartPage.jsx
import React, { useState, useEffect } from 'react';
import * as api from '../api/api.js';
import { useAuth } from '../context/AuthContext';
import OrgChartNode from '../components/OrgChartNode';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

const OrgChartPage = () => {
    const [chartData, setChartData] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        api.getOrgChart().then(res => setChartData(res.data));
    }, []);

    // This page will render the chart inside a modal for a consistent UX with the original app
    return (
        <Modal title="Organizational Chart" closeModal={() => navigate(-1)}>
            <div className="p-6 overflow-auto org-chart">
                {chartData ? (
                    <ul>
                        <OrgChartNode node={chartData} highlightedUserId={user.id} />
                    </ul>
                ) : (
                    <p>Loading chart...</p>
                )}
            </div>
        </Modal>
    );
};
export default OrgChartPage;