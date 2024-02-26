// fake data resolver
import users from "./user"
import locations from "./user"
const routes = [...users, ...locations]

export default function fakeDataResolver(api) {
  console.log(routes.length)
  const requestedUrl = api.url.slice(0, api.url.indexOf("?"))
  let selectedRoute = routes.find(
    (a) => (a.url = requestedUrl) && a.method == (api.method || "get"),
  )
  console.log(requestedUrl, selectedRoute)
  return selectedRoute
}
