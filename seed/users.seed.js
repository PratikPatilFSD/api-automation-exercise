// ================= USERS SEED =================

const usersSeed = async (db) => {

  // Same hashed password for all users
  // Password = Admin@123

  const passwordHash =
    "$2b$10$qA6PnCLxa.LIcdehIsl6f.Q0ZVtWfAzWbVx8svO7/nrYtGQ.mdAg2";

  // ================= USERS DATA =================

  const users = [

    {
      first_name: "Aman",
      last_name: "Sharma",
      full_name: "Aman Sharma",
      email: "a@scos.com",
      mobile: "9999999991"
    },

    {
      first_name: "Ben",
      last_name: "Thomas",
      full_name: "Ben Thomas",
      email: "b@scos.com",
      mobile: "9999999992"
    },

    {
      first_name: "Chris",
      last_name: "Wilson",
      full_name: "Chris Wilson",
      email: "c@scos.com",
      mobile: "9999999993"
    },

    {
      first_name: "Alex",
      last_name: "Johnson",
      full_name: "Alex Johnson",
      email: "d@scos.com",
      mobile: "9999999994"
    }

  ];

  // ================= INSERT USERS =================

  for (const user of users) {

    await db.query(

      `

      INSERT INTO users

      (

        first_name,

        last_name,

        full_name,

        email,

        mobile,

        password_hash,

        status

      )

      VALUES ($1,$2,$3,$4,$5,$6,$7)

      ON CONFLICT (email)

      DO UPDATE SET

      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      full_name = EXCLUDED.full_name,
      mobile = EXCLUDED.mobile,
      password_hash = EXCLUDED.password_hash,
      status = EXCLUDED.status

      `,

      [

        user.first_name,

        user.last_name,

        user.full_name,

        user.email,

        user.mobile,

        passwordHash,

        "active"

      ]

    );

  }

  console.log(
    "Users seeded successfully"
  );

};


// ================= EXPORT =================

module.exports = usersSeed;