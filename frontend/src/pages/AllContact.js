import React, { useContext, useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";

const AllContact = () => {
  const { toast } = useContext(ToastContext);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/mycontacts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setContacts(result.contacts);
          setLoading(false);
        } else {
          console.log(result);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchContacts();
  }, []);

  const clearFilters = () => {
    setSearchInput("");
    setSelectedAgeGroup("");
    setSelectedDepartment("");
    setSelectedSalaryRange("");
    setFilteredContacts(contacts);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchUser = contacts.filter((contact) =>
      contact.FullName.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredContacts(newSearchUser);
  };

  const downloadAsPDF = () => {
    const input = document.getElementById("contactTable");
    if (input) {
      html2pdf(input);
    } else {
      console.error("Table element not found for PDF download");
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setContacts(result.myContacts);
          toast.success("Deleted contact");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const applyFilters = () => {
    let filteredContacts = contacts;

    if (selectedAgeGroup) {
      const { min, max } = JSON.parse(selectedAgeGroup);
      filteredContacts = filteredContacts.filter(
        (contact) => contact.Age >= min && contact.Age <= max
      );
    }

    if (selectedDepartment) {
      filteredContacts = filteredContacts.filter(
        (contact) => contact.Department === selectedDepartment
      );
    }

    if (selectedSalaryRange) {
      const { min, max } = JSON.parse(selectedSalaryRange);
      filteredContacts = filteredContacts.filter(
        (contact) => contact.Salary >= min && contact.Salary <= max
      );
    }

    setFilteredContacts(filteredContacts);
  };

  const ageGroups = [
    { label: "25-30", min: 25, max: 30 },
    { label: "30-35", min: 30, max: 35 },
    { label: "35-40", min: 35, max: 40 },
    { label: "Above 40", min: 40, max: 90 },
  ];

  const departments = [
    "Production",
    "Marketing & Sales",
    "Finance",
    "Human Resource",
    "Information Technology",
  ];

  const salaryRanges = [
    { label: "<25000", min: 0, max: 25000 },
    { label: "25000-50000", min: 25000, max: 50000 },
    { label: "50000-100000", min: 50000, max: 100000 },
    { label: "Above 100000", min: 100000, max: 1000000 },
  ];

  return (
    <>
      <div>
        <h1>EMPLOYEE DETAILS</h1>
        
        <button
          type="button"
          className="btn btn-danger my-2"
          onClick={clearFilters}
        >
          GET DATA
        </button>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Contacts..." />
        ) : (
          <>
            {contacts.length === 0 ? (
              <h3>No contacts created yet</h3>
            ) : (
              <>
                <form className="d-flex" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="form-control my-2"
                    placeholder="Search Contact"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-info my-2">
                    Search
                  </button>
                  <select
                    className="form-control my-2 mr-2"
                    value={selectedAgeGroup}
                    onChange={(e) =>
                      setSelectedAgeGroup(e.target.value)
                    }
                  >
                    <option value="">Select Age Group</option>
                    {ageGroups.map((group) => (
                      <option
                        key={group.label}
                        value={JSON.stringify(group)}
                      >
                        {group.label}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-control my-2 mr-2"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-control my-2 mr-2"
                    value={selectedSalaryRange}
                    onChange={(e) =>
                      setSelectedSalaryRange(e.target.value)
                    }
                  >
                    <option value="">Select Salary Range</option>
                    {salaryRanges.map((range) => (
                      <option
                        key={range.label}
                        value={JSON.stringify(range)}
                      >
                        {range.label}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="btn btn-info my-2 ml-auto"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </form>

                <p>
                  Your Total Contacts: <strong>{filteredContacts.length}</strong>
                </p>
                <button
          type="button"
          className="btn btn-danger my-2"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
        <button
                  className="btn btn-primary my-2"
                  onClick={downloadAsPDF}
                >
                  Download as PDF
                </button>
                <table id="contactTable" className="table table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">Full Name</th>
                      <th scope="col">Age</th>
                      <th scope="col">Address</th>
                      <th scope="col">Date of Birth</th>
                      <th scope="col">Joining Date</th>
                      <th scope="col">Salary</th>
                      <th scope="col">Department</th>
                      <th scope="col">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr
                        key={contact._id}
                        onClick={() => {
                          setModalData(contact);
                          setShowModal(true);
                        }}
                      >
                        <th scope="row">{contact.FullName}</th>
                        <td>{contact.Age}</td>
                        <td>{contact.Address}</td>
                        <td>{new Date(contact.DateOfBirth).toLocaleDateString()}</td>
                        <td>{new Date(contact.JoiningDate).toLocaleDateString()}</td>
                        <td>{contact.Salary}</td>
                        <td>{contact.Department}</td>
                        <td>{contact.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </>
            )}
          </>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.FullName}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.FullName}</h3>
          <p>
            <strong>Age</strong>: {modalData.Age}
          </p>
          <p>
            <strong>Address</strong>: {modalData.Address}
          </p>
          <p>
            <strong>Date of Birth</strong>: {new Date(modalData.DateOfBirth).toLocaleDateString()}
          </p>
          <p>
            <strong>Joining Date</strong>: {new Date(modalData.JoiningDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Salary</strong>: {modalData.Salary}
          </p>
          <p>
            <strong>Department</strong>: {modalData.Department}
          </p>
          <p>
            <strong>Phone Number</strong>: {modalData.phone}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/edit/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deleteContact(modalData._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllContact;

 