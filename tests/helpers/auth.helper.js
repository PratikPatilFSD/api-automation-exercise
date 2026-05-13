// ================= IMPORTS =================

const request = require("supertest");

const app = require("../../src/app");

const {

  setAccessToken,

  setPreContextToken,

  getPreContextToken

} = require("./token.helper");


// ================= LOGIN + TOKEN =================

const loginAndGetToken =
  async () => {

    // LOGIN
    const loginResponse =
      await request(app)

        .post("/auth/login")

        .send({

          email: "d@scos.com",

          password: "Admin@123"

        });

    // PRE TOKEN
    const preToken =

      loginResponse.body
        .pre_context_token ||

      loginResponse.body.data
        ?.pre_context_token;

    // SAVE PRE TOKEN
    setPreContextToken(preToken);

    // GET INSTITUTES
    const institutesResponse =
      await request(app)

        .get(
          "/auth/my-institutes-roles"
        )

        .set(
          "Authorization",
          `Bearer ${preToken}`
        );

    const institute =
      institutesResponse.body
        .data[0];

    // SELECT CONTEXT
    const contextResponse =
      await request(app)

        .post(
          "/auth/select-context"
        )

        .set(
          "Authorization",
          `Bearer ${preToken}`
        )

        .send({

          tenant_id:
            institute.tenant_id,

          institute_id:
            institute.institute_id,

          role_id:
            institute.roles[0]
              .role_id

        });

    // ACCESS TOKEN
    const accessToken =

      contextResponse.body
        .access_token ||

      contextResponse.body.data
        ?.access_token;

    // SAVE ACCESS TOKEN
    setAccessToken(accessToken);

  };


// ================= EXPORT =================

module.exports = {

  loginAndGetToken,

  getPreContextToken

};