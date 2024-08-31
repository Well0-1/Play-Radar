import express from "express";
import Game from "../models/Game.js";

const router = express.Router();

router.post("/add-game", async (req, res) => {
  const { imgUrl, gameName, company, releaseDate, minRequirements, recRequirements } = req.body;

  try {
    const newGame = new Game({
      imgUrl,
      gameName,
      company,
      releaseDate,
      minRequirements,
      recRequirements,
    });

    await newGame.save();
    res.status(201).json({ message: "Game created successfully", game: newGame });
  } catch (error) {
    res.status(500).json({ error: "Failed to create game", details: error.message });
  }
});

router.get("/games", async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve games" });
  }
});

router.get("/game/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve game" });
  }
});

router.put("/game/:id", async (req, res) => {
  const { imageUrl, gameName, company, releaseDate, minRequirements, recRequirements } = req.body;

  try {
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      { imageUrl, gameName, company, releaseDate, minRequirements, recRequirements },
      { new: true }
    );

    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json({ message: "Game updated successfully", game: updatedGame });
  } catch (error) {
    res.status(500).json({ error: "Failed to update game" });
  }
});

router.delete("/game/:id", async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete game" });
  }
});

export default router;
