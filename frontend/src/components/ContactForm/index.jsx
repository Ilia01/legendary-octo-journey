import React, { useState } from "react";

const ContactForm = ({ excistingContact = {}, updateCallback }) => {
  const [firstName, setFirstName] = useState(excistingContact.firstName || "");
  const [lastName, setLasttName] = useState(excistingContact.lastName || "");
  const [email, setEmail] = useState(excistingContact.email || "");

  const updating = Object.entries(excistingContact).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
    };
    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_contact/${excistingContact.id}` : "create_contact");
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(url, options);
    if (res.status !== 201 && res.status !== 200) {
      const data = await res.json();
      alert(data.message);
    } else {
      updateCallback();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => {
            setLasttName(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor={"email"}>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <button type="submit">Create Contact</button>
    </form>
  );
};

export default ContactForm;
