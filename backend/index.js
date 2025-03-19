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
  things: [String],
  nights: Number,
  days: Number,
});

const Destination = mongoose.model(
  "Destination",
  destinationSchema,
  "destinations"
);
const destinations = [
  {
    heading: "Delhi - Leh - Ladakh - Srinagar Road Trip Package (7N/8D)",
    description:
      "Manali to Leh via Sarchu & Return via Srinagar for a Complete Circuit",
    photo: "leh_ladakh.jpg",
    quadPrice: 24999,
    triPrice: 26999,
    doubPrice: 28999,
    singlePrice: null,
    inclusions: [
      "Accommodation (Hotels/Campsites/Houseboat) on double/triple sharing basis",
      "Meals : Breakfast & Dinner",
      "Transport : Comfortable SUV/Tempo Traveller with driver",
      "Experienced Guide/Trip Captain",
      "Inner Line Permits for Ladakh",
      "Environmental & Wildlife Fees",
      "Oxygen Cylinder & First Aid Kit for emergencies",
    ],
    exclusions: [
      "Any Airfare/Train tickets",
      "Lunch & personal expenses (snacks, drinks, shopping)",
      "Adventure activities (camel ride, ATV rides, rafting)",
      "Travel insurance",
      "Extra costs due to landslides, weather, or political closures",
      "Any medical or evacuation charges",
    ],
    itenary: [
      {
        day: 1,
        heading: "Delhi to Manali (530 km / 12-14 hrs)",
        description: [
          "Early morning departure from Delhi.",
          "En route breakfast & lunch at Chandigarh/Mandi.",
          "Arrive in Manali, check-in, and explore Mall Road.",
          "Overnight stay in Manali (Hotel).",
        ],
      },
      {
        day: 2,
        heading: "Manali to Sarchu (230 km / 8-10 hrs)",
        description: [
          "Drive via Atal Tunnel, Keylong, Jispa & Baralacha La Pass.",
          "En route visit Deepak Tal & Suraj Tal Lakes.",
          "Check-in at Sarchu Camps, acclimatize.",
          "Overnight stay in Sarchu (Campsite).",
        ],
      },
      {
        day: 3,
        heading: "Sarchu to Leh (250 km / 8-10 hrs)",
        description: [
          "Drive via Gata Loops, Nakee La, Lachung La & Tanglang La.",
          "Visit More Plains & Tso Kar Lake.",
          "Reach Leh by evening, check-in at the hotel.",
          "Overnight stay in Leh (Hotel).",
        ],
      },
      {
        day: 4,
        heading: "Leh Local Sightseeing",
        description: [
          "Visit Magnetic Hill, Hall of Fame, Gurudwara Pathar Sahib & Sangam.",
          "Explore Thiksey Monastery, Shey Palace & Shanti Stupa.",
          "Enjoy Leh Market shopping & café hopping.",
          "Overnight stay in Leh (Hotel).",
        ],
      },
      {
        day: 5,
        heading: "Leh to Nubra Valley via Khardung La (160 km / 5-6 hrs)",
        description: [
          "Drive via Khardung La (World’s Highest Motorable Road - 18,379 ft).",
          "Visit Diskit Monastery & Hunder Sand Dunes.",
          "Enjoy Bactrian Camel Ride at Nubra.",
          "Overnight stay in Nubra (Campsite/Hotel).",
        ],
      },
      {
        day: 6,
        heading: "Nubra to Pangong Lake (200 km / 6-7 hrs)",
        description: [
          "Scenic drive via Shyok Valley.",
          "Explore Pangong Lake (3 Idiots Shooting Spot).",
          "Enjoy sunset by the lake, photography.",
          "Overnight stay in Pangong (Campsite).",
        ],
      },
      {
        day: 7,
        heading: "Pangong to Srinagar (450 km / 12-14 hrs)",
        description: [
          "Early morning departure via Chang La Pass.",
          "Visit Lamayuru Monastery & Kargil War Memorial (Drass).",
          "Reach Srinagar, check-in at Houseboat/Hotel.",
          "Overnight stay in Srinagar.",
        ],
      },
      {
        day: 8,
        heading: "Srinagar to Delhi (800 km / 14-16 hrs)",
        description: [
          "Early morning departure for Delhi via Jammu & Pathankot.",
          "Reach Delhi by night, concluding the trip.",
        ],
      },
    ],
  },
  {
    heading: "Spiti Valley Road Trip (7N/8D)",
    description:
      "Shimla - Chitkul - Kalpa - Kaza - Chandratal - Manali Circuit",
    photo: "spiti_valley.jpg",
    quadPrice: 21999,
    triPrice: 23999,
    doubPrice: 25999,
    singlePrice: null,
    inclusions: [
      "Accommodation for 7 Nights (Hotels, Camps & Guesthouses)",
      "Meals : Breakfast & Dinner (As per itinerary)",
      "Transportation : SUV/Tempo Traveler/Bike",
      "Inner Line Permits & Environmental Fees",
      "Oxygen Cylinder & First-Aid Kit",
    ],
    exclusions: [
      "Airfare/Train Tickets to Delhi",
      "Lunch & Any Personal Expenses",
      "Fuel (for Bike Rentals)",
      "Adventure Activities (Rafting, Ziplining, ATV Rides)",
      "5% GST",
    ],
    itenary: [
      {
        day: 1,
        heading: "Delhi to Manali to Sethan (Approx. 12-14 hrs, 550 km)",
        description: [
          "6:00 PM (Previous Night) : Overnight journey from Delhi to Manali by SUV/Tempo Traveler/Volvo Bus.",
          "6:00 AM : Arrive in Manali, freshen up at a café.",
          "9:00 AM : Breakfast at Old Manali (Café 1947, Drifter’s Café).",
          "11:00 AM : Depart for Sethan (15 km uphill from Manali) via Hampta Valley.",
          "1:00 PM : Check-in at a cozy Wooden Cabin/Homestay.",
          "3:00 PM : Explore snow-covered meadows & Igloos (Winters) / short hikes (Summers).",
          "5:00 PM : Sunset View & Bonfire with tea.",
          "8:00 PM : Dinner & Stargazing in the mountains.",
        ],
      },
      {
        day: 2,
        heading: "Snow Activities & Exploration",
        description: [
          "8:00 AM : Breakfast at the homestay.",
          "10:00 AM : Snow Trek or Snowboarding/Skiing (Winters).",
          "12:00 PM : Hampta Valley Hike & enjoy 360° views of Pir Panjal Ranges.",
          "2:00 PM : Lunch at the homestay.",
          "4:00 PM : Igloo Stay Experience (seasonal) or just relax in nature.",
          "6:00 PM : Bonfire & Music Session.",
          "8:00 PM : Dinner and overnight stay.",
        ],
      },
      {
        day: 3,
        heading: "Sethan to Manali to Delhi",
        description: [
          "7:00 AM : Breakfast & check-out.",
          "9:00 AM : Drive back to Manali, explore Mall Road & Hidimba Temple.",
          "12:00 PM : Lunch at a café in Old Manali.",
          "4:00 PM : Board an overnight bus/private vehicle back to Delhi.",
          "6:00 AM (Next Morning) : Reach Delhi.",
        ],
      },
    ],
  },
  {
    heading: "Spiti Valley Adventure Trip (6N/7D)",
    description:
      "Delhi - Narkanda - Chitkul - Kalpa - Kaza - Chandratal - Manali - Delhi",
    photo: "spiti_valley_adventure.jpg",
    quadPrice: 20999,
    triPrice: 22999,
    doubPrice: 24999,
    singlePrice: null,
    inclusions: [
      "Accommodation for 6 Nights (Hotels, Camps & Guesthouses)",
      "Meals – Breakfast & Dinner (As per itinerary)",
      "Transportation: Delhi to Spiti Valley & Return (SUV/Tempo Traveler/Bike)",
      "Inner Line Permits & Environmental Fees",
      "Wildlife & Entry Fees (Key Monastery, Chandratal)",
      "Experienced Road Captain & Backup Vehicle (for bike trips)",
      "Oxygen Cylinder & First-Aid Kit (for emergencies)",
      "Bonfire & Group Activities (where applicable)",
    ],
    exclusions: [
      "Airfare/Train Tickets to Delhi",
      "Lunch & Any Personal Expenses",
      "Fuel (for Bike Rentals)",
      "Bike Rental Charges (if opted separately)",
      "Adventure Activities (Rafting, Ziplining, ATV Rides)",
      "Any Medical or Emergency Evacuation Costs",
      "5% GST",
    ],
    itenary: [
      {
        day: 1,
        heading: "Delhi to Narkanda (Approx. 10-12 hrs, 400 km)",
        description: [
          "4:00 AM – Depart from Delhi.",
          "9:00 AM – Breakfast stop at Chandigarh/Dhaba en route.",
          "1:00 PM – Lunch at Kufri/Shimla.",
          "5:00 PM – Reach Narkanda, check-in at the hotel.",
          "8:00 PM – Dinner & rest.",
        ],
      },
      {
        day: 2,
        heading: "Narkanda to Chitkul (Approx. 7-8 hrs, 180 km)",
        description: [
          "7:00 AM – Breakfast & depart for Chitkul via Rampur & Sangla Valley.",
          "2:00 PM – Reach Chitkul (India’s Last Village), explore Baspa River.",
          "4:00 PM – Check-in at a riverside homestay.",
          "8:00 PM – Bonfire & dinner.",
        ],
      },
      {
        day: 3,
        heading: "Chitkul to Kalpa (Approx. 3-4 hrs, 60 km)",
        description: [
          "9:00 AM – Depart for Kalpa via Kinnaur Valley.",
          "12:00 PM – Check-in at a hotel in Kalpa.",
          "2:00 PM – Visit Suicide Point & Roghi Village.",
          "5:00 PM – Sunset view of Kinner Kailash Range.",
          "8:00 PM – Dinner & rest.",
        ],
      },
      {
        day: 4,
        heading: "Kalpa to Kaza (Approx. 8-10 hrs, 200 km)",
        description: [
          "6:00 AM – Depart via Nako & Tabo.",
          "12:00 PM – Visit Gue Monastery (Mummy of Lama Monk).",
          "3:00 PM – Explore Tabo Monastery & reach Kaza by evening.",
          "8:00 PM – Dinner & overnight stay.",
        ],
      },
      {
        day: 5,
        heading: "Kaza Local Sightseeing",
        description: [
          "8:00 AM – Breakfast & explore:",
          "Key Monastery (Oldest & Largest Monastery in Spiti)",
          "Hikkim (World’s Highest Post Office)",
          "Komic (World’s Highest Village with a Motorable Road)",
          "Langza (Fossil Village & Giant Buddha Statue)",
          "6:00 PM – Return to Kaza, explore the local market.",
          "8:00 PM – Dinner & rest.",
        ],
      },
      {
        day: 6,
        heading: "Kaza to Chandratal (Approx. 6-7 hrs, 160 km)",
        description: [
          "7:00 AM – Depart via Kunzum Pass (4,551m).",
          "2:00 PM – Reach Chandratal Lake, check-in at camps.",
          "4:00 PM – Explore the mesmerizing lake, photography.",
          "8:00 PM – Dinner & stargazing.",
        ],
      },
      {
        day: 7,
        heading: "Chandratal to Manali to Delhi (Approx. 14-16 hrs, 570 km)",
        description: [
          "6:00 AM – Early departure via Atal Tunnel & Rohtang Pass.",
          "12:00 PM – Lunch at Manali.",
          "2:00 PM – Start the return journey to Delhi.",
          "12:00 AM (Midnight) – Reach Delhi.",
        ],
      },
    ],
  },
];

Destination.insertMany(destinations)
  .then(() => {
    console.log("Data inserted successfully!");
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));

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
