// ================= IMPORT DB CONNECTION =================

const db = require("../../src/config/db");


// ================= CLEAN USERS =================

const cleanUsers = async () => {

  await db.query(`

    DELETE FROM users
    WHERE email LIKE 'test%@mail.com'

  `);

};


// ================= CLEAN INSTITUTES =================

const cleanInstitutes = async () => {

  await db.query(`

    DELETE FROM institutes
    WHERE code LIKE 'CODE%'

  `);

};


// ================= CLEAN ROLES =================

const cleanRoles = async () => {

  await db.query(`

    DELETE FROM roles
    WHERE code LIKE 'role_%'

  `);

};


// ================= CLEAN MAPPINGS =================

const cleanMappings = async () => {

  await db.query(`

    DELETE FROM user_institute_roles

  `);

};


// ================= CLEAN ALL TEST DATA =================

const cleanTestData = async () => {

  try {

    // Child tables first
    await cleanMappings();

    // Parent tables
    await cleanUsers();

    await cleanInstitutes();

    await cleanRoles();

    console.log(
      "Test data cleanup completed"
    );

  } catch (error) {

    console.error(
      "DB CLEANUP ERROR:",
      error.message
    );

  }

};


// ================= CLOSE DB CONNECTION =================

const closeDB = async () => {

  await db.end();

  console.log(
    "Database connection closed"
  );

};


// ================= EXPORT =================

module.exports = {

  cleanUsers,

  cleanInstitutes,

  cleanRoles,

  cleanMappings,

  cleanTestData,

  closeDB

};