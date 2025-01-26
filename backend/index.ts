import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './src/config/db.config';
import authRoutes from './src/routes/authRoutes';
import cors from 'cors';
import adminRoutes from './src/routes/adminRoutes';
import userRoutes from './src/routes/userRoutes';
import cookieParser from 'cookie-parser';
import Stripe from 'stripe';
import path from 'path';

const PORT: string | number = process.env.PORT || 3030;
const app: Application = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    typescript: true
});

app.get("/config", (_: Request, res: Response): void => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
});

app.post("/create-payment-intent", async (req, res) => {
    const cartPrice = req.body.cartPrice;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(cartPrice * 1000),
            currency: "INR",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        
        res.send({
          clientSecret: paymentIntent.client_secret,
          intent:paymentIntent
        });
    } catch (error) {
        res.json(error)
    }
  });


app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World' });
});


app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectToDB();

app.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
});