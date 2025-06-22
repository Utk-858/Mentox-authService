"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const faculty_routes_1 = __importDefault(require("./routes/faculty.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/faculty", faculty_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
const PORT = process.env.PORT || 3000;
mongoose_1.default.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
});
