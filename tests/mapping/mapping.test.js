// ================= IMPORTS =================

const request = require("supertest");

const app = require("../../src/app");

const {
  loginAndGetToken
} = require("../helpers/auth.helper");

const {
  mappingData
} = require("../utils/testData");

const {
  getAccessToken
} = require("../helpers/token.helper");


// ================= MAPPING MODULE =================

describe("MAPPING MODULE", () => {

  // ================= BEFORE ALL =================

  beforeAll(async () => {

    // Generate token
    await loginAndGetToken();

  });

// ================= MAP_01 =================

test(
  "MAP_01 - Create valid mapping",
  async () => {

    const response = await request(app)

      .post("/user-institute-roles")

      .set(
        "Authorization",
        `Bearer ${getAccessToken()}`
      )

      .send({

        tenant_id: 1,

        user_id: 4,

        institute_id: 10,

        role_id: 2

      });

    console.log(response.body);

    expect(response.statusCode)
      .toBe(200);

  }
);

  // ================= MAP_02 =================

  test(
    "MAP_02 - Invalid user ID",
    async () => {

      const response = await request(app)

        .post("/user-institute-roles")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...mappingData(),

          user_id: "abc"

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= MAP_03 =================

  test(
    "MAP_03 - Invalid institute ID",
    async () => {

      const response = await request(app)

        .post("/user-institute-roles")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...mappingData(),

          institute_id: "xyz"

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= MAP_04 =================

  test(
    "MAP_04 - Missing required fields",
    async () => {

      const response = await request(app)

        .post("/user-institute-roles")

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

  // ================= MAP_05 =================

  test(
    "MAP_05 - Get mappings list",
    async () => {

      const response = await request(app)

        .get("/user-institute-roles")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        );

      console.log(response.body);

      expect(response.statusCode)
        .toBe(200);

    }
  );

  // ================= MAP_06 =================

  test(
    "MAP_06 - Access mappings without token",
    async () => {

      const response = await request(app)

        .get("/user-institute-roles");

      expect(response.statusCode)
        .toBe(401);

    }
  );

 // ================= MAP_07 =================

test(
  "MAP_07 - Create duplicate mapping",
  async () => {

    const data = {

      tenant_id: 1,

      user_id: 4,

      institute_id: 3,

      role_id: 1

    };

    // First insert
    await request(app)

      .post("/user-institute-roles")

      .set(
        "Authorization",
        `Bearer ${getAccessToken()}`
      )

      .send(data);

    // Duplicate insert
    const response =
      await request(app)

        .post("/user-institute-roles")

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

  // ================= MAP_08 =================

  test(
    "MAP_08 - Invalid tenant ID",
    async () => {

      const response = await request(app)

        .post("/user-institute-roles")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...mappingData(),

          tenant_id: "invalid"

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= MAP_09 =================

  test(
    "MAP_09 - Invalid role ID",
    async () => {

      const response = await request(app)

        .post("/user-institute-roles")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...mappingData(),

          role_id: "wrong"

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= MAP_10 =================

  test(
    "MAP_10 - Cross tenant mapping attempt",
    async () => {

      const response = await request(app)

        .post("/user-institute-roles")

        .set(
          "Authorization",
          `Bearer ${getAccessToken()}`
        )

        .send({

          ...mappingData(),

          tenant_id: 99999

        });

      console.log(response.body);

      expect(response.statusCode)
        .not.toBe(200);

    }
  );

  // ================= MAP_11 =================

test(
  "MAP_11 - Multiple roles same institute",
  async () => {

    const response = await request(app)

      .post("/user-institute-roles")

      .set(
        "Authorization",
        `Bearer ${getAccessToken()}`
      )

      .send({

        tenant_id: 1,

        user_id: 4,

        institute_id: 10,

        role_id: 3

      });

    console.log(response.body);

    expect(response.statusCode)
      .toBe(200);

  }
);

 // ================= MAP_12 =================

test(
  "MAP_12 - Multiple institutes same user",
  async () => {

    const response = await request(app)

      .post("/user-institute-roles")

      .set(
        "Authorization",
        `Bearer ${getAccessToken()}`
      )

      .send({

        tenant_id: 1,

        user_id: 4,

        institute_id: 11,

        role_id: 1

      });

    console.log(response.body);

    expect(response.statusCode)
      .toBe(200);

  }
);

});