import { server } from "./server";

function startApp() {
    server;
}

try {
    startApp();
} catch (error) {
    console.log("Server execution failed :(");
    console.log(error);
}