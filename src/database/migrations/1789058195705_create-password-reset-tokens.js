exports.up = (pgm) => {
  pgm.createTable("password_reset_tokens", {
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

    token_hash: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },

    expires_at: {
      type: "timestamp",
      notNull: true,
    },

    used_at: {
      type: "timestamp",
    },

    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.createIndex(
    "password_reset_tokens",
    "user_id"
  );

  pgm.createIndex(
    "password_reset_tokens",
    "expires_at"
  );
};

exports.down = (pgm) => {
  pgm.dropTable("password_reset_tokens");
};