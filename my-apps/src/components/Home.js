// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import '../css/Home.css'; // Include a separate CSS file for styling
// import { useNavigate } from 'react-router-dom';
// import { MdOutlineDelete } from "react-icons/md";

// export default function Home() {
//   const navigate = useNavigate();
//   const [tickets, setTickets] = useState([]);
//   const [allTickets, setAllTickets] = useState([]);
//   const [note, setNote] = useState('');
//   const [totCustomer, setTotCustomer] = useState(0);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const token = localStorage.getItem('token');
//   const userDetails = JSON.parse(localStorage.getItem('user')) || {}; // Updated: Use empty object as fallback

//   const fetchTickets = async () => {
//     try {
//       const response = await fetch('https://help-desk-app-dgat.onrender.com/user-tickets', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       setTickets(data.data.sort((a, b) => new Date(b.lastUpdatedOn) - new Date(a.lastUpdatedOn)));
//     } catch (error) {
//       notifyA('Failed to fetch tickets');
//     }
//   };

//   const fetchAllTickets = async () => {
//     try {
//       const response = await fetch('https://help-desk-app-dgat.onrender.com/all-tickets', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       setAllTickets(data.data.sort((a, b) => new Date(b.lastUpdatedOn) - new Date(a.lastUpdatedOn)));
//     } catch (error) {
//       notifyA('Failed to fetch all tickets');
//     }
//   };

//   const fetchCustomers = async () => {
//     try {
//       const response = await fetch('https://help-desk-app-dgat.onrender.com/all-customers', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await response.json();
//       setTotCustomer(data.data.length - 2); // Subtracting 2 to exclude admin/customer
//     } catch (error) {
//       notifyA('Failed to fetch customers');
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     // Check if userDetails exists and has an email property
//     if (userDetails && userDetails.email) {
//       if (userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com') {
//         fetchAllTickets();
//       } else {
//         fetchTickets();
//       }

//       if (userDetails.email === 'admin@gmail.com') {
//         fetchCustomers();
//       }
//     } else {
//       navigate("/login"); // Redirect to login if userDetails is null or email is missing
//     }
//   }, [token, userDetails?.email, navigate]); // Updated: Use optional chaining

//   const notifyA = (msg) =>
//     toast.error(msg, { position: 'top-right', autoClose: 5000, theme: 'dark' });

//   const notifyB = (msg) =>
//     toast.success(msg, { position: 'top-right', autoClose: 5000, theme: 'dark' });

//   const onAddNote = async (id) => {
//     if (!note.trim()) return notifyA('Please enter a note');
//     try {
//       const response = await fetch('https://help-desk-app-dgat.onrender.com/add-note', {
//         method: 'POST',
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ noteId: id, content: note }),
//       });
//       const data = await response.json();
//       notifyB(data.message);
//       setNote('');
//       setShowPopup(false);
//       userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com'
//         ? fetchAllTickets()
//         : fetchTickets();
//     } catch {
//       notifyA('Failed to add note');
//     }
//   };

//   const onChangeStatus = async (ticketId, newStatus) => {
//     try {
//       const response = await fetch('https://help-desk-app-dgat.onrender.com/update-ticket-status', {
//         method: 'POST',
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ticketId, status: newStatus }),
//       });
//       const data = await response.json();
//       notifyB(data.message);
//       userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com'
//         ? fetchAllTickets()
//         : fetchTickets();
//     } catch {
//       notifyA('Failed to update status');
//     }
//   };

//   const onDeleteTicket = async (id) => {
//     try {
//       const response = await fetch('https://help-desk-app-dgat.onrender.com/delete-ticket', {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ticketId: id }),
//       });
//       const data = await response.json();
//       notifyB(data.message);
//       userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com'
//         ? fetchAllTickets()
//         : fetchTickets();
//     } catch {
//       notifyA('Failed to delete ticket');
//     }
//   };

//   const renderTickets = (ticketList) => {
//     if (ticketList.length === 0) return <h3>No tickets created</h3>;
//     return ticketList.map((ticket) => (
//       <div className="ticket-card" key={ticket._id}>
//         <h3>ID: <span>{ticket._id}</span></h3>
//         <h3>Title: <span>{ticket.title}</span></h3>
//         <span className={`status ${ticket.status.toLowerCase()}`}>{ticket.status}</span>
//         {userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com' && (
//           <p><strong>Customer:</strong> {ticket.customerName}</p>
//         )}
//         <button onClick={() => onDeleteTicket(ticket._id)}><MdOutlineDelete /></button>
//       </div>
//     ));
//   };

