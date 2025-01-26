"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = require("./src/config/db.config");
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
const adminRoutes_1 = __importDefault(require("./src/routes/adminRoutes"));
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const stripe_1 = __importDefault(require("stripe"));
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || 3030;
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    typescript: true
});
app.get("/config", (_, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
});
app.post("/create-payment-intent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartPrice = req.body.cartPrice;
    try {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: Math.round(cartPrice * 1000),
            currency: "INR",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
            intent: paymentIntent
        });
    }
    catch (error) {
        res.json(error);
    }
}));
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' });
});
app.use('/auth', authRoutes_1.default);
app.use('/user', userRoutes_1.default);
app.use('/admin', adminRoutes_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
(0, db_config_1.connectToDB)();
app.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
});
