import { makeApp } from "./app";

const app = makeApp();
app.listen(3000, () => {
    console.log("on port 3000");
})
