const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


  // find all categories
  // be sure to include its associated Products
  router.get('/', (req, res) => {
    try {
      const categories = Category.findAll({
        include: [Product],
      });
      res.json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

router.get('/:id', (req, res) => {

  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })

    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
});

  // find one category by its `id` value
  // be sure to include its associated Products
 // Define a middleware function to handle errors

// Define route handlers using async/await
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    handleErrors(res, err);
  }
});



router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    handleErrors(res, err);
  }
});



router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category) => res.status(200).json(category))
  .catch((err) => res.status(400).json(err));
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  router.delete('/:id', (req, res) => {
    Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((category) => res.status(200).json(category))
      .catch((err) => res.status(400).json(err));
  });
});

module.exports = router;
