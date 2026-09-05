exports.up = (pgm) => {
  pgm.createTable("user_schools", {
    user_id: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },

    school_id: {
      type: "uuid",
      notNull: true,
      references: "schools(id)",
      onDelete: "CASCADE",
    },

    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.addConstraint("user_schools", "user_schools_pkey", {
    primaryKey: ["user_id", "school_id"],
  });
};

exports.down = (pgm) => {
  pgm.dropTable("user_schools");
};