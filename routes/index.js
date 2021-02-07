const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken')

/* GET home page. */
router.get('/', verifyToken, (req, res, next) => {
  res.send({ title: 'Express', payload: req.payload});
});

module.exports = router;
