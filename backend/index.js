require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
// const nodemailer = require("nodemailer");

const multer = require("multer");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Schema
const paymentSchema = new mongoose.Schema({
  name: String,
  email: String,
  transactionId: String,
  quad: String,
  triple: String,
  double: String,
  single: String,
  totalPrice: String,
  date: { type: Date, default: Date.now },
});

// Create Model
const Payment = mongoose.model("Payment", paymentSchema);

// Test API Route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// API Route to Save Payment
app.post("/api/payments", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json({ message: "Payment details saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving payment details" });
  }
});
// // Payment Schema
// const PaymentSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   amount: Number,
//   trip: String,
//   payment_id: String,
//   order_id: String,
//   status: String,
//   date: { type: Date, default: Date.now },
// });
// const Payment = mongoose.model("Payment", PaymentSchema);

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: 'rzp_test_XnuNbiu4AK9Qft',
//   key_secret: 'q1jjOY01pZsx4nfJ61eJA6zG',
// });

// // Create Order
// app.post("/create-order", async (req, res) => {
//   try {
//     const { amount, currency, name, email, trip } = req.body;

//     const options = {
//       amount: amount * 100, // Convert to paise
//       currency,
//       receipt: `order_rcptid_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     res.json({ order, name, email, trip, amount });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Verify Payment & Store Data
// app.post("/verify-payment", async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, name, email, amount, trip } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto.createHmac("sha256", 'rzp_test_XnuNbiu4AK9Qft').update(body).digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid payment signature" });
//     }

//     // Store payment in database
//     const newPayment = new Payment({
//       name,
//       email,
//       amount,
//       trip,
//       payment_id: razorpay_payment_id,
//       order_id: razorpay_order_id,
//       status: "Paid",
//     });
//     await newPayment.save();

//     // Email setup
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: { user: 'ag952006@student.nitw.ac.in', pass: 'Iitjee2020@2024'},
//     });

//     const userMail = {
//       from: 'ag952006@student.nitw.ac.in',
//       to: email,
//       subject: "Payment Successful",
//       text: `Hi ${name},\n\nYour payment of ₹${amount} for the trip to ${trip} was successful.\nPayment ID: ${razorpay_payment_id}`,
//     };

//     const adminMail = {
//       from: 'ag952006@student.nitw.ac.in',
//       to: 'ag952006@student.nitw.ac.in',
//       subject: "New Payment Received",
//       text: `Payment received from ${name} (${email}) for ₹${amount}.\nTrip: ${trip}\nPayment ID: ${razorpay_payment_id}`,
//     };

//     await transporter.sendMail(userMail);
//     await transporter.sendMail(adminMail);

//     res.json({ message: "Payment successful and stored" });
//   } catch (error) {
//     res.status(500).json({ message: "Error verifying payment", error });
//   }
// });

const destinationSchema = new mongoose.Schema({
  heading: String,
  description: String,
  photo: String,
  cover: String,
  quadPrice: Number,
  TriPrice: Number,
  doubPrice: Number,
  singlePrice: Number,
  inclusions: [String],
  exclusions: [String],
  itenary: [
    {
      day: Number,
      heading: String,
      description: [String],
    },
  ],
  hotels:[
    {
      heading: String,
      description:[
        {
          imagelink:String,
          name:String,
        }
      ]
    },
  ],
  things: [String],
  nights: Number,
  days: Number,
});

const Destination = mongoose.model(
  "Destination",
  destinationSchema,
  "destinations"
);

