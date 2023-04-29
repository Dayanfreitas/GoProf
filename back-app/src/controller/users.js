const { User } = require("../model");

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  // const users = await User.query().findById(1);
  res.status(200).json({ ok: true, users: [] })
});


module.exports = router