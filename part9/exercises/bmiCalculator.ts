const calculateBmi = (height: number, mass: number): string => {
	const bmi = mass / (height / 100 * height / 100);
	if (bmi < 18.5) {
		return "Underweight";
	}
	else if (bmi < 25) {
		return "Normal weight";
	}
	else {
		return "Obese";
	}
};

export { calculateBmi };