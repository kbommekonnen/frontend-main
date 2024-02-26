const isUserSignedIn = localStorage.getItem("_u_k")
// import protectedApp from "./src/main"
// import landingPage from "./src/landingPage/index.js"
let page
if (isUserSignedIn) {
    page = import('./src/main')
//   protectedApp()
} else {
    page = import('./src/landingPage/index.js')
//   landingPage()
}
page.then((app)=> {
    app.default()
    console.log(app.default)
})
