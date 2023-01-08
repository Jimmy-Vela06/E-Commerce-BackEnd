const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [Product],
    });
    if (!categoryData) {
      res.status(404).json({ message: "CATEGORIES NOT FOUND 😰" });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryID = await Category.findByPk(req.params.id);

    if (!categoryID) {
      res.status(404).json({ message: "CATEGORIES ID NOT FOUND 🫣" });
    }

    res.status(200).json(categoryID);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const updateCategory = await Category.create(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategory) {
      res.status(404).json({ message: "CATEGORY CANNOT BE CREATED 🫠" });
      return;
    }

    return res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategory) {
      res.status(404).json({ message: "CATEGORY CANNOT BE UPDATED 🫠" });
      return;
    } else {
      return res.status(200).json(update);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryDelete) {
      res.status(404).json({ message: "ID HAS NO CATEGORY 🥴" });
      return;
    }
    req.status(200).json(categoryDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
