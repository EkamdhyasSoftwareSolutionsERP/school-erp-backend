exports.up = (pgm) => {
  pgm.createTable("academic_years", {
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
      type: "varchar(20)",
      notNull: true,
    },

    start_date: {
      type: "date",
      notNull: true,
    },

    end_date: {
      type: "date",
      notNull: true,
    },

    is_current: {
      type: "boolean",
      notNull: true,
      default: false,
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

  pgm.addConstraint("academic_years", "unique_school_academic_year", {
    unique: ["school_id", "name"],
  });
};

exports.down = (pgm) => {
  pgm.dropTable("academic_years");
};