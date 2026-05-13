// ================= MAPPINGS SEED =================

const mappingsSeed =
  async (db) => {

    // ================= MAPPINGS DATA =================

    const mappings = [

      {
        tenant_id: 1,
        institute_id: 1,
        user_id: 2,
        role_id: 1,
        is_primary: true
      },

      {
        tenant_id: 1,
        institute_id: 1,
        user_id: 3,
        role_id: 1,
        is_primary: true
      },

      {
        tenant_id: 1,
        institute_id: 1,
        user_id: 3,
        role_id: 3,
        is_primary: false
      },

      {
        tenant_id: 1,
        institute_id: 1,
        user_id: 4,
        role_id: 1,
        is_primary: true
      },

      {
        tenant_id: 1,
        institute_id: 1,
        user_id: 4,
        role_id: 3,
        is_primary: false
      },

      {
        tenant_id: 1,
        institute_id: 2,
        user_id: 4,
        role_id: 2,
        is_primary: false
      },

      {
        tenant_id: 1,
        institute_id: 2,
        user_id: 4,
        role_id: 3,
        is_primary: false
      },

      {
        tenant_id: 1,
        institute_id: 3,
        user_id: 4,
        role_id: 1,
        is_primary: false
      },

      {
        tenant_id: 1,
        institute_id: 4,
        user_id: 4,
        role_id: 3,
        is_primary: false
      },

      {
        tenant_id: 1,
        institute_id: 5,
        user_id: 4,
        role_id: 4,
        is_primary: false
      },

      {
        tenant_id: 1,
        institute_id: 6,
        user_id: 4,
        role_id: 1,
        is_primary: false
      }

    ];

    // ================= INSERT MAPPINGS =================

    for (const map of mappings) {

      await db.query(

        `

        INSERT INTO user_institute_roles

        (

          tenant_id,

          institute_id,

          user_id,

          role_id,

          is_primary,

          status

        )

        VALUES

        ($1,$2,$3,$4,$5,$6)

        ON CONFLICT DO NOTHING

        `,

        [

          map.tenant_id,

          map.institute_id,

          map.user_id,

          map.role_id,

          map.is_primary,

          "active"

        ]

      );

    }

    console.log(
      "Mappings seeded successfully"
    );

  };


// ================= EXPORT =================

module.exports = mappingsSeed;