// import { faker } from "@faker-js/faker";
const generateUser = () => {
  return {
    // _id: faker.datatype.uuid(),
    // firstName: faker.name.firstName(),
    // lastName: faker.name.lastName(),
    // organization: faker.datatype.uuid(),
  }
}
const generateUsers = (length = 5) => {
  return Array.from({ length }).map(() => generateUser())
}

const routes = [
  {
    url: "/credential/me",
    method: "get",
    name: "",
    item: generateUser(),
  },
  {
    url: "/credential",
    method: "get",
    name: "",
    items: generateUsers(),
  },
]

export default routes
