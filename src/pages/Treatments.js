import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Treatments.css'; // Create this CSS file for styling

const Treatments = () => {
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3232/treatments');
        setTreatments(response.data);
      } catch (error) {
        console.error('Error fetching treatments data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-5">Treatments</h1>
      <div className="row">
        {treatments.map((treatment) => (
          <div className="col-md-4 mb-4" key={treatment.id}>
            <div className="card shadow-lg hover-effect">
              <div className="card-body">
                <h5 className="card-title">{treatment.name}</h5>
                <p className="card-text"><strong>Age:</strong> {treatment.age}</p>
                <p className="card-text"><strong>Gender:</strong> {treatment.gender}</p>
                <p className="card-text"><strong>Blood Type:</strong> {treatment.bloodType}</p>
                <p className="card-text"><strong>Medical Condition:</strong> {treatment.medicalCondition}</p>
                <p className="card-text"><strong>Date of Admission:</strong> {treatment.dateAdmission}</p>
                <p className="card-text"><strong>Doctor:</strong> {treatment.doctor}</p>
                <p className="card-text"><strong>Hospital:</strong> {treatment.hospital}</p>
                <p className="card-text"><strong>Insurance Provider:</strong> {treatment.insuranceProvider}</p>
                <p className="card-text"><strong>Billing Amount:</strong> ${treatment.billingAmount.toFixed(2)}</p>
                <p className="card-text"><strong>Room Number:</strong> {treatment.roomNumber}</p>
                <p className="card-text"><strong>Admission Type:</strong> {treatment.admissionType}</p>
                <p className="card-text"><strong>Discharge Date:</strong> {treatment.dischargeDate}</p>
                <p className="card-text"><strong>Medication:</strong> {treatment.medication}</p>
                <p className="card-text"><strong>Test Results:</strong> {treatment.testResults}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Treatments;