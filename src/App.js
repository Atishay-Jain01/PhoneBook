import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";


function App() {
  const [contacts, setContacts] = useState([]); // State to manage contacts
  const [idCounter, setIdCounter] = useState(1); // Auto-increment ID

  // Function to add a new contact
  const addNewContact = (newContact) => {
    newContact.id = idCounter; // Assign unique ID
    setContacts([...contacts, newContact]); // Update state with new contact  //dots are the spread operator
    setIdCounter(idCounter + 1); // Increment ID for next contact
  };

  return (
    <div>
      <Header />

      <div className="container" style={{ minHeight: "500px" }}>
        <div className="row">
          {/* Contact List */}
          <div className="col-md-6">
            <h3>Add Contact</h3>
            <AddContact addNewContact={addNewContact} />
          </div>

          {/* Add Contact Form */}
          <div className="col-md-6">
            
            <ContactList contacts={contacts} setContacts={setContacts} />
            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;