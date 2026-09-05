exports.up = (pgm) => {
  pgm.createTable("divisions", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    standard_id: {
      type: "uuid",
      notNull: true,
      references: "standards(id)",
      onDelete: "CASCADE",
    },

    academic_year_id: {
      type: "uuid",
      notNull: true,
      references: "academic_years(id)",
      onDelete: "CASCADE",
    },

    name: {
      type: "varchar(50)",
      notNull: true,
    },

    code: {
      type: "varchar(50)",
      notNull: true,
    },

    capacity: {
      type: "integer",
    },

    is_active: {
      type: "boolean",
      notNull: true,
      default: true,
    },

    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },

    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  // Prevent duplicate division in the same standard and academic year
  pgm.addConstraint("divisions", "unique_standard_division_academic_year", {
    unique: ["standard_id", "academic_year_id", "name"],
  });
};

exports.down = (pgm) => {
  pgm.dropTable("divisions");
};