// const destinations = {
//   heading: "Jibhi & Tirthan Valley",
//   description:
//     "A 4-night, 5-day trip to Jibhi & Tirthan Valley covering scenic waterfalls, treks, and local sightseeing.",
//   photo: "jibhi_trip_photo.jpg", // Add actual image URL
//   cover: "jibhi_cover_photo.jpg", // Add actual image URL
//   quadPrice: 6700,
//   TriPrice: 7200,
//   doubPrice: 7700,
//   singlePrice: 0, // Not mentioned in the PDF
//   inclusions: [
//     "Travelling by AC Bus/Traveller",
//     "2-night Jibhi/Tirthan Hotel Stay",
//     "All Local Sightseeing",
//     "Trek to YJHD point and Serolsar lake/Raghupur Trek",
//     "Choie Waterfall trek",
//     "Snow point Trek",
//     "Meals (3 Breakfast & 2 Dinner)",
//     "Best & crazy Music Night & Bonfire",
//     "Trip Coordinator",
//     "All toll taxes, parking included",
//   ],
//   exclusions: [
//     "Any personal expenses",
//     "Anything not mentioned in the itinerary",
//     "Any meals/drinks other than inclusions",
//     "Any meal during travelling",
//     "5% GST charge",
//     "Any entry/activity fees",
//   ],
//   itenary: [
//     {
//       day: 1,
//       heading: "Departure from Delhi",
//       description: [
//         "Departure from Delhi at 7 PM in an AC vehicle.",
//         "Dinner and breakfast during travel.",
//         "Overnight journey to Jibhi.",
//         "Carry a light blanket for night journey.",
//       ],
//     },
//     {
//       day: 2,
//       heading: "Arrival at Jibhi",
//       description: [
//         "Reach Jibhi by morning.",
//         "Freshen up and take rest at the hotel.",
//         "Visit Jibhi waterfall and mini Thailand pool.",
//         "Explore lush green areas and Jibhi River on your own.",
//         "Dinner with music and bonfire at the hotel.",
//         "Overnight stay at Jibhi/Tirthan hotel.",
//       ],
//     },
//     {
//       day: 3,
//       heading: "Jalori Pass & Serolsar Lake Trek",
//       description: [
//         "Breakfast at the hotel.",
//         "Leave for Jalori Pass and visit the temple.",
//         "Trek to Serolsar Lake/Raghupur Fort.",
//         "Enjoy panoramic views from the top.",
//         "Return to hotel for dinner and DJ music.",
//         "Play group games and enjoy the evening.",
//         "Overnight stay at hotel in Jibhi/Tirthan.",
//       ],
//     },
//     {
//       day: 4,
//       heading: "Choie Waterfall Trek & Departure",
//       description: [
//         "Morning walk and breakfast.",
//         "Check out from the hotel.",
//         "Trek to Choie Waterfall (1.5 km).",
//         "Relax at Tirthan River.",
//         "Evening departure for Delhi.",
//         "Overnight journey to Delhi.",
//       ],
//     },
//     {
//       day: 5,
//       heading: "Arrival at Delhi",
//       description: [
//         "Reach Delhi in the morning/noon (depending on traffic).",
//         "Click group pictures/selfies.",
//         "Say goodbye to the trip captain and bus driver.",
//         "Head home.",
//       ],
//     },
//   ],
//   things: [
//     "Jibhi Waterfall",
//     "Mini Thailand Pool",
//     "Jalori Pass",
//     "Serolsar Lake",
//     "Raghupur Fort Trek",
//     "Choie Waterfall",
//     "Tirthan River",
//   ],
//   nights: 4,
//   days: 5,
// };

// Destination.insertOne(destinations)
//   .then(() => {
//     console.log("Data inserted successfully!");
//     mongoose.connection.close();
//   })
//   .catch((err) => console.log(err));

app.get("/api/destinations", async (req, res) => {
  try {
    const { heading } = req.query; // Get heading from request query

    if (heading) {
      const destination = await Destination.findOne({ heading }); // Find by heading
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      res.json(destination);
    } else {
      const destinations = await Destination.find(); // Return all destinations if no heading is provided
      res.json(destinations);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching data Aditya", error });
  }
});

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  feedback: { type: String, required: true },
  rating: { type: Number, required: true },
  image: { type: String }, // Store filename of uploaded image
});

