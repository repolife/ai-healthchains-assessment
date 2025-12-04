import React, { useState, useEffect } from 'react';
import './PatientDetail.css';
import { apiService } from '../services/apiService';

const PatientDetail = ({ patientId, onBack }) => {
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Implement fetchPatientData function
  // This should fetch both patient details and their records
  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      try {
        // TODO: Fetch patient data using apiService.getPatient(patientId)
        // TODO: Fetch patient records using apiService.getPatientRecords(patientId)
        // TODO: Update state with fetched data
        const patientData = await apiService.getPatient(patientId);
        const recordsData = await apiService.getPatientRecords(patientId);
        setPatient(patientData);
        setRecords(recordsData.records); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  if (loading) {
    return (
      <div className="patient-detail-container">
        <div className="loading">Loading patient details...</div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="patient-detail-container">
        <div className="error">Error loading patient: {error || 'Patient not found'}</div>
        <button onClick={onBack} className="back-btn">Back to List</button>
      </div>
    );
  }

  return (
    <div className="patient-detail-container">
      <div className="patient-detail-header">
        <button onClick={onBack} className="back-btn">← Back to List</button>
      </div>

      <div className="patient-detail-content">
        {/* TODO: Display patient information */}
        {/* Show: name, email, dateOfBirth, gender, phone, address, walletAddress */}
        <div className="patient-info-section">
          <h2>Patient Information</h2>
          {patient && (
            <div className="patient-info">
              <p>Name: {patient.name}</p>
              <p>Email: {patient.email}</p>
              <p>Date of Birth: {patient.dateOfBirth}</p>
              <p>Gender: {patient.gender}</p>
              <p>Phone: {patient.phone}</p>
              <p>Address: {patient.address}</p>
              <p>Wallet Address: {patient.walletAddress}</p>
            </div>
          )}
        </div>

        {/* TODO: Display patient records */}
        {/* Show list of medical records with: type, title, date, doctor, hospital, status */}
        <div className="patient-records-section">
          <h2>Medical Records ({records.length})</h2>
          {/* Your implementation here */}
          <div className="records-list">
          {records && records.length > 0 && records.map((record) => (
            <div key={record.id} className="record">
              <p>Type: {record.type}</p>
              <p>Title: {record.title}</p>
              <p>Date: {record.date}</p>
              <p>Doctor: {record.doctor}</p>
              <p>Hospital: {record.hospital}</p>
              <p>Status: {record.status}</p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;


