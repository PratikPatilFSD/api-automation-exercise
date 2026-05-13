// ======================================================
// Jest Configuration File
// ======================================================
// This file contains the configuration settings
// for running automated tests using Jest.
// ======================================================

module.exports = {

  // --------------------------------------------------
  // Test Environment
  // --------------------------------------------------
  // Defines the environment in which tests will run.
  // "node" is used for backend/API testing projects.
  // --------------------------------------------------
  testEnvironment: "node",

  // --------------------------------------------------
  // Test Folder Location
  // --------------------------------------------------
  // Specifies the root folder where all test files
  // are stored.
  // --------------------------------------------------
  roots: ["<rootDir>/tests"],

  // --------------------------------------------------
  // Coverage Report Folder
  // --------------------------------------------------
  // Defines the folder where Jest will generate
  // the test coverage report.
  // --------------------------------------------------
  coverageDirectory: "coverage",

  // --------------------------------------------------
  // Enable Coverage Collection
  // --------------------------------------------------
  // Collects code coverage information while
  // executing the test cases.
  // --------------------------------------------------
  collectCoverage: true,

  // --------------------------------------------------
  // Coverage Source Files
  // --------------------------------------------------
  // Includes all JavaScript files inside the src
  // folder for coverage calculation.
  //
  // Excludes:
  // - server.js file from coverage reporting
  // --------------------------------------------------
  collectCoverageFrom: [

    "src/**/*.js",

    "!src/server.js"

  ]

};