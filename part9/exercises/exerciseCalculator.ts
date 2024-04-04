interface ExerciseStats {
	periodLength: number,
	trainingDays: number,
	success: boolean,
	ratingDescription: string,
	target: number,
	average: number
}

export const exerciseCalculator = (hours: number[], target: number): ExerciseStats => {
	const numHours = hours.reduce((partialSum, e) => partialSum + e, 0);
	const average = numHours / hours.length;
	const didSucceed = average >= target;
	const ratingDescription = didSucceed ? "You succeeded." : "You did not reach your goal.";
	return {
		periodLength: hours.length,
		trainingDays: hours.filter((day) => day > 0).length,
		target: target,
		success: didSucceed,
		ratingDescription: ratingDescription,
		average: average
	};
};

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));