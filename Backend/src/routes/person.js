const express = require('express');
const personRouter = express.Router();
const { createPerson, getPersons, getPerson, updatePerson, deletePerson } = require('../controller/personController');


personRouter.post('/', createPerson);
personRouter.get('/', getPersons);
personRouter.get('/:id', getPerson);
personRouter.put('/:id', updatePerson);
personRouter.delete('/:id', deletePerson);

module.exports = personRouter;