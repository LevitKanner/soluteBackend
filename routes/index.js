const express = require('express');
const router = express.Router();
const createError = require('http-errors')

const verifyAccessToken = require('../middlewares/verifyAccesToken')
const redisClient = require('../broker/utils/redis')

/* GET home page. */
router.get('/', verifyAccessToken, (req, res, next) => {
  res.send({ title: 'Express', payload: req.payload});
});


router.post('/auth/refreshToken', async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return next(createError.BadRequest())
  try {
    const id = await _broker.utils.verifyRefreshToken(refreshToken)
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

router.post('/auth/logout', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return next(createError.BadRequest())
    const id = await _broker.utils.verifyRefreshToken(refreshToken)

    redisClient.DEL(id, (err, value) => {
      if (err) next(createError.InternalServerError())
    })

    res.sendStatus(204)
  } catch (error) {
    _broker.utils.errorHandler(error, next)
  }
})

module.exports = router;
