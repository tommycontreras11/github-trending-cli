const inputValidations = [
  {
    id: "--duration",
    values: ["day", "week", "month", "year"],
    type: "string",
    defaultValue: "week",
  },
  {
    id: "--limit",
    type: "number",
    nonNegativeValue: true,
    defaultValue: 10,
  },
];

const findInputById = (id) => inputValidations.find((input) => input.id == id);

const validateInput = (id, value) => {
  const input = findInputById(id);

  if (!input) {
    console.log(`Sorry, the identifier ${id} doesn't exists`);
    return false;
  }

  if (input.type === "number") {
    const inputValue = Number(value);

    if (input.nonNegativeValue && inputValue < 0) {
      console.log(`Sorry, we don't allow negative values`);
      return false;
    }
  }

  if (input?.values && input.values.length > 0) {
    if (!input.values.includes(value)) {
      console.log(
        `Sorry, the values we allow for the id "${id}" are ${input.values}`,
      );
      return false;
    }
  }

  return true;
};

const validateInputs = (arg) => {
  if (arg?.length == 0) {
    console.log("You must provided the arguments (--duration, --limit)");
    return;
  }

  let countOfProperties =
    arg.length % 2 === 0 ? arg.length / 2 : arg.length - 1;

  for (let i = 0; i < countOfProperties; i++) {
    const isValid = validateInput(
      arg[i == 0 ? 0 : i + 1],
      arg[i == 0 ? i + 1 : i + 2],
    );

    if (!isValid) break;
  }
};

export const fetchingData = (arg) => {
  validateInputs(arg);
};
