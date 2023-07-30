// Сделай импорт модулей fs (в версии, работающей с промисами – fs/promises) и path для работы с файловой системой.
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

// Создай переменную contactsPath и запиши в нее путь к файлу contacts.json. Для составления пути используй методы модуля path.
const contactsPath = path.join(__dirname, "./db/contacts.json");


// Добавь функции для работы с коллекцией контактов. В функциях используй модуль fs и их методы readFile() и writeFile().
async function listContacts(){
  //Возвращает массив контактов.
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  //Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  // Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((el) => el.id === contactId);
  if (contactIndex === -1) return null;
  const [result] = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  //Возвращает объект добавленного контакта.
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone: phone.toString() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

// Сделай экспорт созданных функций через module.exports
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}