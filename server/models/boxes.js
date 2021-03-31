const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      peopleTwo: {
        type: Number,
        required: true,
      },
      peopleFour: {
        type: Number,
        required: true,
      },
    },
    menu: {
      nextWeek: {
        weekNumber: {
          type: Number,
          required: true,
        },
        recipes: {
          recipeOne: {
            img: {
              type: String,
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
            ingredients: [String],
          },
          recipeTwo: {
            img: {
              type: String,
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
            ingredients: [String],
          },
          recipeThree: {
            img: {
              type: String,
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
            ingredients: [String],
          },
        },
      },
      weekAfter: {
        weekNumber: {
          type: Number,
          required: true,
        },
        recipes: {
          recipeOne: {
            img: {
              type: String,
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
            ingredients: [String],
          },
          recipeTwo: {
            img: {
              type: String,
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
            ingredients: [String],
          },
          recipeThree: {
            img: {
              type: String,
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
            ingredients: [String],
          },
        },
      },
    },
  },
);

const Box = mongoose.model('boxes', boxSchema);

module.exports.Box = Box;
