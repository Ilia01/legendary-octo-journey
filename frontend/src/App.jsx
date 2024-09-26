import { useState, useEffect } from "react";
import "./App.css";
import ContactList from "./components/ContactList/index";
import ContactForm from "./components/ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const res = await fetch("http://127.0.0.1:5000/contacts");
    const data = await res.json();
    setContacts(data.contacts);
    console.log(data.contacts);
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeCreateModal();
    fetchContacts();
  };

  return (
    <>
      <ContactList
        contacts={contacts}
        updateContact={openEditModal}
        updateCallback={onUpdate}
      />
      <button onClick={openCreateModal}>create New Contact</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span
              style={{ cursor: "pointer" }}
              className="close"
              onClick={closeCreateModal}
            >
              &times;
            </span>
          </div>
          <ContactForm
            excistingContact={currentContact}
            updateCallback={onUpdate}
          />
        </div>
      )}
    </>
  );
}

export default App;
