import { faker } from "@faker-js/faker"
const generateLocation = () => {
  return {
    _id: faker.datatype.uuid(),
    name: faker.address.cityName(),
    region: faker.address.state(),
    city: faker.address.cityName(),
    status: faker.datatype.boolean() ? "active" : "inactive",
  }
}
const generateLocations = (length = 5) => {
  return Array.from({ length }).map(() => generateLocation())
}

const routes = [
  {
    url: "/location/:id",
    method: "get",
    name: "",
    item: generateLocation(),
  },
  {
    url: "/location/",
    method: "post",
    name: "getLocations",
    items: generateLocations(),
  },
]

export default routes
