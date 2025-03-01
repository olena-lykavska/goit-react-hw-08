import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import ContactItem from "../ContactItem/ContactItem";
import css from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.list}>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDelete={() => dispatch(deleteContact(contact.id))}
        />
      ))}
    </ul>
  );
};

export default ContactList;