import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
	return diagnoses;
};

const addDiary = () => {
	return null;
};

export default {
	getDiagnoses,
	addDiary
};