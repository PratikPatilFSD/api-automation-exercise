// ================= LOAD ENV =================

require("dotenv").config();


// ================= IMPORT DATABASE =================

const db =
  require("../src/config/db");


// ================= IMPORT SEED FILES =================

const usersSeed =
  require("./users.seed");

const institutesSeed =
  require("./institutes.seed");

const rolesSeed =
  require("./roles.seed");

const mappingsSeed =
  require("./mappings.seed");


// ================= RUN ALL SEEDS =================

const runSeed =
  async () => {

    try {

      console.log(
        "Starting DB seeding..."
      );

      // ================= USERS =================

      await usersSeed(db);

      // ================= ROLES =================

      await rolesSeed(db);

      // ================= INSTITUTES =================

      await institutesSeed(db);

      // ================= MAPPINGS =================

      await mappingsSeed(db);

      console.log(
        "DB seeding completed successfully"
      );

      process.exit(0);

    } catch (error) {

      console.error(
        "Seeding failed:",
        error.message
      );

      process.exit(1);

    }

  };


// ================= START =================

runSeed();