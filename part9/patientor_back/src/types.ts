export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
};

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other'
};



// TODO: could probably use more strict types

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string
	ssn: string;
	gender: string;
	occupation: string;
}

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;