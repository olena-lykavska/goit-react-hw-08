import { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux"; 
import PageTitle from "../../components/PageTitle/PageTitle";  // Імпортуємо компонент заголовка сторінки
import ContactForm from "../../components/ContactForm/ContactForm";  // Форма для додавання контакту
import ContactList from "../../components/ContactList/ContactList";  // Список контактів
import SearchBox from "../../components/SearchBox/SearchBox";  // Компонент для фільтрації
import { fetchContacts } from "../../redux/contacts/operations";  // Операція для отримання контактів
import { selectLoading } from "../../redux/contacts/selectors";  // Селектор для перевірки завантаження

export default function PhonebookPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);  // Отримуємо інформацію про завантаження

  // Викликаємо fetchContacts при першому рендері сторінки для отримання контактів
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <PageTitle>Your Phonebook</PageTitle>  {/* Заголовок сторінки */}
      <ContactForm />  {/* Компонент для форми додавання контакту */}
      <SearchBox />    {/* Компонент для фільтрації контактів */}
      <div>{isLoading && "Loading contacts..."}</div>  {/* Показуємо текст під час завантаження */}
      <ContactList />  {/* Список контактів */}
    </>
  );
}
