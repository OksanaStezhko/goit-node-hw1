const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');
console.log(contactsPath);

async function readContacts() {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);
  return contactsList;
}

async function listContacts() {
  try {
    const contactsList = await readContacts();
    console.table(contactsList);
    return contactsList;
  } catch (error) {
    console.log(error.message);
  }
}

async function updateContacts(data, message) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data));
    console.log(message);
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contactsList = await readContacts();
    const contact = contactsList.find(
      contact => String(contact.id) === String(contactId),
    );
    console.log(typeof String(contactId));
    if (!contact) {
      return console.error(`Сontact with id = ${contactId} not found`);
    }
    console.table(contact);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = await readContacts();
    const idx = contactsList.findIndex(
      contact => String(contact.id) === String(contactId),
    );
    if (idx === -1) {
      console.log(`Сontact with id= ${contactId} not found`);
      return null;
    }
    contactsList.splice(idx, 1);

    //второй вариант удаления
    // const newContactList = contactsList.filter(
    //    => Number(contact.id) !== Number(contactId),
    // );
    // if (newContactList.length === contactsList.length) {
    //   return console.log(`Сontact with id= ${contactId} not found`);
    // }
    // await fs.writeFile(contactsPath, JSON.stringify(newContactList));

    await updateContacts(contactsList, `Сontact with id=${contactId} removed`);
    listContacts();
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsList = await readContacts();
    const newContact = { id: v4(), name, email, phone };
    const newContactsList = [...contactsList, newContact];

    await updateContacts(newContactsList, `Contact ${name} added to the list`);
    listContacts();
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
