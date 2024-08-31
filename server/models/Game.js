import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: true,
  },
  gameName: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  minRequirements: {
    cpu: {
      type: String,
      required: true,
    },
    gpu: {
      type: String,
      required: true,
    },
    ram: {
      type: Number,
      required: true,
    },
    os: {
      type: String,
      required: true,
    },
    bit: {
      type: String,
      required: true,
    },
  },
  recRequirements: {
    cpu: {
      type: String,
      required: true,
    },
    gpu: {
      type: String,
      required: true,
    },
    ram: {
      type: Number,
      required: true,
    },
    os: {
      type: String,
      required: true,
    },
    bit: {
      type: String,
      required: true,
    },
  },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
