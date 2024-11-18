import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../css/CreateTicket.css';

function CreateTicket() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const token = localStorage.getItem('token');
  if(!token){
    navigate("/login");
  }
  const notifyA = msg => toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const notifyB = msg => toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://help-desk-app-dgat.onrender.com/create";
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, username: JSON.parse(localStorage.getItem('user')).name })
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.error) {
      notifyA(data.error);
    } else {
      notifyB(data.message);
      setTitle(''); // Reset the title after successful creation
    }
  };

  return (
    <div className="create-ticket-container">
      <div className="create-ticket-card">
        <h2>Create a New Ticket</h2>
        <form onSubmit={handleSubmit}>
          <input 
            placeholder="Ticket Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          <button type="submit">Create Ticket</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTicket;
