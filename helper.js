const inputRules = new Map([
  [
    "--duration",
    {
      values: ["day", "week", "month", "year"],
      type: "string",
      defaultValue: "week",
    },
  ],
  [
    "--limit",
    {
      type: "number",
      nonNegativeValue: true,
      defaultValue: 10,
    },
  ],
]);

const findInputById = (id) => inputRules.get(id);

const getTimeByDuration = (duration) => {
  const date = new Date();

  switch (duration) {
    case "day":
      return date;
    case "week":
      return date.setMonth(date.getMonth() - 1);
    case "month":
      return date.setMonth(date.getMonth() - 1);
    case "year":
      return date.setFullYear(date.getFullYear() - 1);
  }
};

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

const isAProperty = (input) => input && input?.startsWith("--");

const inputValidationRules = (id, value) => {
  const input = findInputById(id);

  if (!input) {
    console.log(`Sorry, the identifier ${id} doesn't exists`);
    return false;
  }

  if(isAProperty(value)) return true

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

export const inputValidations = (arg) => {
  if (arg?.length == 0) {
    console.log("You must provided the arguments (--duration, --limit)");
    return;
  }

  const countOfProperties =
    arg.length % 2 === 0 ? arg.length / 2 : arg.length - 1;

  for (let i = 0; i < countOfProperties; i++) {
    const isNotValid = inputValidationRules(
      // The properties are in pair indexes
      arg[i == 0 ? 0 : i + 1],
      // The values are in odd indexes 
      arg[i == 0 ? i + 1 : i + 2],
    );

    if (!isNotValid) return true;
  }

  return false;
};

const getPropertyAndValue = (arg, property) => {
  const propertyIndex = arg.findIndex((p) => p == property);
  const getInputById = findInputById(property);

  return {
    id: arg[propertyIndex],
    value:
    //If the next argument is a property or is undefined, use the default value
      isAProperty(arg[propertyIndex + 1]) || arg[propertyIndex + 1] == undefined
        ? getInputById.defaultValue
        : arg[propertyIndex + 1],
  };
};

export const getValuesFromProperties = (arg) => {
  const duration = getPropertyAndValue(arg, "--duration");
  const getTimeRange = formatDate(getTimeByDuration(duration.value));

  return {
    date: getTimeRange,
    limit: Number(getPropertyAndValue(arg, "--limit").value),
  };
};

const formatRepositories = (repositories) => {
  return repositories.map((repo) => ({
      repository_name: repo.name,
      description: repo?.description ?? "No description provided",
      number_of_starts: repo.stargazers_count,
      language: repo?.language ?? "No language provided",
  }))
};

const isErrorFoundInApi = (data, response) => {
  let isValid = true;

  if (!response.ok) {
    console.log(data);
    isValid = false;
  }

  if (data.status && data.status != 200) {
    console.log(data);
    isValid = false;
  }

  if (data.total_count == 0) {
    console.log("Sorry, not data found, try to select another time range.");
    isValid = false;
  }

  return isValid;
};

const displayRepositories = (repositories) => console.log(repositories) 

export const getTrendingRepositories = async (date, limit) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=created:%3E${date}&sort=stars&order=desc&per_page=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();

    const isValid = isErrorFoundInApi(data, response);
    if (!isValid) return;

    displayRepositories(formatRepositories(data.items));
  } catch (error) {
    console.log("Something went wrong while trying to fetch the data: ", error);
  }
};