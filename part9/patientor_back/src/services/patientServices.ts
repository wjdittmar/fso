import patients from '../../data/patients';
import { Patient, PatientWithoutSSN, NewPatient } from '../types';
import { v1 as uuid } from 'uuid'

const getPatients = (): Patient[] => {
	return patients;
};

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
	return patients.map(({ dateOfBirth, gender, id, occupation, name }) => ({
		dateOfBirth,
		gender,
		id,
		occupation,
		name
	}));

}

const addPatient = (
	entry: NewPatient
): Patient => {
	const newPatient: Patient = {
		id: uuid(),
		...entry
	};

	patients.push(newPatient);
	return newPatient;
};

export default {
	getPatients,
	getPatientsWithoutSSN,
	addPatient
};