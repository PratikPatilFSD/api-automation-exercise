// ================= IMPORTS =================

const request = require("supertest");

const jwt = require("jsonwebtoken");

const app = require("../../src/app");

const { users } =
require("../utils/testUsers");

const {
  setPreToken,
  getPreToken,
  setAccessToken,
  getAccessToken
} = require("../helpers/token.helper");


// ================= AUTH MODULE =================

describe("AUTH MODULE", () => {

  // ================= AUTH_01 =================

  test(
    "AUTH_01 - Login with valid credentials",
    async () => {

      const response = await request(app)

        .post("/auth/login")

        .send({

          email:
            users.validUser.email,

          password:
            users.validUser.password

        });

      console.log(response.body);

      expect(response.statusCode)
        .toBe(200);

      expect(response.body.success)
        .toBe(true);

      expect(
        response.body.pre_context_token
      ).toBeDefined();

      // Save token
      setPreToken(
        response.body.pre_context_token
      );

    }
  );

  // ================= AUTH_02 =================

  test(
    "AUTH_02 - Login with invalid email",
    async () => {

      const response = await request(app)

        .post("/auth/login")

        .send({

          email:
            users.invalidUser.email,

          password:
            users.invalidUser.password

        });

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= AUTH_03 =================

  test(
    "AUTH_03 - Login with wrong password",
    async () => {

      const response = await request(app)

        .post("/auth/login")

        .send({

          email:
            users.validUser.email,

          password: "wrong123"

        });

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= AUTH_04 =================

  test(
    "AUTH_04 - Login with empty email",
    async () => {

      const response = await request(app)

        .post("/auth/login")

        .send({

          email: "",

          password: "Admin@123"

        });

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= AUTH_05 =================

  test(
    "AUTH_05 - Login with empty password",
    async () => {

      const response = await request(app)

        .post("/auth/login")

        .send({

          email:
            users.validUser.email,

          password: ""

        });

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= AUTH_06 =================

  test(
    "AUTH_06 - Invalid email format",
    async () => {

      const response = await request(app)

        .post("/auth/login")

        .send({

          email: "abc@",

          password: "Admin@123"

        });

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= AUTH_07 =================

  test(
    "AUTH_07 - Fetch institutes with valid token",
    async () => {

      const response = await request(app)

        .get("/auth/my-institutes-roles")

        .set(
          "Authorization",
          `Bearer ${getPreToken()}`
        );

      console.log(response.body);

      expect(response.statusCode)
        .toBe(200);

      expect(response.body.data)
        .toBeDefined();

    }
  );

  // ================= AUTH_08 =================

  test(
    "AUTH_08 - Fetch institutes without token",
    async () => {

      const response = await request(app)

        .get("/auth/my-institutes-roles");

      expect(response.statusCode)
        .toBe(401);

    }
  );

  // ================= AUTH_09 =================

  test(
    "AUTH_09 - Fetch institutes with invalid token",
    async () => {

      const response = await request(app)

        .get("/auth/my-institutes-roles")

        .set(
          "Authorization",
          "Bearer invalid_token"
        );

      expect(response.statusCode)
        .toBe(401);

    }
  );

  // ================= AUTH_10 =================

  test(
    "AUTH_10 - Select valid institute context",
    async () => {

      const roleResponse = await request(app)

        .get("/auth/my-institutes-roles")

        .set(
          "Authorization",
          `Bearer ${getPreToken()}`
        );

      const roleData =
        roleResponse.body.data[0];

      const response = await request(app)

        .post("/auth/select-context")

        .set(
          "Authorization",
          `Bearer ${getPreToken()}`
        )

        .send({

          tenant_id:
            roleData.tenant_id,

          institute_id:
            roleData.institute_id,

          role_id:
            roleData.roles[0].role_id

        });

      console.log(response.body);

      expect(response.statusCode)
        .toBe(200);

      expect(
        response.body.access_token
      ).toBeDefined();

      // Save access token
      setAccessToken(
        response.body.access_token
      );

    }
  );

  // ================= AUTH_11 =================

  test(
    "AUTH_11 - Select context missing fields",
    async () => {

      const response = await request(app)

        .post("/auth/select-context")

        .set(
          "Authorization",
          `Bearer ${getPreToken()}`
        )

        .send({

          tenant_id: 1

        });

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= AUTH_12 =================

  test(
    "AUTH_12 - Select invalid role",
    async () => {

      const response = await request(app)

        .post("/auth/select-context")

        .set(
          "Authorization",
          `Bearer ${getPreToken()}`
        )

        .send({

          tenant_id: 1,

          institute_id: 1,

          role_id: 999

        });

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= AUTH_13 =================

  test(
    "AUTH_13 - Get current profile",
    async () => {

      const response = await request(app)

        .get("/auth/me")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        );

      console.log(response.body);

      expect(response.statusCode)
        .toBe(200);

    }
  );

  // ================= AUTH_14 =================

  test(
    "AUTH_14 - Get profile without token",
    async () => {

      const response = await request(app)

        .get("/auth/me");

      expect(response.statusCode)
        .toBe(401);

    }
  );

  // ================= AUTH_15 =================

  test(
    "AUTH_15 - Logout with valid token",
    async () => {

      const response = await request(app)

        .post("/auth/logout")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        );

      console.log(response.body);

      expect(response.statusCode)
        .toBe(200);

    }
  );

  // ================= AUTH_16 =================

  test(
    "AUTH_16 - Logout without token",
    async () => {

      const response = await request(app)

        .post("/auth/logout");

      expect(response.statusCode)
        .toBe(401);

    }
  );

  // ================= AUTH_17 =================

  test(
    "AUTH_17 - Access API using expired token",
    async () => {

      const response = await request(app)

        .get("/auth/me")

        .set(
          "Authorization",
          "Bearer expired_token"
        );

      expect(response.statusCode)
        .toBe(401);

    }
  );

  // ================= AUTH_18 =================

  test(
    "AUTH_18 - Use wrong token type",
    async () => {

      const response = await request(app)

        .post("/auth/select-context")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          tenant_id: 1,

          institute_id: 1,

          role_id: 1

        });

      expect(response.statusCode)
        .toBe(401);

    }
  );

  // ================= AUTH_19 =================

  test(
    "AUTH_19 - Access protected API using pre-context token",
    async () => {

      const response = await request(app)

        .get("/users")

        .set(
          "Authorization",
          `Bearer ${getPreToken()}`
        );

      expect(response.statusCode)
        .toBe(401);

    }
  );

  // ================= AUTH_20 =================

  test(
    "AUTH_20 - SQL injection login attempt",
    async () => {

      const response = await request(app)

        .post("/auth/login")

        .send({

          email: "' OR 1=1 --",

          password: "test"

        });

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= AUTH_21 =================

  test(
    "AUTH_21 - XSS payload in login",
    async () => {

      const response = await request(app)

        .post("/auth/login")

        .send({

          email:
            "<script>alert(1)</script>",

          password: "Admin@123"

        });

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= AUTH_22 =================

  test(
    "AUTH_22 - Validate JWT payload structure",
    async () => {

      const decoded = jwt.decode(
        getAccessToken()
      );

      console.log(decoded);

      expect(decoded.user_id)
        .toBeDefined();

      expect(decoded.tenant_id)
        .toBeDefined();

      expect(decoded.institute_id)
        .toBeDefined();

      expect(decoded.role_id)
        .toBeDefined();

      expect(decoded.token_type)
        .toBeDefined();

    }
  );

});