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

const timeRanges = new Map([
  ["day", new Date()],
  ["week", new Date().setDate(new Date().getDate() - 7)],
  ["month", new Date().setMonth(new Date().getMonth() - 1)],
  ["year", new Date().setFullYear(new Date().getFullYear() - 1)],
]);

const formatDate = (dateToFormat) => {
  const date = new Date(dateToFormat);

  let month = date.getMonth(),
    day = date.getDate();

  if (date.getMonth() < 10) {
    month = `0${date.getMonth() + 1}`;
  }

  if (date.getDate() < 10) {
    day = `0${date.getDate()}`;
  }

  return `${date.getFullYear()}-${month}-${day}`;
};

const findInputById = (id) => inputValidations.find((input) => input.id == id);

const validateInput = (id, value) => {
  const input = findInputById(id);

  if (!input) {
    console.log(`Sorry, the identifier ${id} doesn't exists`);
    return false;
  }

  if (input.type === "number") {
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

  const getTimeRange = formatDate(timeRanges.get(duration.value));

  try {
    const response = await fetch(
      `https://api.github.com/search/repositorie`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();

    if (data.status != 200) {
      console.log(data);
    }
  } catch (error) {
    console.log("Something went wrong while trying to fetch the data: ", error);
  }
};
