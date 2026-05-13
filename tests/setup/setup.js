// ================= GLOBAL TEST SETUP =================

const {
  cleanTestData,
  closeDB
} = require("../helpers/db.helper");


// ================= BEFORE ALL TESTS =================

beforeAll(async () => {

  console.log(
    "Starting Jest + Supertest tests..."
  );

});


// ================= BEFORE EACH TEST =================

beforeEach(async () => {

  // Optional:
  // reset mocks
  // clear cache
  // prepare seed data

});


// ================= AFTER EACH TEST =================

afterEach(async () => {

  // Optional cleanup per test

});


// ================= AFTER ALL TESTS =================

afterAll(async () => {

  // Clean all test records
  await cleanTestData();

  // Close DB pool connection
  await closeDB();

  console.log(
    "All tests completed"
  );

});