import express from 'express';
import qs from 'qs';
const app = express();
import { calculateBmi } from './bmiCalculator';
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


const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});