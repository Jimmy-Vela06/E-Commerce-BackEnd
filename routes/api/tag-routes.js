const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
const { create } = require("../../models/Product");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagData) {
      res.status(404).json("NO TAGE FOUND 🫤");
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag_ID = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tag_ID) {
      res.status(404).json("NO TAG ID FOUND 🙄");
      return;
    }
    res.status(200).json(tag_ID);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(createTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagUpdate) {
      res.status(404).json("TAG ID DOES NOT EXIST 😵‍💫");
      return;
    }
    res.status(200).json(tagUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagDelete) {
      res.status(404).json("TAG CANNOT BE DELETED ☹️");
      return;
    }
    res.json(200).json(tagDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
