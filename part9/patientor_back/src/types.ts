export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
};


// TODO: could probably use more strict types

export interface Patient {
	id: `${string}-${string}-${string}-${string}-${string}`;
	name: string;
	dateOfBirth: `${number}-${number}-${number}`
	ssn: string;
	gender: string;
	occupation: string;
}

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;