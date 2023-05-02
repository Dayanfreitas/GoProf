const { User } = require("../model");
const multer = require('multer');
const express = require('express');

const router = express.Router();

router.post('/token', async (req, res) => {
  const { 
    email,
    sub
  } = req.body

  try{
    const user = await User.query().findOne({ email: email, token_sub_google: sub })
    
    res.status(200).json({ ok: true, user: { email, sub }, token: user.generateToken() })
  }catch (err) {
    return res.status(500).json({ message: "Erro genereted token", err})
  }
})

router.post('/google', async (req, res) => {
    const { 
      family_name,
      given_name,
      email,
      sub,
      image_path
    } = req.body

    try {
      const user = await User.query().findOne({ email: email, token_sub_google: sub })

      if (user) {
        return res.status(200).send({ user, token: user.generateToken(), message: 'E-mail already registered'});
      }

      const userCreated = await User.query().insert({
          name: given_name,
          last_name: family_name,
          email,
          token_sub_google: sub || ' ',
          image_path: image_path || null
      });

      return res.status(200).json({
        user: userCreated,
        token: userCreated.generateToken(),
        message: 'Successfully authenticated !'
      })

    } catch (err) {
      return res.status(400).json({ message: 'Registration failed', err})
    }
})

router.get('/', async (req, res) => {
  // const users = await User.query().findById(1);
  res.status(200).json({ ok: true })
});
  
module.exports = router