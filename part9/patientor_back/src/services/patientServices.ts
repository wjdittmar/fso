import patients from '../../data/patients';
import { Patient, PatientWithoutSSN } from '../types';

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

const addDiary = () => {
	return null;
};

export default {
	getPatients,
	getPatientsWithoutSSN,
	addDiary
};