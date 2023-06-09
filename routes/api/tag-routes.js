const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with this ID" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (!tagData) {
      res.status(400).json({ message: `No tag found with this ID.` });
      return;
    }
    res.status(200).json({ message: `Updated tag successfully` });
  } catch (err) {
    res.status(500).json({ message: `Unable to update tag.`, err });
    return;
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id);

    if (!tagData) {
      res
        .status(400)
        .json({ message: `No tag found with this ID` });
      return;
    }
    await tagData.destroy();

    res.status(200).json({ message: `Tag successfully deleted.` });
  } catch (err) {
    res.status(500).json({ message: `Error deleting tag data on db.`, err });
  }
});


module.exports = router;
