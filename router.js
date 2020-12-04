import { Router } from 'express';
const router = Router();

import { getAllPeople, getPeople, createPeople, updatePeople, removePeople } from './queries.js';

router.get('/api/people', getAllPeople);
router.get('/api/people/:id', getPeople);
router.post('/api/people', createPeople);
router.put('/api/people/:id', updatePeople);
router.delete('/api/people/:id', removePeople);

export default router;
