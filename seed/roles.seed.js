// ================= ROLES SEED =================

const rolesSeed = async (db) => {

  // ================= ROLES DATA =================

  const roles = [

    {
      name: "Admin",
      code: "ADMIN",
      description: "Full system access"
    },

    {
      name: "Principal",
      code: "PRINCIPAL",
      description: "Institute oversight"
    },

    {
      name: "Teacher",
      code: "TEACHER",
      description: "Class & grading"
    },

    {
      name: "Parent",
      code: "PARENT",
      description: "Child progress"
    }

  ];

  // ================= INSERT ROLES =================

  for (const role of roles) {

    await db.query(

      `

      INSERT INTO roles

      (

        name,

        code,

        description,

        status

      )

      VALUES ($1,$2,$3,$4)

      ON CONFLICT (code)

      DO UPDATE SET

      name = EXCLUDED.name,
      description = EXCLUDED.description,
      status = EXCLUDED.status

      `,

      [

        role.name,

        role.code,

        role.description,

        "active"

      ]

    );

  }

  console.log(
    "Roles seeded successfully"
  );

};


// ================= EXPORT =================

module.exports = rolesSeed;