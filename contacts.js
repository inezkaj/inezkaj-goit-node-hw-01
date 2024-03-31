const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch(() => console.log("error"));

  return data;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => String(contact.id) == String(contactId));
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter(
    (contact) => String(contact.id) !== String(contactId)
  );
  fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: Math.random() * 1000, name, email, phone };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
