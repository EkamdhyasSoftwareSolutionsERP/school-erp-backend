exports.up = (pgm) => {
  pgm.createTable("user_roles", {
    user_id: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },

    role_id: {
      type: "uuid",
      notNull: true,
      references: "roles(id)",
      onDelete: "CASCADE",
    },

    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.addConstraint("user_roles", "user_roles_pkey", {
    primaryKey: ["user_id", "role_id"],
  });
};

exports.down = (pgm) => {
  pgm.dropTable("user_roles");
};