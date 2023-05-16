const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide title of task to reminded of"],
      maxlength: [100, "Title must not be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide task description"],
      maxlength: [1000, "Description must not be more than 1000 characters"],
    },
    category: {
      type: String,
      required: [true, "Please provide category task falls under"],
      enum: {
        values: ["work", "chores","personal", "shopping", "recreation", "study", "other"], 
        message: `{VALUE} is not supported!! Pick any of the following categories: ["work", "chores", "shopping", "recreation", "study", "other"]`,
      },
    },
    status: {
        type: String,
        enum:['pending','in-process','completed'],
        default:'pending'
    },
    date: {
        type: Date,
        required: true
      },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Task", TaskSchema);
