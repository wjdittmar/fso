import express from 'express';
import patientService from '../services/patientServices';
import toNewPatient from '../utils'

const router = express.Router();

router.get('/', (_req, res) => {
	const result = patientService.getPatientsWithoutSSN();
	res.send(result);
});


router.get('/:id', (request, response) => {
	console.log(request.params);
	const patient = patientService.getPatient(request.params.id);
	if (patient) {
		response.json(patient);
	}
	else {
		response.status(404).end();
	}
})

router.post('/', (req, res) => {
	try {
		const newPatient = toNewPatient(req.body);
		const addedPatient = patientService.addPatient(newPatient);
		res.json(addedPatient);
	}
	catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
})

export default router;