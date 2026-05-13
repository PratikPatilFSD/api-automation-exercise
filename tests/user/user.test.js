// ================= IMPORTS =================

const request = require("supertest");

const app = require("../../src/app");

const {
  loginAndGetToken
} = require("../helpers/auth.helper");

const {
  userData
} = require("../utils/testData");

const {
  getAccessToken
} = require("../helpers/token.helper");


// ================= USER MODULE =================

describe("USER MODULE", () => {

  // ================= BEFORE ALL =================

  beforeAll(async () => {

    // Login and generate token
    await loginAndGetToken();

  });

  // ================= USER_01 =================

  test(
    "USER_01 - Create valid user",
    async () => {

      const response = await request(app)

        .post("/users")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send(
          userData()
        );

      console.log(response.body);

      expect(response.statusCode)
        .toBe(200);

    }
  );

  // ================= USER_02 =================

  test(
    "USER_02 - Create duplicate email user",
    async () => {

      const data = userData();

      // First user
      await request(app)

        .post("/users")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send(data);

      // Duplicate
      const response =
        await request(app)

          .post("/users")

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

  // ================= USER_03 =================

  test(
    "USER_03 - Create user missing fields",
    async () => {

      const response = await request(app)

        .post("/users")

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

  // ================= USER_04 =================

  test(
    "USER_04 - Create user invalid email",
    async () => {

      const response = await request(app)

        .post("/users")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...userData(),

          email: "abc@"

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= USER_05 =================

  test(
    "USER_05 - Create user weak password",
    async () => {

      const response = await request(app)

        .post("/users")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...userData(),

          password: "123"

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= USER_06 =================

  test(
    "USER_06 - Get users list",
    async () => {

      const response = await request(app)

        .get("/users")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        );

      console.log(response.body);

      expect(response.statusCode)
        .toBe(200);

    }
  );

  // ================= USER_07 =================

  test(
    "USER_07 - Get users without token",
    async () => {

      const response = await request(app)

        .get("/users");

      expect(response.statusCode)
        .toBe(401);

    }
  );

  // ================= USER_08 =================

  test(
    "USER_08 - Get users with invalid token",
    async () => {

      const response = await request(app)

        .get("/users")

        .set(
          "Authorization",
          "Bearer invalid_token"
        );

      expect(response.statusCode)
        .toBe(401);

    }
  );

  // ================= USER_09 =================

  test(
    "USER_09 - Create duplicate mobile",
    async () => {

      const data = userData();

      // First user
      await request(app)

        .post("/users")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send(data);

      // Duplicate mobile
      const response =
        await request(app)

          .post("/users")

          .set(
            "Authorization",
            `Bearer ${getAccessToken()}`
          )

          .send({

            ...userData(),

            mobile: data.mobile

          });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= USER_10 =================

  test(
    "USER_10 - Create user with very long name",
    async () => {

      const longName =
        "A".repeat(500);

      const response = await request(app)

        .post("/users")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...userData(),

          first_name: longName

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= USER_11 =================

  test(
    "USER_11 - Create user with special characters",
    async () => {

      const response = await request(app)

        .post("/users")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...userData(),

          first_name: "@@@###"

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= USER_12 =================

  test(
    "USER_12 - SQL injection in user input",
    async () => {

      const response = await request(app)

        .post("/users")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...userData(),

          first_name:
            "' DROP TABLE users --"

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= USER_13 =================

  test(
    "USER_13 - Inactive user login attempt",
    async () => {

      const response = await request(app)

        .post("/auth/login")

        .send({

          email:
            "inactive@mail.com",

          password:
            "Admin@123"

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= USER_14 =================

  test(
    "USER_14 - Verify password not returned",
    async () => {

      const response = await request(app)

        .post("/users")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send(
          userData()
        );

      console.log(response.body);

      expect(response.body.password)
        .toBeUndefined();

      expect(
        response.body.password_hash
      ).toBeUndefined();

    }
  );

});