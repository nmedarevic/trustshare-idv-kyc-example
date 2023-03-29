const express = require('express')
const { default: createClient } = require('@trustshare/api');
const { env } = require("../env");
const app = express()
const port = 4000

const trustshare = createClient(env.secretKey);

app.get('/get-verification', async (req, res) => {
  console.log("-----------------------------")
  const participant = await trustshare.api.v1.createParticipant({
    email: `emailparticipant+${Math.random()}@email.com`
  })

  const result = await trustshare.api.v1.createVerification({
    id: participant.api.v1.createParticipant.id,
  });

  console.log(result.api.v1)
  console.log({
    participantSecret: result.api.v1.createVerification.client_secret,
    participantId: result.api.v1.createVerification.participant.id
  })
  res.set('Access-Control-Allow-Origin', req.get('origin'));
  res.json({
    participantSecret: result.api.v1.createVerification.client_secret,
    participantId: result.api.v1.createVerification.participant.id
  })
  console.log("-----------------------------\n\n")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


