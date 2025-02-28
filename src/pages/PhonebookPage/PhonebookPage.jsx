import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle/PageTitle";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";  // Для фільтрації
import { fetchContacts } from "../../redux/contacts/operations";  // Операція для отримання контактів
import { selectLoading } from "../../redux/contacts/selectors";  // Селектор для завантаження

export default function PhonebookPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts()); // Отримуємо контакти при завантаженні сторінки
  }, [dispatch]);

  return (
    <>
      <PageTitle>Your Phonebook</PageTitle>
      <ContactForm />  {/* Форма для додавання нового контакту */}
      <SearchBox />     {/* Компонент для фільтрації контактів */}
      <div>{isLoading && "Loading contacts..."}</div>
      <ContactList />   {/* Список контактів */}
    </>
  );
}
