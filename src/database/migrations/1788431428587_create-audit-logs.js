exports.up = (pgm) => {
  pgm.createTable("audit_logs", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    user_id: {
      type: "uuid",
      references: "users(id)",
      onDelete: "SET NULL",
    },

    school_id: {
      type: "uuid",
      references: "schools(id)",
      onDelete: "SET NULL",
    },

    action: {
      type: "varchar(100)",
      notNull: true,
    },

    entity_type: {
      type: "varchar(100)",
      notNull: true,
    },

    entity_id: {
      type: "uuid",
    },

    old_data: {
      type: "jsonb",
    },

    new_data: {
      type: "jsonb",
    },

    ip_address: {
      type: "varchar(50)",
    },

    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  // Indexes for faster queries
  pgm.createIndex("audit_logs", "user_id");
  pgm.createIndex("audit_logs", "school_id");
  pgm.createIndex("audit_logs", "entity_type");
  pgm.createIndex("audit_logs", "created_at");
};

exports.down = (pgm) => {
  pgm.dropTable("audit_logs");
};