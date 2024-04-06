import patients from '../../data/patients-full';
import { Patient, PatientWithoutSSN, NewPatient } from '../types';
import { v1 as uuid } from 'uuid'

const getPatients = (): Patient[] => {
	return patients;
};

const getPatient = (idToFind: string): Patient => {
	const patient = patients.find(({ id }) => id === idToFind);
	if (patient) {
		return patient;
	}
	else throw new Error("Could not find");
}

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
	return patients.map(({ dateOfBirth, gender, id, occupation, name, entries }) => ({
		dateOfBirth,
		gender,
		id,
		occupation,
		name,
		entries
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
	addPatient,
	getPatient
};