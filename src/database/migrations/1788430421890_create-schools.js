exports.up = (pgm) => {
  pgm.createTable("schools", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    organization_id: {
      type: "uuid",
      notNull: true,
      references: "organizations(id)",
      onDelete: "CASCADE",
    },

    name: {
      type: "varchar(255)",
      notNull: true,
    },

    code: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },

    email: {
      type: "varchar(255)",
    },

    phone: {
      type: "varchar(20)",
    },

    address: {
      type: "text",
    },

    city: {
      type: "varchar(100)",
    },

    state: {
      type: "varchar(100)",
    },

    pincode: {
      type: "varchar(10)",
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
};

exports.down = (pgm) => {
  pgm.dropTable("schools");
};