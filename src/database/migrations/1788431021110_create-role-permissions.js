exports.up = (pgm) => {
  pgm.createTable("role_permissions", {
    role_id: {
      type: "uuid",
      notNull: true,
      references: "roles(id)",
      onDelete: "CASCADE",
    },

    permission_id: {
      type: "uuid",
      notNull: true,
      references: "permissions(id)",
      onDelete: "CASCADE",
    },

    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.addConstraint("role_permissions", "role_permissions_pkey", {
    primaryKey: ["role_id", "permission_id"],
  });
};

exports.down = (pgm) => {
  pgm.dropTable("role_permissions");
};