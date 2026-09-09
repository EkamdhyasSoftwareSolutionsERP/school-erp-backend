exports.up = (pgm) => {
  pgm.createTable("standard_subjects", {
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

    subject_id: {
      type: "uuid",
      notNull: true,
      references: "subjects(id)",
      onDelete: "CASCADE",
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

  // Prevent the same subject from being assigned twice to the same standard
  pgm.addConstraint(
    "standard_subjects",
    "unique_standard_subject",
    {
      unique: ["standard_id", "subject_id"],
    }
  );
};


exports.down = (pgm) => {
  pgm.dropTable("standard_subjects");
};