// Exporting the model correctly
const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;
// Configure Multer for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// API to handle feedback submission along with image
app.post("/api/feedback", upload.single("image"), async (req, res) => {
  try {
    const { name, email, feedback, rating } = req.body;
    const image = req.file ? req.file.filename : null; // Save the filename

    // Ensure all fields are received
    if (!name || !email || !feedback || !rating) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save feedback to MongoDB
    const newFeedback = new Feedback({
      name,
      email,
      feedback,
      rating,
      image, // Store image filename in DB
    });

    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// // // Define the updated itinerary
// const updatedItenary = [
//   {
//     day: 1,
//     heading: "Overnight Journey from Delhi / Haridwar to Barkot via Dehradun & Mussoorie",
//     description: [
//       "Morning stop for breakfast and visit Shashtra Dhara, Prakashwer temple, and Kempty Falls.",
//       "Continue journey to Barkot via Mussoorie."
//     ]
//   },
//   {
//     day: 2,
//     heading: "Reaching Barkot",
//     description: [
//       "Arrive in Barkot and check into the hotel.",
//       "Enjoy the meal and take rest to prepare for the next day's trek."
//     ]
//   },
//   {
//     day: 3,
//     heading: "Barkot - Yamunotri Dham Darshan - Barkot | Overnight Stay",
//     description: [
//       "After breakfast, travel to Jankichatti/Phoolchatti.",
//       "Start a 6 km trek to Yamunotri (optional horse ride or pony available).",
//       "Visit Yamunotri Temple, Divya Shila, Surya Kund.",
//       "Return to Barkot and stay overnight."
//     ]
//   },
//   {
//     day: 4,
//     heading: "Barkot - Uttarkashi - Vishwanath Temple | Overnight Stay",
//     description: [
//       "Travel from Barkot to Uttarkashi (80 km, approx. 2-3 hours).",
//       "Check into the hotel and freshen up.",
//       "Visit the famous Vishwanath Temple.",
//       "Overnight stay in Uttarkashi."
//     ]
//   },
//   {
//     day: 5,
//     heading: "Uttarkashi - Gangotri Dham Darshan - Uttarkashi | Overnight Stay",
//     description: [
//       "After breakfast, travel to Gangotri (100 km, approx. 2-3 hours).",
//       "Visit Gangotri Temple, Surya Kund, Bhagirath Shila.",
//       "Explore Gomukh.",
//       "Return to Uttarkashi for an overnight stay."
//     ]
//   },
//   {
//     day: 6,
//     heading: "Uttarkashi - Guptkashi via Mandakini River | Overnight Stay",
//     description: [
//       "After breakfast, travel to Guptkashi (197 km, approx. 7-8 hours).",
//       "En route, witness Mandakini River at Tilwara.",
//       "Check into a hotel in Guptkashi for overnight stay."
//     ]
//   },
//   {
//     day: 7,
//     heading: "Guptkashi - Sonprayag - Kedarnath Trek | Overnight Stay",
//     description: [
//       "Travel 30 km from Guptkashi to Sonprayag.",
//       "Start 20 km trek to Kedarnath (carry essentials like warm clothes, medicines).",
//       "Visit Kedarnath Temple, Chorabari Tal, Ghorabari Glacier.",
//       "Overnight stay in Kedarnath Dham."
//     ]
//   },
//   {
//     day: 8,
//     heading: "Kedarnath Dham Darshan - Gaurikund - Sonprayag | Overnight Stay",
//     description: [
//       "Early morning visit to Kedarnath Temple.",
//       "Witness the scenic beauty of the Garhwal Himalayan Range.",
//       "Trek down to Gaurikund and reach Sonprayag.",
//       "Dinner and overnight stay in Sonprayag."
//     ]
//   },
//   {
//     day: 9,
//     heading: "Sonprayag - Badrinath Dham Darshan | Overnight Stay",
//     description: [
//       "After breakfast, travel to Badrinath Dham.",
//       "Visit Pandukeshwar.",
//       "Dinner and overnight stay in Badrinath/Joshimath."
//     ]
//   },
//   {
//     day: 10,
//     heading: "Badrinath Dham - Rishikesh - Haridwar | Departure",
//     description: [
//       "After breakfast, drive to Rishikesh (218 km, approx. 6-7 hours).",
//       "Short break in Rishikesh, then continue to Haridwar (19 km, 30 min).",
//       "Attend Ganga Aarti in Rishikesh.",
//       "Overnight stay in Rishikesh."
//     ]
//   },
//   {
//     day: 11,
//     heading: "Neelkanth Visit & Return to Delhi",
//     description: [
//       "Morning visit to Neelkanth Temple.",
//       "Return journey to Delhi (187 km, approx. 7 hours).",
//       "Tour ends with beautiful memories."
//     ]
//   }
// ];

// // Find the document using `heading` and update the itinerary
// Destination.findOneAndUpdate(
//   { heading: "Char Dham" }, // Find by heading
//   { $set: { itenary: updatedItenary } },
//   { new: true } // Return updated document
// )
//   .then((updatedTrip) => {
//     if (!updatedTrip) {
//       console.log("No document found with the given heading.");
//     } else {
//       console.log("Updated Trip Itinerary:", updatedTrip);
//     }
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.error("Error updating trip:", err);
//     mongoose.connection.close();
//   });

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
