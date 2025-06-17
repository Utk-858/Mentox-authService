// dist/index.js

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));

dotenv_1.default.config(); // This line attempts to load .env

// --- ADD THESE LINES FOR DEBUGGING ---
console.log('--- Dotenv Load Status ---');
console.log('process.env.JWT_SECRET:', process.env.JWT_SECRET);
console.log('process.env.MONGO_URI:', process.env.MONGO_URI ? 'Loaded' : 'Not Loaded'); // Check another variable
console.log('Current working directory:', process.cwd());
console.log('--- End Dotenv Load Status ---');
// --- END DEBUGGING LINES ---

const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
const PORT = process.env.PORT || 3000;
mongoose_1.default.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
});