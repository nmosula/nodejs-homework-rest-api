const express = require('express')

const router = express.Router()

const { contacts: contactsController } = require("../../controllers");

const { schemas } = require("../../models/contact");

const { validateBody } = require("../../utils");
const { isValidId, authenticate } = require('../../middlewares');

router.use(authenticate);

router.get('/', contactsController.getAllContacts);

router.get('/:id', isValidId, contactsController.getContactById);

router.post('/',  validateBody(schemas.contactAddSchema), contactsController.addContact);

router.put('/:id', isValidId, validateBody(schemas.contactAddSchema), contactsController.updateContactById);

router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteContactSchema), contactsController.updateStatusContact);

router.delete('/:id', isValidId, contactsController.deleteContactById);

module.exports = router
