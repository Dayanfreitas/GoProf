const { User } = require("../model");
const multer = require('multer');
const express = require('express');

const router = express.Router();

router.post('/google', async (req, res) => {
    const { 
      family_name,
      given_name,
      email,
      sub,
      image_path
    } = req.body

    try {
      const user = await User.query().findOne({ email: email })
      
      if (user) {
        return res.status(400).send({error: 'E-mail already registered'});
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
        message: 'Successfully authenticated !'
      })

    } catch (err) {
      console.error('user', err)
      return res.status(400).json({ error: 'Registration failed', err})
    }
})

router.get('/', async (req, res) => {
  // const users = await User.query().findById(1);
  res.status(200).json({ ok: true })
});
  
module.exports = router