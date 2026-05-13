// ================= IMPORTS =================

const request = require("supertest");

const app = require("../../src/app");

const {
  loginAndGetToken
} = require("../helpers/auth.helper");

const {
  roleData
} = require("../utils/testData");

const {
  getAccessToken
} = require("../helpers/token.helper");


// ================= ROLE MODULE =================

describe("ROLE MODULE", () => {

  // ================= BEFORE ALL =================

  beforeAll(async () => {

    // Generate token
    await loginAndGetToken();

  });

  // ================= ROLE_01 =================

  test(
    "ROLE_01 - Create valid role",
    async () => {

      const response = await request(app)

        .post("/roles")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send(
          roleData()
        );

      console.log(response.body);

      expect(response.statusCode)
        .toBe(200);

    }
  );

  // ================= ROLE_02 =================

  test(
    "ROLE_02 - Create duplicate role",
    async () => {

      const data = roleData();

      // First role
      await request(app)

        .post("/roles")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send(data);

      // Duplicate role
      const response =
        await request(app)

          .post("/roles")

          .set(
            "Authorization",
            `Bearer ${getAccessToken()}`
          )

          .send({

            ...roleData(),

            name: data.name

          });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= ROLE_03 =================

  test(
    "ROLE_03 - Create role missing fields",
    async () => {

      const response = await request(app)

        .post("/roles")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({});

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= ROLE_04 =================

  test(
    "ROLE_04 - Get roles list",
    async () => {

      const response = await request(app)

        .get("/roles")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        );

      console.log(response.body);

      expect(response.statusCode)
        .toBe(200);

    }
  );

  // ================= ROLE_05 =================

  test(
    "ROLE_05 - Create duplicate role code",
    async () => {

      const data = roleData();

      // First role
      await request(app)

        .post("/roles")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send(data);

      // Duplicate code
      const response =
        await request(app)

          .post("/roles")

          .set(
            "Authorization",
            `Bearer ${getAccessToken()}`
          )

          .send({

            ...roleData(),

            code: data.code

          });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= ROLE_06 =================

  test(
    "ROLE_06 - Create role without code",
    async () => {

      const data = roleData();

      delete data.code;

      const response = await request(app)

        .post("/roles")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send(data);

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= ROLE_07 =================

  test(
    "ROLE_07 - Create role long name",
    async () => {

      const longName =
        "A".repeat(500);

      const response = await request(app)

        .post("/roles")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...roleData(),

          name: longName

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= ROLE_08 =================

  test(
    "ROLE_08 - Create role invalid characters",
    async () => {

      const response = await request(app)

        .post("/roles")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...roleData(),

          name: "@@@###"

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= ROLE_09 =================

  test(
    "ROLE_09 - Access roles without token",
    async () => {

      const response = await request(app)

        .get("/roles");

      expect(response.statusCode)
        .toBe(401);

    }
  );

});