const express = require('express');
const router = express.Router();
const createError = require('http-errors')

const verifyAccessToken = require('../middlewares/verifyAccesToken')

/* GET home page. */
router.get('/', verifyAccessToken, (req, res, next) => {
  res.send({ title: 'Express', payload: req.payload});
});

router.post('/auth/refreshToken', async (req, res, next) => {
  const {token} = req.body;
  try {
    const id = await _broker.utils.verifyRefreshToken(token)
    const accessToken = await _broker.utils.generateAccessToken(id)
    const refreshToken = await _broker.utils.generateRefreshToken(id)
    res.send({
      accessToken,
      refreshToken
    })
  } catch (error) {
    next(createError.Unauthorized())
  }
})

module.exports = router;
