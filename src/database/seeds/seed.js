require("dotenv").config();

const pool = require("../../config/database");

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    await seedRoles();
    await seedPermissions();

    console.log("✅ Database seeding completed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    process.exit(1);
  }
};

const seedRoles = async () => {
  const roles = [
    ["SUPER_ADMIN", "System administrator with full access"],
    ["SCHOOL_ADMIN", "Administrator for a specific school"],
  ];

  for (const role of roles) {
    await pool.query(
      `
      INSERT INTO roles (name, description)
      VALUES ($1, $2)
      ON CONFLICT (name) DO NOTHING
      `,
      role
    );
  }

  console.log("✅ Roles seeded");
};

const seedPermissions = async () => {
  const permissions = [
    ["organization.read", "View organizations"],
    ["organization.create", "Create organizations"],
    ["organization.update", "Update organizations"],
    ["organization.delete", "Delete organizations"],

    ["school.read", "View schools"],
    ["school.create", "Create schools"],
    ["school.update", "Update schools"],
    ["school.delete", "Delete schools"],

    ["user.read", "View users"],
    ["user.create", "Create users"],
    ["user.update", "Update users"],
    ["user.delete", "Delete users"],

    ["role.read", "View roles"],
    ["role.create", "Create roles"],
    ["role.update", "Update roles"],
    ["role.delete", "Delete roles"],

    ["academic_year.read", "View academic years"],
    ["academic_year.create", "Create academic years"],
    ["academic_year.update", "Update academic years"],
    ["academic_year.delete", "Delete academic years"],

    ["standard.read", "View standards"],
    ["standard.create", "Create standards"],
    ["standard.update", "Update standards"],
    ["standard.delete", "Delete standards"],

    ["division.read", "View divisions"],
    ["division.create", "Create divisions"],
    ["division.update", "Update divisions"],
    ["division.delete", "Delete divisions"],

    ["subject.read", "View subjects"],
    ["subject.create", "Create subjects"],
    ["subject.update", "Update subjects"],
    ["subject.delete", "Delete subjects"],
  ];

  for (const permission of permissions) {
    await pool.query(
      `
      INSERT INTO permissions (name, description)
      VALUES ($1, $2)
      ON CONFLICT (name) DO NOTHING
      `,
      permission
    );
  }

  console.log("✅ Permissions seeded");
};

seedDatabase();