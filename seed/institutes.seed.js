// ================= INSTITUTES SEED =================

const institutesSeed =
  async (db) => {

    // ================= INSTITUTES DATA =================

    const institutes = [

      {
        tenant_id: 1,
        name: "North Park Academy",
        code: "NPA-01",
        type: "school",
        subtype: "CBSE",
        logo: "school1.png",
        location: "Mumbai, Maharashtra"
      },

      {
        tenant_id: 1,
        name: "Earlyteh College",
        code: "ETC-01",
        type: "college",
        subtype: "Engineering",
        logo: "school2.png",
        location: "Pune, Maharashtra"
      },

      {
        tenant_id: 1,
        name: "Renaissance Academy",
        code: "RA-01",
        type: "academy",
        subtype: "Competitive Exams",
        logo: "school3.png",
        location: "Bangalore, Karnataka"
      },

      {
        tenant_id: 1,
        name: "Pune University",
        code: "PU-01",
        type: "university",
        subtype: "State University",
        logo: "school4.png",
        location: "Pune, Maharashtra"
      },

      {
        tenant_id: 1,
        name: "Mount Carmel School",
        code: "MCS-01",
        type: "school",
        subtype: "ICSE",
        logo: "school5.png",
        location: "Nagpur, Maharashtra"
      },

      {
        tenant_id: 1,
        name: "Samhita Academy",
        code: "SA-01",
        type: "academy",
        subtype: "NEET/JEE",
        logo: "school6.png",
        location: "Chandigarh, Punjab"
      }

    ];

    // ================= INSERT INSTITUTES =================

    for (const institute of institutes) {

      await db.query(

        `

        INSERT INTO institutes

        (

          tenant_id,

          name,

          code,

          type,

          subtype,

          status,

          logo,

          location

        )

        VALUES

        ($1,$2,$3,$4,$5,$6,$7,$8)

        ON CONFLICT (code)

        DO UPDATE SET

        tenant_id = EXCLUDED.tenant_id,
        name = EXCLUDED.name,
        type = EXCLUDED.type,
        subtype = EXCLUDED.subtype,
        status = EXCLUDED.status,
        logo = EXCLUDED.logo,
        location = EXCLUDED.location

        `,

        [

          institute.tenant_id,

          institute.name,

          institute.code,

          institute.type,

          institute.subtype,

          "active",

          institute.logo,

          institute.location

        ]

      );

    }

    console.log(
      "Institutes seeded successfully"
    );

  };


// ================= EXPORT =================

module.exports = institutesSeed;