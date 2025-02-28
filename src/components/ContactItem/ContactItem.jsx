import React from "react";
import css from "./ContactItem.module.css";

const ContactItem = ({ contact, onDelete }) => {
  return (
    <li className={css.item}>
      <div className={css.contactInfo}>
        <span className={css.contactName}>{contact.name}</span>:{" "}
        <span className={css.contactNumber}>{contact.number}</span>
      </div>
      <button onClick={onDelete} className={css.deleteButton}>Delete</button>
    </li>
  );
};

export default ContactItem;
