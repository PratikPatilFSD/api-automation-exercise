// Dynamic test data

const userData = () => ({

  first_name: "Test",

  last_name: "User",

  email: `test${Date.now()}@mail.com`,

  mobile: `${Date.now()}`.slice(0, 10),

  password: "Admin@123"

});

const instituteData = () => ({

  tenant_id: 1,

  name: `Institute${Date.now()}`,

  code: `CODE${Date.now()}`,

  type: "training_centre"

});

// ================= ROLE TEST DATA =================

const roleData = () => ({

  name: `Role${Date.now()}`,

  code: `ROLE_${Date.now()}`,

  description: "Test role"

});

// ================= MAPPING TEST DATA =================

const mappingData = () => ({

  tenant_id: 1,

  user_id: 4,

  institute_id: 1,

  role_id: 1

});


module.exports = {

  userData,

  instituteData,

  roleData,

  mappingData

};