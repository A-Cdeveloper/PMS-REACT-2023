const express = require('express')
const dbfunctions = require('../utils/offers-query')
const verifyToken = require('../authMw')

const router = express.Router()

/// full offer list
router.get('/:order', verifyToken, async (req, res) => {
  const { order } = req.params
  const [orderBy, orderDirection] = order.split('=')
  const offers = await dbfunctions.getOffers(orderBy, orderDirection)
  if (offers.length == 0) {
    return res.status(400).json({ message: 'Offer list is empty.' })
  }
  return res.status(231).send(offers)
})

/// filtered and limited offer list
router.get('/filter/:from/:perPage/:order', async (req, res) => {
  const { from, perPage, order } = req.params
  const [orderBy, orderDirection] = order.split('=')

  const offers = await dbfunctions.getOffersRange(
    +from,
    +perPage,
    orderBy,
    orderDirection
  )
  if (offers.length == 0) {
    return res.status(400).json({ message: 'Offer list is empty.' })
  }
  return res.status(231).send(offers)
})

// // single offer
// router.get('/client/:client_id', verifyToken, async (req, res) => {
//   const cid = req.params.client_id
//   const client = await dbfunctions.getSingleClient(cid)
//   if (!client || client.client_id === null) {
//     return res.status(400).json({ message: 'Client not exist.' })
//   }
//   res.status(231).send(client)
// })

// // new offer
router.post('/new', verifyToken, async (req, res) => {
  const postOffer = req.body
  const offer = await dbfunctions.getDuplicateOffer(postoffer.offer_name)
  if (offer) {
    return res.status(400).json({ message: 'Offer already exist.' })
  }
  await dbfunctions.addoffer(postOffer)
  res.status(231).json({ message: 'Offer succesfully added.' })
})

// // duplicate offer
router.post('/:offer_id/duplicate', verifyToken, async (req, res) => {
  const oid = req.params.offer_id
  const offer = await dbfunctions.getSingleOffer(oid)
  if (!offer) {
    return res.status(400).json({ message: 'offer not exist.' })
  }

  offer.offer_name = `${offer.offer_name} - COPY`
  await dbfunctions.addoffer({
    ...offer,
  })
  res.status(231).json({ offer, message: 'Offer succesfully duplicated.' })
})

// // edit offer
router.patch('/:offer_id/edit', verifyToken, async (req, res) => {
  const postOffer = req.body
  const oid = req.params.offer_id
  const offer = await dbfunctions.getSingleOffer(sid)
  if (!offer) {
    return res.status(400).json({ message: 'Offer not exist.' })
  }
  await dbfunctions.updateOffer(postOffer, oid)
  res.status(231).json({ offer, message: 'offer succesfully updated.' })
})

// // delete offer
router.delete('/:offer_id/delete', verifyToken, async (req, res) => {
  const oid = req.params.offer_id

  const offer = await dbfunctions.getSingleOffer(oid)

  if (!offer) {
    return res.status(400).json({ message: 'Offer not exist.' })
  }
  await dbfunctions.deleteOffer(oid)
  res.status(231).json({ offer, message: 'Offer succesfully deleted.' })
})

module.exports = router
