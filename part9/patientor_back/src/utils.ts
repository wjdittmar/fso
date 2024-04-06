import { NewPatient, Gender } from './types';

const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}
	if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
		const newPatient: NewPatient = {
			name: parseName(object.name),
			dateOfBirth: parseDate(object.dateOfBirth),
			ssn: parseSSN(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation)
		};

		return newPatient;
	}
	else throw new Error("Fields missing from object");
};

const parseOccupation = (occupation: unknown): string => {
	if (!isString(occupation)) {
		throw new Error('Incorrect or missing comment');
	}

	return occupation;
};

const parseSSN = (ssn: unknown): string => {
	if (!isString(ssn)) {
		throw new Error('Incorrect or missing comment');
	}

	return ssn;
};

const parseName = (name: unknown): string => {
	if (!isString(name)) {
		throw new Error('Incorrect or missing comment');
	}

	return name;
};

const isString = (text: unknown): text is string => {
	// the second condition is for when a user would create a string as
	// new String("text")
	return typeof text === 'string' || text instanceof String;
};

// don't use a typeguard here because we are returning a string type
// but actually checking a more specific condition

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {

	if (!isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}
	return date;
};

const isGender = (gender: string): gender is Gender => {
	return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}
	return gender;
};

export default toNewPatient;