//   return (
//     <div>
//       <h2>{userDetails.email?.includes('agent') || userDetails.email?.includes('admin') ? 'All Tickets' : 'My Tickets'}</h2>
//       <div className="tickets-list">
//         {renderTickets(userDetails.email?.includes('agent') || userDetails.email?.includes('admin') ? allTickets : tickets)}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '../css/Home.css'; // Include a separate CSS file for styling
import { useNavigate } from 'react-router-dom';
import { MdOutlineDelete } from "react-icons/md";

export default function Home() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [note, setNote] = useState('');
  const [totCustomer, setTotCustomer] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const token = localStorage.getItem('token');
  const userDetails = JSON.parse(localStorage.getItem('user'));
  
  const fetchTickets = async () => {
    try {
      const response = await fetch('https://help-desk-app-dgat.onrender.com/user-tickets', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setTickets(data.data.sort((a, b) => new Date(b.lastUpdatedOn) - new Date(a.lastUpdatedOn)));
    } catch (error) {
      notifyA('Failed to fetch tickets');
    }
  };

  const fetchAllTickets = async () => {
    try {
      const response = await fetch('https://help-desk-app-dgat.onrender.com/all-tickets', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setAllTickets(data.data.sort((a, b) => new Date(b.lastUpdatedOn) - new Date(a.lastUpdatedOn)));
    } catch (error) {
      notifyA('Failed to fetch all tickets');
    }
  };

  const fetchCustomers = async () => {
    const response = await fetch('https://help-desk-app-dgat.onrender.com/all-customers', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setTotCustomer(data.data.length - 2); // Subtracting 2 to exclude admin/customer
  };


  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    
    if (userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com') {
      fetchAllTickets();
    } else {
      fetchTickets();
    }
    
    if (userDetails.email === 'admin@gmail.com') {
      fetchCustomers();
    }
  }, [token, userDetails.email, navigate]);

  const notifyA = (msg) =>
    toast.error(msg, { position: 'top-right', autoClose: 5000, theme: 'dark' });

  const notifyB = (msg) =>
    toast.success(msg, { position: 'top-right', autoClose: 5000, theme: 'dark' });



  const onAddNote = async (id) => {
    if (!note.trim()) return notifyA('Please enter a note');
    try {
      const response = await fetch('https://help-desk-app-dgat.onrender.com/add-note', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId: id, content: note }),
      });
      const data = await response.json();
      notifyB(data.message);
      setNote('');
      setShowPopup(false);
      if (userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com') {
        fetchAllTickets();
      } else {
        fetchTickets();
      }
    } catch {
      notifyA('Failed to add note');
    }
  };

  const onChangeStatus = async (ticketId, newStatus) => {
    try {
      const response = await fetch('https://help-desk-app-dgat.onrender.com/update-ticket-status', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId, status: newStatus }),
      });
      const data = await response.json();
      notifyB(data.message);
      if (userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com') {
        fetchAllTickets();
      } else {
        fetchTickets();
      }
    } catch {
      notifyA('Failed to update status');
    }
  };

  const openNotesPopup = (ticket) => {
    setSelectedTicket(ticket);
    setShowPopup(true);
  };

  const closeNotesPopup = () => {
    setShowPopup(false);
    setSelectedTicket(null);
  };
  
  const onDeleteTicket = async (id) => {
    try {
      const response = await fetch('https://help-desk-app-dgat.onrender.com/delete-ticket', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ticketId: id }),
      });
      const data = await response.json();
      if (userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com') {
        fetchAllTickets();
      } else {
        fetchTickets();
      }
      notifyB(data.message);
    } catch {
      notifyA('Failed to delete ticket');
    }
  };

  const renderTickets = (ticketList) => {
    if (ticketList.length === 0) {
      return <h3>No tickets created</h3>;
    }
    return ticketList.map((ticket) => (
      <div className="ticket-card" key={ticket._id}>
        <h3>ID: <span>{ticket._id}</span></h3>
        <div className="ticket-header">
          <h3>Title: <span>{ticket.title}</span></h3>
          <span className={`status ${ticket.status.toLowerCase()}`}>{ticket.status}</span>
        </div>
        {userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com' ? (
          <p><strong>Customer Name:</strong> {ticket.customerName}</p>
        ) : null}
        <p className='last-updated'>Last Updated: <span>{new Date(ticket.lastUpdatedOn).toLocaleString()}</span></p>
        <div className='note-delete'>
          <button className='view-note' onClick={() => openNotesPopup(ticket)}>View Notes</button>
          <button onClick={() => onDeleteTicket(ticket._id)} className='delete-btn'><MdOutlineDelete /> </button>
        </div>
        {(userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com') && (
          <div className="actions">
            <label>Update Status: </label>
            <select className='select-status' onChange={(e) => onChangeStatus(ticket._id, e.target.value)} value={ticket.status}>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={userDetails.email === 'agent@gmail.com' ? 'home-container-agent' :
      userDetails.email === 'admin@gmail.com' ? 'home-container-admin' : 'home-container'}>
      {userDetails.email === 'admin@gmail.com' && (
        <div className="admin-dashboard">
          <h2>Admin Dashboard</h2>
          <p className='total'>Total Tickets: <span>{allTickets.length}</span></p>
          <p className='total'>Total Customers: <span>{totCustomer}</span></p>
        </div>
      )}
      <div>
        <h2>{userDetails.email.includes('agent') || userDetails.email.includes('admin') ? 'All Tickets' : 'My Tickets'}</h2>
        <div className="tickets-list">
          {renderTickets(userDetails.email.includes('agent') || userDetails.email.includes('admin') ? allTickets : tickets)}
        </div>
      </div>
      {showPopup && selectedTicket && (
        <div className="notes-popup">
          <div className="popup-content">
            <h3>Notes for: {selectedTicket.title}</h3>
            {selectedTicket.notes.length > 0 ? (
              <div>
                {selectedTicket.notes.map((note, index) => (
                  <div key={index}>
                    <strong>{note.user} : </strong> {note.content}
                    <br />
                    <small style={{ paddingLeft: "20px" }}>{new Date(note.timestamp).toLocaleString()}</small>
                  </div>
                ))}
              </div>
            ) : (
              <p>No notes available</p>
            )}
            <div className='input-add'>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note"
              />
              <button onClick={() => onAddNote(selectedTicket._id)}>Add Note</button>
            </div>
            <button className="close-popup" onClick={closeNotesPopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import '../css/Home.css'; // Include a separate CSS file for styling
// import { useNavigate } from 'react-router-dom';
// import { MdOutlineDelete } from "react-icons/md";

// export default function Home() {
//   const navigate = useNavigate();
//   const [tickets, setTickets] = useState([]);
//   const [allTickets, setAllTickets] = useState([]);
//   const [note, setNote] = useState('');
//   const [totCustomer, setTotCustomer] = useState(0);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const token = localStorage.getItem('token');
//   const userDetails = JSON.parse(localStorage.getItem('user'));
//   if(!token){
//     navigate("/login");
//   }
//   const notifyA = (msg) =>
//     toast.error(msg, { position: 'top-right', autoClose: 5000, theme: 'dark' });

//   const notifyB = (msg) =>
//     toast.success(msg, { position: 'top-right', autoClose: 5000, theme: 'dark' });

//   useEffect(() => {
//     if (userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com') {
//       fetchAllTickets();
//     } else {
//       fetchTickets();
//     }
//     if (userDetails.email === 'admin@gmail.com') {
//       fetchCustomers();
//     }
//   }, []);

//   const fetchTickets = async () => {
//     try {
//       const response = await fetch('https://help-desk-app-dgat.onrender.com/user-tickets', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       setTickets(data.data.sort((a, b) => new Date(b.lastUpdatedOn) - new Date(a.lastUpdatedOn)));
//     } catch (error) {
//       notifyA('Failed to fetch tickets');
//     }
//   };

//   const fetchAllTickets = async () => {
//     try {
//       const response = await fetch('https://help-desk-app-dgat.onrender.com/all-tickets', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       setAllTickets(data.data.sort((a, b) => new Date(b.lastUpdatedOn) - new Date(a.lastUpdatedOn)));
//     } catch (error) {
//       notifyA('Failed to fetch all tickets');
//     }
//   };

//   const fetchCustomers = async () => {
//     const response = await fetch('https://help-desk-app-dgat.onrender.com/all-customers', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();
//     setTotCustomer(data.data.length - 2);
//   };

//   const onAddNote = async (id) => {
//     if (!note.trim()) return notifyA('Please enter a note');
//     try {
//       const response = await fetch('https://help-desk-app-dgat.onrender.com/add-note', {
//         method: 'POST',
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ noteId: id, content: note }),
//       });
//       const data = await response.json();
//       notifyB(data.message);
//       setNote('');
//       setShowPopup(false);
//       if (userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com') {
//         fetchAllTickets();
//       } else {
//         fetchTickets();
//       }
//     } catch {
//       notifyA('Failed to add note');
//     }
//   };

//   const onChangeStatus = async (ticketId, newStatus) => {
//     try {
//       const response = await fetch('https://help-desk-app-dgat.onrender.com/update-ticket-status', {
//         method: 'POST',
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ticketId, status: newStatus }),
//       });
//       const data = await response.json();
//       notifyB(data.message);
//       if (userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com') {
//         fetchAllTickets();
//       } else {
//         fetchTickets();
//       }
//     } catch {
//       notifyA('Failed to update status');
//     }
//   };

//   const openNotesPopup = (ticket) => {
//     setSelectedTicket(ticket);
//     setShowPopup(true);
//   };

//   const closeNotesPopup = () => {
//     setShowPopup(false);
//     setSelectedTicket(null);
//   };
  
//   const onDeleteTicket = async (id) => {
//     const response = await fetch('https://help-desk-app-dgat.onrender.com/delete-ticket',{
//       method:'DELETE',
//       headers:{
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         ticketId: id,  
//       })
//     })
//     const data = await response.json();
//     if (userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com') {
//       fetchAllTickets();
//     } else {
//       fetchTickets();
//     }
//     notifyB(data.message);
//   }
//   const renderTickets = (ticketList) =>{
//     if (ticketList.length === 0) {
//       return <h3>No tickets created</h3>; // Display this when no tickets are available
//     }
//     return  ticketList.map((ticket) => (
//       <div className="ticket-card" key={ticket._id}>
//         <h3>ID: <span>{ticket._id}</span></h3>
//         <div className="ticket-header">
//           <h3>Title: <span>{ticket.title}</span></h3>
//           <span className={`status ${ticket.status.toLowerCase()}`}>{ticket.status}</span>
//         </div>
//         {
//           userDetails.email === 'agent@gmail.com' || userDetails.email === 'admin@gmail.com' ? 
//           (<p><strong>Customer Name:</strong> {ticket.customerName}</p>):(<></>)
//         }
//         <p className='last-updated'>Last Updated: <span>{new Date(ticket.lastUpdatedOn).toLocaleString()}</span></p>
//         <div className='note-delete'>
//         <button className='view-note' onClick={() => openNotesPopup(ticket)}>View Notes</button>
//         <button onClick={() => onDeleteTicket(ticket._id)} className='delete-btn'><MdOutlineDelete /> </button>
//         </div>
//         {
//            userDetails.email === 'agent@gmail.com'  &&
//           <div className="actions">
//             <label>Upate Status : </label>
//             <select className='select-status' onChange={(e) => onChangeStatus(ticket._id, e.target.value)} value={ticket.status}>
//               <option value="Active">Active</option>
//               <option value="Pending">Pending</option>
//               <option value="Closed">Closed</option>
//             </select>
//           </div>
//         }
//                 {
//            userDetails.email === 'admin@gmail.com'  &&
//           <div className="actions">
//             <label>Upate Status : </label>
//             <select className='select-status' onChange={(e) => onChangeStatus(ticket._id, e.target.value)} value={ticket.status}>
//               <option value="Active">Active</option>
//               <option value="Pending">Pending</option>
//               <option value="Closed">Closed</option>
//             </select>
//           </div>
//         }
//       </div>
//     ));}; 

//   return (
// <div className={
//   userDetails.email === 'agent@gmail.com' ? 'home-container-agent' :
//   userDetails.email === 'admin@gmail.com' ? 'home-container-admin' :
//   'home-container'
// }>
//       {userDetails.email === 'admin@gmail.com' && (
//         <div className="admin-dashboard">
//           <h2>Admin Dashboard</h2>
//           <p className='total'>Total Tickets: <span>{allTickets.length}</span></p>
//           <p className='total'>Total Customers: <span>{totCustomer}</span></p>
//         </div>
//       )}
//       <div>
//       <h2 >{userDetails.email.includes('agent') || userDetails.email.includes('admin') ? 'All Tickets' : 'My Tickets'}</h2>
//       <div className="tickets-list">
//         {renderTickets(userDetails.email.includes('agent') || userDetails.email.includes('admin') ? allTickets : tickets)}
//       </div>
//       </div>

//       {showPopup && selectedTicket && (
//         <div className="notes-popup">
//           <div className="popup-content">
//             <h3>Notes for: {selectedTicket.title}</h3>
//             {selectedTicket.notes.length > 0 ? (
//               <div>
//                 {selectedTicket.notes.map((note, index) => (
//                   <div key={index}>
//                     <strong>{note.user} : </strong> {note.content}
//                     <br />
//                     <small style={{paddingLeft:"20px"}}>{new Date(note.timestamp).toLocaleString()}</small>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>No notes available</p>
//             )}
//             <div className='input-add'>
//             <input
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               placeholder="Add a note"
//               className='note-input'
//             />
//             <button className='note-add-btn' onClick={() => onAddNote(selectedTicket._id)}>Add Note</button>
//             </div>
//             <button className='popup-close-btn' onClick={closeNotesPopup}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
