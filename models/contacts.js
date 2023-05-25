const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { nanoid } = require("nanoid");

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
    const allContacts = await fs.readFile(contactsPath);
    return JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
    const allContacts = await listContacts();
    const result = allContacts.find(item => item.id === contactId);
    return result || null;
};

const removeContact = async (contactId) => {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = allContacts.splice(index, 1);
    await updateContacts(allContacts);

    return result;
};

const addContact = async (data) => {
    const allContacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data
    };

    allContacts.push(newContact);

    await updateContacts(allContacts);

    return newContact;
}

const updateContact = async (contactId, data) => {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    
    allContacts[index] = { contactId, ...data };
  
    await updateContacts(allContacts);
    return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
