import {
  inputValidations,
  getValuesFromProperties,
  getTrendingRepositories,
} from "./helper.js";

process.stdin.on("data", async (data) => {
  const input = data.toString().trim();
  const inputSplitted = input.split(" ");

  const command = inputSplitted[0];
  const arg = inputSplitted.slice(1);

  switch (command) {
    case "trending-repos":
      const invalidInputs = inputValidations(arg);

      if (invalidInputs) return;

      const { date, limit } = getValuesFromProperties(arg);

      await getTrendingRepositories(date, limit);
      break;
    case "exit":
      process.exit();
    default:
      console.log("Incorrect option.");
  }
});
