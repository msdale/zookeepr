const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper
} = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers");


jest.mock('fs');
test("create a zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name: "Darlene", id: "jg87kdk" }, zookeepers
  );

  expect(zookeeper.name).toBe("Darlene");
  expect(zookeeper.id).toBe("jg87kdk");
});

test("filters by query", () => {
  const startingZookeepers = [
    {
      id: "3",
      age: 30,
      name: "Erica",
      favoriteAnimal: "otter"
    },
    {
      id: "4",
      age: 25,
      name: "Joe",
      favoriteAnimal: "deer"
    }
  ];

  const filteredZookeepers = filterByQuery({ favoriteAnimal: "deer" }, startingZookeepers);
  expect(filteredZookeepers.length).toEqual(1);
});

test("find zookeeper by id", () => {
  const startingZookeepers = [
    {
      id: "3",
      age: 30,
      name: "Erica",
      favoriteAnimal: "otter"
    },
    {
      id: "4",
      age: 25,
      name: "Joe",
      favoriteAnimal: "deer"
    }
  ];

  const foundZookeeper = findById("3", startingZookeepers);
  expect(foundZookeeper.name).toBe("Erica");
});

test("validate favorite animal", () => {
  const zookeeper = {
    id: "kdkd",
    age: 32,
    name: "Rebecca",
    favoriteAnimal: "turtle" 
  }; 

  const invalidZookeeper = {
    id: "123",
    age: 41,
    name: "Simpson"
  }; 

  const result = validateZookeeper(zookeeper);
  const invalidResult = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(invalidResult).toBe(false);
});