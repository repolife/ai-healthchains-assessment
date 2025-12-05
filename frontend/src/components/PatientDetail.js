import React, { useState, useEffect } from 'react';
import './PatientDetail.css';
import { apiService } from '../services/apiService';

const PatientDetail = ({ patientId, onBack }) => {
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      try {
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

        <div className="patient-records-section">
          <h2>Medical Records ({records.length})</h2>
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


