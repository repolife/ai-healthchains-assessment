import React, { useState, useEffect, useMemo } from 'react';
import './PatientList.css';
import { apiService } from '../services/apiService';
import { debounce } from 'lodash';

const PatientList = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const fetchPatients = async () => {
    setLoading(true);
    try {
     const response = await apiService.getPatients(currentPage, 10, searchTerm);
      console.log(response);
     setPatients(response.patients);
     setPagination(response.pagination);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchPatients();
  }, [searchTerm]);


  const debounedSearchTerm = useMemo(() => debounce((value) => {
    setSearchTerm(value);
  }, 500), []);
  
const handleSearch = (e) => {
    setSearchInput(e.target.value);
    debounedSearchTerm(e.target.value);
  };
    
  if (loading) {
    return (
      <div className="patient-list-container">
        <div className="loading">Loading patients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="patient-list-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="patient-list-container">
      <div className="patient-list-header">
        <h2>Patients</h2>
        <input
          type="text"
          placeholder="Search patients..."
          className="search-input"
          value={searchInput}
          onChange={handleSearch}
        />
      </div>

      <div className="patient-list">
        {patients && patients.length > 0 && patients.map((patient) => (
          <div
            key={patient.id}
            className="patient-card"
            onClick={() => onSelectPatient(patient.id)}
          >
            <h3>{patient.name}</h3>
            <p>{patient.email}</p>
            <p>{patient.dob}</p>
            <p>{patient.gender}</p>
            <p>{patient.phone}</p>
            <p>{patient.address}</p>
            <p>{patient.wallet}</p>
          </div>
        ))}
      </div>

      {pagination && (
        <div className="pagination">
          <button
          disabled={pagination.page === 1}
          onClick={() => setCurrentPage(pagination.page - 1)}
        >
          Prev
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          disabled={pagination.page === pagination.totalPages}
          onClick={() => setCurrentPage(pagination.page + 1)}
        >
          Next
        </button>

        </div>
      )}
    </div>
  );
};

export default PatientList;


