import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";

const ViewAnalytics = ({ contacts }) => {
  const [departmentTotalSalaries, setDepartmentTotalSalaries] = useState({});
  const [departmentAverageSalaries, setDepartmentAverageSalaries] = useState({});
  const [overallTotalSalary, setOverallTotalSalary] = useState(null);
  const [overallAverageSalary, setOverallAverageSalary] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(true);

  useEffect(() => {
    calculateTotalSalaries();
  }, [contacts]);

  const calculateTotalSalaries = () => {
    if (!contacts || contacts.length === 0) {
      setDepartmentTotalSalaries({});
      setDepartmentAverageSalaries({});
      setOverallTotalSalary(null);
      setOverallAverageSalary(null);
      return;
    }

    const departmentData = {};
    const departmentCount = {};
    contacts.forEach((contact) => {
      const contactDepartment = contact.Department;
      const contactSalary = parseFloat(contact.Salary);

      if (!departmentData[contactDepartment]) {
        departmentData[contactDepartment] = 0;
        departmentCount[contactDepartment] = 0;
      }

      departmentData[contactDepartment] += contactSalary;
      departmentCount[contactDepartment]++;
    });

    const overallTotal = contacts.reduce(
      (sum, contact) => sum + parseFloat(contact.Salary),
      0
    );
    const overallCount = contacts.length;

    const departmentAverageData = {};
    Object.keys(departmentData).forEach((dept) => {
      const total = departmentData[dept];
      const count = departmentCount[dept];
      departmentAverageData[dept] = total / count;
    });

    const overallAverage = overallTotal / overallCount;

    setDepartmentTotalSalaries(departmentData);
    setDepartmentAverageSalaries(departmentAverageData);
    setOverallTotalSalary(overallTotal);
    setOverallAverageSalary(overallAverage);
  };

  const toggleAnalytics = () => {
    setShowAnalytics(!showAnalytics);
  };

  const downloadAsPDF = () => {
    const input = document.getElementById("contactTable");
    if (input) {
      html2pdf(input);
    } else {
      console.error("Table element not found for PDF download");
    }
  };

  return (
    <div>
      <h2>View Analytics</h2>
      
      <button className="btn btn-primary my-2" onClick={downloadAsPDF}>
        Download as PDF
      </button>

      {showAnalytics && (
        <>
          <div>
            <h3>Total Salary of All Departments: ${overallTotalSalary !== null ? overallTotalSalary.toFixed(2) : 'N/A'}</h3>
            <table id="contactTable" className="table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Total Salary</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(departmentTotalSalaries).map((dept) => (
                  <tr key={dept}>
                    <td>{dept}</td>
                    <td>${departmentTotalSalaries[dept].toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3>Average Salary of All Departments: ${overallAverageSalary !== null ? overallAverageSalary.toFixed(2) : 'N/A'}
            </h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Average Salary</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(departmentAverageSalaries).map((dept) => (
                  <tr key={dept}>
                    <td>{dept}</td>
                    <td>${departmentAverageSalaries[dept].toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewAnalytics;
