import { useState } from "react";
import ContactList from "./components/ContactList/ContactList";
import Container from "./components/Container/Container";
import ContactForm from "./components/ContactForm/ContactForm";
import Section from "./components/Section/Section";
import Filter from "./components/Filter/Filter";
import useLocalStorage from "./hooks/useLocalStorage";
import { nanoid } from "nanoid";

export default function App() {
  const [contacts, setContacts] = useLocalStorage("contacts", [
    { id: "id-5", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-6", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-7", name: "Eden Clements", number: "645-17-79" },
    { id: "id-8", name: "Annie Copeland", number: "227-91-26" },
  ]);

  const [filter, setFilter] = useState("");

  const addContact = ({ contactName, number }) => {
    const contact = {
      id: nanoid(),
      name: contactName,
      number: number,
    };
    setContacts((prevContacts) => [contact, ...prevContacts]);
  };
  const filterContacts = (e) => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };
  const filterList = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={filterContacts} />
        <ContactList contacts={filterList()} onDeleteContact={deleteContact} />
      </Section>
    </Container>
  );
}
