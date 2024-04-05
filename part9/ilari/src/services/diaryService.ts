import diaries from '../../data/entries';
import {
	NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry
} from '../types';


const getEntries = (): DiaryEntry[] => {
	return diaries;
};

const findById = (id: number): DiaryEntry | undefined => {
	const entry = diaries.find(d => d.id === id);
	return entry;
};

const addDiary = (
	entry: NewDiaryEntry): DiaryEntry => {

	const newDiaryEntry = {
		id: Math.max(...diaries.map(d => d.id)) + 1,
		...entry
	};

	diaries.push(newDiaryEntry);
	return newDiaryEntry;
};

// note that for some strange reason even though the return type of this function is 
// typed to be NonSensitiveDiaryEntry, that 
// TypeScript does not strictly enforce that the comment field is not included
// so it's acting more like a comment rather than enforcement mechanism

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
	return diaries.map(({ id, date, weather, visibility }) => ({
		id,
		date,
		weather,
		visibility,
	}));
};

export default {
	getEntries,
	addDiary,
	getNonSensitiveEntries,
	findById
};