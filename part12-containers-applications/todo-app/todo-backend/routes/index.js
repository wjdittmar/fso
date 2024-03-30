const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const redis = require('../redis')
let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
	visits++

	res.send({
		...configs,
		visits
	});
});

router.get('/statistics', async (req, res) => {
	redis.getAsync("added_todos").then((result) => {
		res.send({
			"added_todos": result
		})
	})
})


module.exports = router;
