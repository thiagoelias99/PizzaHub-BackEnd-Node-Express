import { StatusCodes } from "http-status-codes";
import { testServer } from "./jest.setup";


const route = "ingredients";

describe("Post route tests", () => {
    test("Create a ingredient with success", async () => {
        const data = {
            description: "Test Ingredient",
            value: 10.99
        };

        await testServer.connect("http://localhost:3333/");
        const response = await testServer.post(route).send(data);

        // expect(response.statusCode).toEqual(StatusCodes.CREATED);
    });
});