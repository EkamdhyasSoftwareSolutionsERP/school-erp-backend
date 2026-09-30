const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger/swagger");

const app = express();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");


const authRoutes = require("./modules/auth/auth.routes");
const organizationRoutes = require("./modules/organization/organization.routes");
const schoolRoutes = require("./modules/school/school.routes");
const academicYearRoutes = require("./modules/academic-year/academicYear.routes");
const standardRoutes = require("./modules/standard/standard.routes");
const divisionRoutes = require("./modules/division/division.routes");
const subjectRoutes = require("./modules/subject/subject.routes");
const auditRoutes = require("./modules/audit/audit.routes");
const userRoutes = require("./modules/user/user.routes");
const roleRoutes = require("./modules/role/role.routes");
const permissionRoutes = require("./modules/permission/permission.routes");

app.use(helmet());

app.use(cors());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/v1", apiLimiter);

app.use(express.json({ limit: "10kb" }));

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/organizations", organizationRoutes);

app.use("/api/v1/academic-years", academicYearRoutes);

app.use("/api/v1/schools", schoolRoutes);

app.use("/api/v1/standards", standardRoutes);

app.use("/api/v1/divisions", divisionRoutes);

app.use("/api/v1/subjects", subjectRoutes);

app.use("/api/v1/audit-logs", auditRoutes);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/roles", roleRoutes);

app.use("/api/v1/permissions", permissionRoutes);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ERP API is running",
  });
});



app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Not Found Middleware
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

module.exports = app;