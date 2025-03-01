import React from "react";
import toast from "react-hot-toast";
import css from "./ContactItem.module.css";

const ContactItem = ({ contact, onDelete }) => {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the contact: ${contact.name}?`
    );
    if (confirmed) {
      onDelete();
      toast.success(`Contact ${contact.name} deleted successfully!`);
    }
  };

  return (
    <li className={css.item}>
      <div className={css.contactInfo}>
        <span className={css.contactName}>{contact.name}</span>:{" "}
        <span className={css.contactNumber}>{contact.number}</span>
      </div>
      <button onClick={handleDelete} className={css.deleteButton}>
        Delete
      </button>
    </li>
  );
};

export default ContactItem;
