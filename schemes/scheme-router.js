const express = require("express");

const Schemes = require("./scheme-model.js");

const router = express.Router();

router.get("/", async (req, res) => {
  // New
  try {
    const item = await Schemes.find();
    res.status(200).json({ message: "Successfully ...", item });
  } catch (e) {
    res.status(500).json({ message: "Ruh row...", error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  // New
  try {
    const item = await Schemes.findById(req.params.id);
    res.status(200).json({ message: "Successfully ...", item });
  } catch (e) {
    res.status(500).json({ message: "Ruh row...", error: e.message });
  }
});

router.get("/:id/steps", async (req, res) => {
  // New
  try {
    const item = await Schemes.findSteps(req.params.id);
    if (!!item) {
      res.status(200).json({ message: "Successfully ...", item });
    } else {
      res.status(404).json({ message: "No items", item });
    }
  } catch (e) {
    res.status(500).json({ message: "Ruh row...", error: e.message });
  }
});

router.post("/", async (req, res) => {
try {
  const item = await Schemes.add(req.body);
  res.status(201).json({ message: "Successfully ...", item });
} catch (e) {
  res.status(500).json({ message: "Ruh row...", error: e.message });
}
});

router.post("/:id/steps", async (req, res) => {

  try {
  const item = await Schemes.findById(req.params.id);
  if(!!item){
    await Schemes.addStep(req.body, req.params.id)
    res.status(200).json({ message: "Successfully ...", item });
  } else {
    res.status(404).json({ message: "Couldn't find scheme" })
  }
} catch (e) {
  res.status(500).json({ message: "Ruh row...", error: e.message });
}
});

router.put("/:id", async (req, res) => {

  try {
    const item = await Schemes.findById(req.params.id);
    if(!!item){
      await Schemes.update(req.params.id, req.body)
      res.status(200).json({ message: "Successfully ...", item });
    } else {
      res.status(404).json({ message: "Couldn't find scheme" })
    }
  } catch (e) {
    res.status(500).json({ message: "Ruh row...", error: e.message });
  }
});

router.delete("/:id", async (req, res) => {

  try {
    const item = await Schemes.remove(req.params.id);
    if(!!item){
      res.status(200).json({ message: "Successfully ...", item });
    } else {
      res.status(404).json({ message: "Couldn't find scheme" })
    }
  } catch (e) {
    res.status(500).json({ message: "Ruh row...", error: e.message });
  }
});

module.exports = router;
