import express from 'express';
import patientServices from '../services/patientServices';
const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientServices.getPatientsWithoutSSN());
});

export default router;