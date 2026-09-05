exports.up = (pgm) => {
  pgm.createTable("refresh_tokens", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    user_id: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },

    token: {
      type: "text",
      notNull: true,
      unique: true,
    },

    expires_at: {
      type: "timestamp",
      notNull: true,
    },

    is_revoked: {
      type: "boolean",
      notNull: true,
      default: false,
    },

    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("refresh_tokens");
};