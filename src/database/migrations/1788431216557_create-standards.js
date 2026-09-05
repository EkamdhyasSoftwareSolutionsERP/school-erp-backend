exports.up = (pgm) => {
  pgm.createTable("standards", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    school_id: {
      type: "uuid",
      notNull: true,
      references: "schools(id)",
      onDelete: "CASCADE",
    },

    name: {
      type: "varchar(100)",
      notNull: true,
    },

    code: {
      type: "varchar(50)",
      notNull: true,
    },

    display_order: {
      type: "integer",
      notNull: true,
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

  // Prevent duplicate standard names within the same school
  pgm.addConstraint("standards", "unique_school_standard", {
    unique: ["school_id", "name"],
  });
};

exports.down = (pgm) => {
  pgm.dropTable("standards");
};