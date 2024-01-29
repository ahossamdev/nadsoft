const axios = require("axios");

describe("server", () => {
  let server;
  beforeAll(() => {
    server = require("../index").server;
  });
  afterAll(() => {
    server.close();
  });

  // Retreiving users
  describe("GET / users", () => {
    let request = {};
    beforeAll(async () => {
      const res = await axios.get("http://localhost:3000/users");
      request.status = res.status;
      request.data = res.data;
    });

    it("Status 200", function () {
      expect(request.status).toBe(200);
    });

    it("Users Should be returned ", function () {
      expect(request.data?.length).toBeGreaterThanOrEqual(0);
    });
  });

  // Adding users
  describe("Post / user", () => {
    let request = {
      name: "Ahmed Hossam",
      email: "ahossamdev@gmail.com",
      age: 27,
      country: "Egypt",
      mobile: "01234567890",
    };
    beforeAll(async () => {
      const res = await axios.post(
        "http://localhost:3000/user/create",
        request
      );
      request.status = res.status;
      request.data = res.data;
    });

    it("Status 200", function () {
      expect(request.status).toBe(200);
    });

    it("User should be created", function () {
      expect(request.data.id).toBeTruthy();
    });
  });

  // update user (please make sure to select an existing id saved to database)
  describe("Update / user", () => {
    let request = {
      name: "mohamed adel",
      email: "madel@gmail.com",
      age: 37,
      country: "egypt",
      mobile: "01234567890",
    };
    beforeAll(async () => {
      const res = await axios.patch(
        "http://localhost:3000/user/update/65b5b018194ee83040d285b3",
        request
      );
      request.status = res.status;
      request.data = res.data;
    });

    it("Status 200", function () {
      expect(request.status).toBe(200);
    });

    it("User should be updated", function () {
      expect(request.data.name).toBe(request.name);
    });
  });

  // delete user (please make sure to select an existing id saved to database)
  describe("Delete / user", () => {
    let request = {};
    beforeAll(async () => {
      const res = await axios.delete(
        "http://localhost:3000/user/delete/65b659c3ac54d651f16940aa",
        {
          headers: {
            name: process.env.USER_NAME || "nadsoft",
            password: process.env.PASSWORD || "nadsoft123",
          },
        }
      );
      request.status = res.status;
      request.data = res.data;
    });

    it("Status 200", function () {
      expect(request.status).toBe(200);
    });

    it("User should be deleted", function () {
      expect(request.data.id).toBeTruthy();
    });
  });
});
