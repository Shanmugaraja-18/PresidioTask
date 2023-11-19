import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    FullName: "",
    Age: 0,
    Address: "",
    DateOfBirth: "",
    JoiningDate: "",
    Salary: 0,
    Department: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...userDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Updated [${userDetails.FullName}] contact`);

      setUserDetails({
        FullName: "",
        Age: 0,
        Address: "",
        DateOfBirth: "",
        JoiningDate: "",
        Salary: 0,
        Department: "",
        phone: "",
      });
      navigate("/mycontacts");
    } else {
      toast.error(result.error);
    }
  };

  useEffect(async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/contact/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      setUserDetails({
        FullName: result.FullName,
        Age: result.Age,
        Address: result.Address,
        DateOfBirth: result.DateOfBirth,
        JoiningDate: result.JoiningDate,
        Salary: result.Salary,
        Department: result.Department,
        phone: result.phone,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Contact..." />
      ) : (
        <>
          <h2>Edit your contact</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullNameInput" className="form-label mt-4">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullNameInput"
                name="FullName"
                value={userDetails.FullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="ageInput" className="form-label mt-4">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="ageInput"
                name="Age"
                value={userDetails.Age}
                onChange={handleInputChange}
                placeholder="25"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="addressInput" className="form-label mt-4">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="addressInput"
                name="Address"
                value={userDetails.Address}
                onChange={handleInputChange}
                placeholder="WalkStreet 05, California"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dobInput" className="form-label mt-4">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dobInput"
                name="DateOfBirth"
                value={userDetails.DateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="joiningDateInput" className="form-label mt-4">
                Joining Date
              </label>
              <input
                type="date"
                className="form-control"
                id="joiningDateInput"
                name="JoiningDate"
                value={userDetails.JoiningDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="salaryInput" className="form-label mt-4">
                Salary
              </label>
              <input
                type="number"
                className="form-control"
                id="salaryInput"
                name="Salary"
                value={userDetails.Salary}
                onChange={handleInputChange}
                placeholder="50000"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="departmentInput" className="form-label mt-4">
                Department
              </label>
              <select
                className="form-select"
                id="departmentInput"
                name="Department"
                value={userDetails.Department}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Department
                </option>
                <option value="Production">Production</option>
                <option value="Marketing & Sales">Marketing & Sales</option>
                <option value="Finance">Finance</option>
                <option value="Human resource">Human resource</option>
                <option value="Information Technology">
                  Information Technology
                </option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="phoneInput" className="form-label mt-4">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneInput"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                placeholder="+977 987654321"
                required
              />
            </div>
            <input
              type="submit"
              value="Save Changes"
              className="btn btn-info my-2"
            />
          </form>
        </>
      )}
    </>
  );
};

export default EditContact;
