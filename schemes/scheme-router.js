const express = require("express");

const Schemes = require("./scheme-model.js");

const router = express.Router();

// TODO Still need to complete conversion to try/catch

router.get("/", async (req, res) => {
  // New
  try {
    const item = await Schemes.find();
    res.status(200).json({ message: "Successfully ...", item });
  } catch (e) {
    res.status(500).json({ message: "Ruh row...", error: e.message });
  }

  // Old
  // Schemes.find()
  //   .then(schemes => {
  //     res.json(schemes);
  //   })
  //   .catch(err => {
  //     res.status(500).json({ message: "Failed to get schemes" });
  //   });
});

router.get("/:id", async (req, res) => {
  // New
  try {
    const item = await Schemes.findById(req.params.id);
    res.status(200).json({ message: "Successfully ...", item });
  } catch (e) {
    res.status(500).json({ message: "Ruh row...", error: e.message });
  }

  // Old
  // const { id } = req.params;

  // Schemes.findById(id)
  //   .then(scheme => {
  //     if (scheme) {
  //       res.json(scheme);
  //     } else {
  //       res
  //         .status(404)
  //         .json({ message: "Could not find scheme with given id." });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).json({ message: "Failed to get schemes" });
  //   });
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

  // Old
  // const { id } = req.params;

  // Schemes.findSteps(id)
  //   .then(steps => {
  //     if (steps.length) {
  //       res.json(steps);
  //     } else {
  //       res
  //         .status(404)
  //         .json({ message: "Could not find steps for given scheme" });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).json({ message: "Failed to get steps" });
  //   });
});

router.post("/", (req, res) => {
  const schemeData = req.body;

  Schemes.add(schemeData)
    .then(scheme => {
      res.status(201).json(scheme);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new scheme" });
    });
});

router.post("/:id/steps", (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        Schemes.addStep(stepData, id).then(step => {
          res.status(201).json(step);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new step" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        Schemes.update(id, changes).then(updatedScheme => {
          res.json(updatedScheme);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update scheme" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Schemes.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete scheme" });
    });
});

// try {
//   const item = await Schemes.get();
//   res.status(200).json({ message: "Successfully ...", item });
// } catch (e) {
//   res.status(500).json({ message: "Ruh row...", error: e.message });
// }

module.exports = router;
