import React, { useContext, useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";
import Analytics from "./Analytics"; 

const Data = () => {

  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
 

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://backendfiles.onrender.com/api/mycontacts`, {
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

  

  const downloadAsPDF = () => {
    const input = document.getElementById("contactTable");
    if (input) {
      html2pdf(input);
    } else {
      console.error("Table element not found for PDF download");
    }
  };

  return (
    <>
    
      <Analytics contacts={contacts} />

      
    </>
  );
};

export default Data;
