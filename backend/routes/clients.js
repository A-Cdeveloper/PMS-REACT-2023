const express = require('express')
const dbfunctions = require('../utils/clients-query')

const router = express.Router()
// /users

router.get('/:order', async (req, res) => {
  const { order } = req.params
  const [orderBy, orderDirection] = order.split('=')
  const clients = await dbfunctions.getClients(orderBy, orderDirection)
  if (clients.length == 0) {
    return res.status(400).json({ message: 'Clients list is empty.' })
  }

  return res.status(231).send(clients)
})

router.get('/filter/:from/:perPage/:order', async (req, res) => {
  const { from, perPage, order } = req.params
  const [orderBy, orderDirection] = order.split('=')

  const clients = await dbfunctions.getClientsRange(
    +from,
    +perPage,
    orderBy,
    orderDirection
  )
  if (clients.length == 0) {
    return res.status(400).json({ message: 'Clients list is empty.' })
  }
  // setTimeout(() => {
  //   return res.status(231).send(clients);
  // }, 6000);
  return res.status(231).send(clients)
})

router.get('/client/:client_id', async (req, res) => {
  const cid = req.params.client_id
  const client = await dbfunctions.getSingleClient(cid)
  if (!client) {
    return res.status(400).json({ message: 'Client not exist.' })
  }
  res.status(231).send(client)
})

router.post('/new', async (req, res) => {
  const postClient = req.body
  const client = await dbfunctions.getSingleClient(postClient.client_name)
  if (client) {
    return res.status(400).json({ message: 'Client already exist.' })
  }
  await dbfunctions.addClient(postClient)
  res.status(231).json({ message: 'Client succesfully added.' })
})

router.post('/:client_id/duplicate', async (req, res) => {
  const cid = req.params.client_id
  const client = await dbfunctions.getSingleClient(null, cid)
  if (!client) {
    return res.status(400).json({ message: 'Client not exist.' })
  }
  let {
    client_name,
    client_adresse,
    client_contact,
    client_phone,
    client_fax,
    client_email,
    client_site,
  } = client
  client_name = `${client_name} - COPY`
  await dbfunctions.addClient({
    client_name,
    client_adresse,
    client_contact,
    client_phone,
    client_fax,
    client_email,
    client_site,
  })
  res.status(231).json({ client, message: 'Client succesfully duplicated.' })
})

router.patch('/:client_id/edit', async (req, res) => {
  const postClient = req.body
  const cid = req.params.client_id
  const client = await dbfunctions.getSingleClient(null, cid)
  if (!client) {
    return res.status(400).json({ message: 'Client not exist.' })
  }
  await dbfunctions.updateClient(postClient, cid)
  res.status(231).json({ client, message: 'Client succesfully updated.' })
})

router.delete('/:client_id/delete', async (req, res) => {
  const cid = req.params.client_id
  const client = await dbfunctions.getSingleClient(null, cid)
  if (!client) {
    return res.status(400).json({ message: 'Client not exist.' })
  }
  await dbfunctions.deleteClient(cid)
  res.status(231).json({ client, message: 'Client succesfully deleted.' })
})

module.exports = router
