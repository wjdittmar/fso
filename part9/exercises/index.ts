import express from 'express';
import qs from 'qs';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

app.use(express.json());


app.set('query parser',
	(str: string) => qs.parse(str, {}));

app.get('/hello', (_req, res) => {
	res.send('Hello full stack!');
});

app.get('/bmi', (req, res) => {
	console.log(req.query.height);
	const height: number = parseInt(req.query.height as string);
	const mass: number = parseInt(req.query.mass as string);

	const result: string = calculateBmi(height, mass);
	console.log(result);
	calculateBmi(222, 23);

	console.log(req.query);
	res.send({ mass: mass, height: height, bmi: result });
});

app.post('/exercises', (req, res) => {
	console.log(req.body);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;

	if (!target || isNaN(Number(target))) {
		return res.status(400).send({ error: 'invalid target number' });
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const result = exerciseCalculator(daily_exercises, Number(target));
	res.send({ result });
	return;
});


const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});