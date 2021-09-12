const fs = require ( "fs/promises");
const path = require ("path");
const { v4 } = require ("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
console.log(contactsPath);

 async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);

    console.table(contactsList);
  } catch (error) {
    console.log(error.message);
  }
}

 async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);

    const contact = contactsList.find(
      contact => contact.id === Number(contactId),
    );
    console.log(contact, contactId);

    if (!contact) {
      return console.error(`Сontact with id=${contactId} not found`);
    }
    console.table(contact);
  } catch (error) {
    console.log(error.message);
  }
}

 async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);
    const newContactList = contactsList.filter(
      contact => contact.id !== (contactId),
    );

    if (newContactList.length === contactsList.length) {
      return console.log(`Сontact with id= ${contactId} not found`);
    }

    await fs.writeFile(contactsPath, JSON.stringify(newContactList));
    console.log(`Сontact with id=${contactId} removed`);

    listContacts();
  } catch (error) {
    console.log(error.message);
  }
}

 async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);

    const contactInList = contactsList.find(
      contact => contact.email === email || contact.phone === phone,
    );
    if (contactInList) {
      return console.log('Contact already in the list');
    }
    const newContact = { id: v4(), name, email, phone };
    const newContactsList = JSON.stringify([...contactsList, newContact]);

    await fs.writeFile(contactsPath, newContactsList);
    console.log(`Contact ${name} added to the list`);

    listContacts();
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {listContacts,getContactById,removeContact,addContact}
