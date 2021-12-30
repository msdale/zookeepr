const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal
} = require("../lib/animals");
const { animals } = require("../data/animals");

test("create an animal object", () => {
  const animal = createNewAnimal(
    { name: "Darlene", id: "jg87kdk" }, animals
  );

  expect(animal.name).toBe("Darlene");
  expect(animal.id).toBe("jg87kdk");
});

test("filters by query", () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    }
  ];

  const filteredAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);
  expect(filteredAnimals.length).toEqual(1);
});

test("find animal by id", () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    }
  ];

  const foundAnimal = findById("3", startingAnimals);
  expect(foundAnimal.name).toBe("Erica");
});

test("validate personality traits", () => {
  const animal = {
    id: "kdkd",
    name: "JoJo",
    species: "rabbit",
    diet: "herbivore",
    personalityTraits: ["cute", "cuddly"]
  }; 
  const invalidAnimal = {
    id: "123",
    name: "Simpson",
    species: "pig",
    diet: "omnivore",
  }; 

  const result = validateAnimal(animal);
  const invalidResult = validateAnimal(invalidAnimal);

  expect(result).toBe(true);
  expect(invalidResult).toBe(false);
})