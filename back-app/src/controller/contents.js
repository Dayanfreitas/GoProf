const { Content } = require("../model");
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const contents = await Content.query().select('id').from('contents')
  
  const contentsIds = contents.map(content => {
    return content.id
  })

  res.status(200).json({ ok: true, contents: contentsIds })
})

router.get('/:id', async (req, res) => {
  const content = await Content.query().findById(req.params.id)
  res.status(200).json({ ok: true, content })
})


module.exports = router