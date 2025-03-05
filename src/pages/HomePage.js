import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; 
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const HomePage = () => {
  const [treatments, setTreatments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const [insuranceSearchTerm, setInsuranceSearchTerm] = useState('');
  const [showInsuranceChart, setShowInsuranceChart] = useState(false);
  const [showHospitalChart, setShowHospitalChart] = useState(false);
  const [hospitalData, setHospitalData] = useState([]);
  const { user } = useAuth();
  const isLoggedIn = !!user;

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3232/treatments');
          setTreatments(response.data);
        } catch (error) {
          console.error('Error fetching treatments data', error);
        }
      };

      fetchData();
    }

    // Add chatbot script dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.AgentInitializer.init({
        agentRenderURL: "https://agent.jotform.com/01955ab0b53671a1bec8d54f915a146a91f3",
        rootId: "JotformAgent-01955ab0b53671a1bec8d54f915a146a91f3",
        formID: "01955ab0b53671a1bec8d54f915a146a91f3",
        queryParams: ["skipWelcome=1", "maximizable=1"],
        domain: "https://www.jotform.com",
        isDraggable: false,
        background: "linear-gradient(180deg, #6C73A8 0%, #6C73A8 100%)",
        buttonBackgroundColor: "#0066C3",
        buttonIconColor: "#FFFFFF",
        variant: false,
        customizations: {
          "greeting": "Yes",
          "greetingMessage": "Hi! How can I assist you?",
          "openByDefault": "No",
          "pulse": "Yes",
          "position": "right",
          "autoOpenChatIn": "0"
        },
        isVoice: false
      });
    };

    // Cleanup function to remove script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, [isLoggedIn]);

  const filteredTreatments = treatments.filter(treatment =>
    treatment.medical_Condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHospitalTreatments = filteredTreatments.filter(treatment =>
    treatment.insurance_provider.toLowerCase().includes(insuranceSearchTerm.toLowerCase())
  );

  const groupByInsuranceProvider = (treatments) => {
    return treatments.reduce((acc, treatment) => {
      const provider = treatment.insurance_provider;
      if (!acc[provider]) {
        acc[provider] = 0;
      }
      acc[provider]++;
      return acc;
    }, {});
  };

  const groupByHospital = (treatments) => {
    return treatments.reduce((acc, treatment) => {
      const hospital = treatment.hospital;
      if (!acc[hospital]) {
        acc[hospital] = 0;
      }
      acc[hospital] += treatment.billing_amount;
      return acc;
    }, {});
  };

  const insuranceData = Object.keys(groupByInsuranceProvider(filteredTreatments)).map(provider => ({
    name: provider,
    value: groupByInsuranceProvider(filteredTreatments)[provider]
  }));

  const hospitalDataFull = Object.keys(groupByHospital(filteredHospitalTreatments)).map(hospital => ({
    name: hospital,
    value: groupByHospital(filteredHospitalTreatments)[hospital],
    insuranceProvider: filteredHospitalTreatments.find(treatment => treatment.hospital === hospital)?.insurance_provider || ''
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#fff' }}>
            {payload.map((entry, index) => (
              <div key={`item-${index}`} style={{ color: entry.color }}>
                <p>{`Insurance Provider: ${entry.payload.name}`}</p>
                <p>{`No. of Patients: ${entry.value}`}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const CustomTooltipHospital = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#fff' }}>
            {payload.map((entry, index) => (
              <div key={`item-${index}`} style={{ color: entry.color }}>
                <p>{`Hospital Name: ${entry.payload.name}`}</p>
                <p>{`Billing Amount: $${entry.value}`}</p>
                <p>{`Insurance Provider: ${entry.payload.insuranceProvider}`}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="homepage-background">
      <div className="container">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-gradient shadow-sm">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>

        {/* Page Header */}
        <h1 className="text-center my-5 display-3">Welcome to InsuraPulse</h1>
        {/* Insurance Provider Cards */}
        {isLoggedIn ? (
          <div className="row mb-5">
            {Object.keys(groupByInsuranceProvider(treatments)).slice(0, 5).map((provider) => (
              <div className="col-md-4 mb-4" key={provider}>
                <Link to={`/insurance/${provider}`} className="text-decoration-none">
                  <div className="card shadow-lg hover-effect">
                    <div className="card-body">
                      <h5 className="card-title">{provider}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">Please log in to view the treatments.</p>
        )}
        {/* Search Field */}
        <div className="text-center mb-5">
          <label htmlFor="diseaseSearch" className="form-label">Search by Disease</label>
          <input
            type="text"
            id="diseaseSearch"
            className="form-control mx-auto"
            style={{ maxWidth: '300px' }}
            placeholder="Search for disease"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="text-center mb-5">
          <button className="btn btn-primary me-3" onClick={() => { setShowInsuranceChart(true); setShowHospitalChart(false); }}>Insurance Chart</button>
          <button className="btn btn-secondary" onClick={() => { setShowInsuranceChart(false); setShowHospitalChart(true); setHospitalData(hospitalDataFull.slice(0, 20)); }}>Hospital Chart</button>
        </div>

        

        {/* Insurance Chart */}
        {showInsuranceChart && (
          <div className="text-center">
            <h2>Insurance Providers Chart</h2>
            <PieChart width={400} height={400}>
              <Pie
                data={insuranceData}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {insuranceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </div>
        )}

        {/* Hospital Chart */}
        {showHospitalChart && (
          <div className="text-center">
            <h2>Hospital Billing Chart</h2>
            <div className="text-center">
              <BarChart width={800} height={400} data={hospitalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltipHospital />} />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </div>
          </div>
        )}

        {/* Add the chatbot */}
        <div id="JotformAgent-01955ab0b53671a1bec8d54f915a146a91f3"></div>
      </div>
    </div>
  );
};

export default HomePage;
