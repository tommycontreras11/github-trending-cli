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

const today = new Date();
today.setHours(0, 0, 0, 0);

const formatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}}`;
};

const timeRanges = new Map([
  ["day", today],
  ["week", today.setDate(today.getDate() - 7)],
  ["month", today.setMonth(today.getMonth() - 1)],
  ["year", today.setFullYear(today.getFullYear() - 1)],
]);

const findInputById = (id) => inputValidations.find((input) => input.id == id);

const validateInput = (id, value) => {
  const input = findInputById(id);

  if (!input) {
    console.log(`Sorry, the identifier ${id} doesn't exists`);
    return false;
  }

  if (input.type === "number") {
    console.log("value: ", value);
    if (value && !value.startsWith("--")) {
      const inputValue = Number(value);

      if (input.nonNegativeValue && inputValue < 0) {
        console.log(`Sorry, we don't allow negative values`);
        return false;
      }
    }
  }

  if (input?.values && input.values.length > 0) {
    if (value && !value.startsWith("--") && !input.values.includes(value)) {
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

  const countOfProperties =
    arg.length % 2 === 0 ? arg.length / 2 : arg.length - 1;

  for (let i = 0; i < countOfProperties; i++) {
    const isValid = validateInput(
      arg[i == 0 ? 0 : i + 1],
      arg[i == 0 ? i + 1 : i + 2],
    );

    if (!isValid) {
      return true;
    }
  }

  return false;
};

const isAProperty = (input) => input?.startsWith("--");

const getPropertyAndValue = (arg, property) => {
  const propertyIndex = arg.findIndex((p) => p == property);
  const getInputById = findInputById(property);

  return {
    id: arg[propertyIndex],
    value:
      isAProperty(arg[propertyIndex + 1]) || arg[propertyIndex + 1] == undefined
        ? getInputById.defaultValue
        : arg[propertyIndex + 1],
  };
};

export const fetchingData = async (arg) => {
  const invalidInputs = validateInputs(arg);

  if (invalidInputs) return;

  const duration = getPropertyAndValue(arg, "--duration");
  const limit = getPropertyAndValue(arg, "--limit");
};
