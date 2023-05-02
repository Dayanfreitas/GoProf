const { User } = require("../model");
const authMiddleware = require('../middlewares/auth');
const authMySelfMiddleware = require('../middlewares/myself');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  // const users = await User.query().findById(1);
  res.status(200).json({ ok: true, users: [] })
});

router.get('/:id', [authMiddleware, authMySelfMiddleware], async (req, res) => {
  const user = await User.query().findById(req.params.id)
  
  if(!user) {
    return res.status(404).json({ ok: false, message: 'User not found'})
  }

  res.status(200).json({ ok: true, user: user })
});


// router.post('/users/term-accepet', [authMiddleware, authMySelfMiddleware], async (req, res) => {
//   const user = await User.query().findById(req.params.id)
  
//   if(!user) {
//     return res.status(404).json({ ok: false, message: 'User not found'})
//   }

//   res.status(200).json({ ok: true, user: user })
// });




module.exports = router