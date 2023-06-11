const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!categoryData) {
      res.status(400).json({ message: `No category with that ID.` });
      return;
    }
    res.status(200).json({ message: `Updated category successfully` });
  } catch (err) {
    res.status(500).json({ message: `Unable to update category.`, err });
    return;
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id);

    if (!categoryData) {
      res
        .status(400)
        .json({ message: `No category found with this ID` });
      return;
    }
    await categoryData.destroy();

    res.status(200).json({ message: `Category successfully deleted.` });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error deleting category data on db.`, err });
  }
});

module.exports = router;
