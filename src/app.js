const express = require("express");

const app = express();
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const validate = require("./middleware/validate");
const { loginSchema } = require("./modules/auth/auth.validation");

const authRoutes = require("./modules/auth/auth.routes");

const organizationRoutes = require("./modules/organization/organization.routes");

const schoolRoutes = require("./modules/school/school.routes");

const academicYearRoutes =
  require("./modules/academic-year/academicYear.routes");

const standardRoutes =
  require("./modules/standard/standard.routes");

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ERP API is running",
  });
});



app.post(
  "/api/v1/test-validation",
  validate(loginSchema),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Validation successful",
      data: req.body,
    });
  }
);


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/organizations", organizationRoutes);

app.use(
  "/api/v1/academic-years",
  academicYearRoutes
);

app.use(
  "/api/v1/schools",
  schoolRoutes
);

app.use(
  "/api/v1/standards",
  standardRoutes
);

// Not Found Middleware
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
