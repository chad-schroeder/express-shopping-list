/* Routes for items. */

const express = require('express');
const router = new express.Router();

const items = [
  {
    id: 1,
    name: 'Peanut butter cookie',
    price: 2.5
  },
  {
    id: 2,
    name: 'Chocolate Chip cookie',
    price: 2.75
  }
];

/** GET /items: get list of items */

router.get('/', function(req, res) {
  return res.json(items);
});

router.post('/', function(req, res, next) {
  // if price is too high, throw error
  if (req.body.price > 5) {
    let err = new Error('You want too much for that cookie!');
    err.status = 418;
    return next(err);
  }

  const item = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price
  };

  items.push(item);

  return res.status(200).json({
    status: 'Added',
    item
  });
});

/** Get /items/[id]: get item, return status */

router.get('/:id', function(req, res, next) {
  const item = items.find(item => item.id === +req.params.id);
  return res.json({ item });
});

/** Patch /items/[id]: patch item, return status */

router.patch('/:id', function(req, res, next) {
  const item = items.find(item => item.id === +req.params.id);
  item.name = req.body.name;
  item.price = req.body.price;
  return res.json({
    message: 'Updated item',
    item
  });
});

/** DELETE /items/[id]: delete item, return status */

router.delete('/:id', function(req, res) {
  const idx = items.findIndex(u => u.id === +req.params.id);
  items.splice(idx, 1);
  return res.json({
    message: 'Deleted',
    items
  });
});

module.exports = router;
