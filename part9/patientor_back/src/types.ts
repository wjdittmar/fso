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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

// TODO: could probably use more strict types

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string
	ssn: string;
	gender: Gender;
	occupation: string;
	entries?: Entry[];
}

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = Omit<Patient, 'id' | 'entries'>;