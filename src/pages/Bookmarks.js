import React from 'react';
import { useAuth } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; 

const Bookmarks = () => {
  const { bookmarks, updateBookmark, deleteBookmark } = useAuth();

  const handleUpdate = (treatment) => {
    // Add your update logic here
    console.log(`Update treatment ID: ${treatment.id}`);
    // Example: update the treatment's medical condition
    const updatedTreatment = { ...treatment, medical_Condition: 'Updated Condition' };
    updateBookmark(updatedTreatment);
  };

  const handleDelete = (treatmentId) => {
    deleteBookmark(treatmentId);
    console.log(`Bookmark deleted for treatment ID: ${treatmentId}`);
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">My Bookmarks</h1>
      {bookmarks.length > 0 ? (
        <div className="row">
          {bookmarks.map((treatment) => (
            <div className="col-md-4 mb-4" key={treatment.id}>
              <div className="card shadow-lg hover-effect">
                <div className="card-body">
                  <h5 className="card-title">{treatment.hospital}</h5>
                  <p className="card-text"><strong>Billing Amount:</strong> ${treatment.billing_amount.toFixed(2)}</p>
                  <button className="btn btn-secondary mt-3 me-2" onClick={() => handleUpdate(treatment)}>Update</button>
                  <button className="btn btn-danger mt-3" onClick={() => handleDelete(treatment.id)}>Delete Bookmark</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No Bookmarks available.</p>
      )}
    </div>
  );
};

export default Bookmarks;