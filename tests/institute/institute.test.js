// ================= IMPORTS =================

const request = require("supertest");

const app = require("../../src/app");

const {
  loginAndGetToken
} = require("../helpers/auth.helper");

const {
  instituteData
} = require("../utils/testData");

const {
  getAccessToken
} = require("../helpers/token.helper");


// ================= INSTITUTE MODULE =================

describe("INSTITUTE MODULE", () => {

  // ================= BEFORE ALL =================

  beforeAll(async () => {

    // Generate access token
    await loginAndGetToken();

  });

  // ================= INST_01 =================

  test(
    "INST_01 - Create valid institute",
    async () => {

      const response = await request(app)

        .post("/institutes")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send(
          instituteData()
        );

      console.log(response.body);

      expect(response.statusCode)
        .toBe(200);

    }
  );

  // ================= INST_02 =================

  test(
    "INST_02 - Create institute missing fields",
    async () => {

      const response = await request(app)

        .post("/institutes")

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

  // ================= INST_03 =================

  test(
    "INST_03 - Create duplicate institute code",
    async () => {

      const data = instituteData();

      // First create
      await request(app)

        .post("/institutes")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send(data);

      // Duplicate code
      const response =
        await request(app)

          .post("/institutes")

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

  // ================= INST_04 =================

  test(
    "INST_04 - Get institutes list",
    async () => {

      const response = await request(app)

        .get("/institutes")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        );

      console.log(response.body);

      expect(response.statusCode)
        .toBe(200);

    }
  );

  // ================= INST_05 =================

  test(
    "INST_05 - Get institutes without token",
    async () => {

      const response = await request(app)

        .get("/institutes");

      expect(response.statusCode)
        .toBe(401);

    }
  );

  // ================= INST_06 =================

  test(
    "INST_06 - Create institute invalid tenant",
    async () => {

      const response = await request(app)

        .post("/institutes")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...instituteData(),

          tenant_id: "abc"

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= INST_07 =================

  test(
    "INST_07 - Create institute invalid type",
    async () => {

      const response = await request(app)

        .post("/institutes")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...instituteData(),

          type: "@@@"

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= INST_08 =================

  test(
    "INST_08 - Create institute long name",
    async () => {

      const longName =
        "A".repeat(500);

      const response = await request(app)

        .post("/institutes")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...instituteData(),

          name: longName

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= INST_09 =================

  test(
    "INST_09 - Create institute special characters",
    async () => {

      const response = await request(app)

        .post("/institutes")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...instituteData(),

          name: "@@@###"

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= INST_10 =================

  test(
    "INST_10 - Create duplicate institute name",
    async () => {

      const data = instituteData();

      // First institute
      await request(app)

        .post("/institutes")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send(data);

      // Duplicate name
      const response =
        await request(app)

          .post("/institutes")

          .set(
            "Authorization",
            `Bearer ${getAccessToken()}`
          )

          .send({

            ...instituteData(),

            name: data.name

          });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

});