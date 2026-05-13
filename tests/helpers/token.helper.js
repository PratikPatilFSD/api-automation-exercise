// ================= TOKENS =================

let accessToken = "";

let preContextToken = "";


// ================= ACCESS TOKEN =================

const setAccessToken = (
  token
) => {

  accessToken = token;

};

const getAccessToken = () => {

  return accessToken;

};


// ================= PRE TOKEN =================

const setPreContextToken = (
  token
) => {

  preContextToken = token;

};

const getPreContextToken = () => {

  return preContextToken;

};


// ================= EXPORT =================

module.exports = {

  setAccessToken,

  getAccessToken,

  setPreContextToken,

  getPreContextToken

};