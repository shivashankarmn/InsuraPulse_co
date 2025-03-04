import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Home.css'; 
import { useAuth } from './AuthContext';

const InsuranceProvider = () => {
  const { provider } = useParams();
  const [treatments, setTreatments] = useState([]);
  const { bookmarks, addBookmark } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3232/treatments');
        const filteredTreatments = response.data.filter(treatment => treatment.insurance_provider === provider);
        setTreatments(filteredTreatments);
      } catch (error) {
        console.error('Error fetching treatments data', error);
      }
    };

    fetchData();
  }, [provider]);

  const handleBookmark = (treatment) => {
    addBookmark(treatment);
    navigate('/bookmarks'); // Navigate to "My Bookmarks" page after adding a bookmark
  };

  const isBookmarked = (treatmentId) => {
    return bookmarks.some(bookmark => bookmark.id === treatmentId);
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Treatments for {provider}</h1>
      <div className="row">
        {treatments.map((treatment) => (
          <div className="col-md-4 mb-4" key={treatment.id}>
            <div className="card shadow-lg hover-effect">
              <div className="card-body">
                <h5 className="card-title">{treatment.hospital}</h5>
                <p className="card-text"><strong>Billing Amount:</strong> ${treatment.billing_amount.toFixed(2)}</p>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleBookmark(treatment)}
                  disabled={isBookmarked(treatment.id)}
                >
                  {isBookmarked(treatment.id) ? 'Bookmarked' : 'Add Bookmark'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsuranceProvider;