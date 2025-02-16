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
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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

// const destinations = [
//   {
//     id: 1,
//     heading: "Shimla",
//     description: "❄️ Snow-capped mountains & scenic valleys",
//     photo: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537830/Shimla_w1vfqe.jpg",
//     pdf: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537829/Shimla_tour_itinerary.pdf",
//     quadPrice: 15000, TriPrice: 18000, doubPrice: 20000, singlePrice: 25000,
//     inclusions:[
//       "Shikara Ride",
//       "Meals ( Breakfast & Dinner ) as mentioned in itinerary.",
//       "SUV/Tempo traveler/Coach/Volvo Vehicle for transfers and sightseeing as per mentioned above",
//       "Transfers as per itinerary",
//       "All toll taxes",
//       "Driver allowance with parking charges",
//       "Memories of a Lifetime",
//     ],
//     exclusions:[
//       "Anything else that is not mentioned in the inclusions",
//       "Personal expenses such as tips, telephone calls, laundry, medication etc.",
//       "Any Adventure Sport",
//       "Any extra transportation services availed",
//     ],
//     itenary:[
//       {day:1, stay:"Shimla", meals:"Dinner"},
//       {day:2, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:3, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:4, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:5, stay:"Shimla", meals:"Breakfast & Dinner"},
//     ]
//   },
//   {
//     id: 2,
//     heading: "Kashmir",
//     description: "🏞️ Experience the paradise of India",
//     photo: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537829/Kashmir_bxqg4z.jpg",
//     pdf: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537829/Shimla_tour_itinerary.pdf",
//     quadPrice: 15000, TriPrice: 18000, doubPrice: 20000, singlePrice: 25000,
//     inclusions:[
//       "Shikara Ride",
//       "Meals ( Breakfast & Dinner ) as mentioned in itinerary.",
//       "SUV/Tempo traveler/Coach/Volvo Vehicle for transfers and sightseeing as per mentioned above",
//       "Transfers as per itinerary",
//       "All toll taxes",
//       "Driver allowance with parking charges",
//       "Memories of a Lifetime",
//     ],
//     exclusions:[
//       "Anything else that is not mentioned in the inclusions",
//       "Personal expenses such as tips, telephone calls, laundry, medication etc.",
//       "Any Adventure Sport",
//       "Any extra transportation services availed",
//     ],
//     itenary:[
//       {day:1, stay:"Shimla", meals:"Dinner"},
//       {day:2, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:3, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:4, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:5, stay:"Shimla", meals:"Breakfast & Dinner"},
//     ]
//   },
//   {
//     id: 3,
//     heading: "Kerala",
//     description: "🌿 Lush backwaters & exotic wildlife",
//     photo: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537829/Kerela_xkrj2p.jpg",
//     pdf: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537829/Shimla_tour_itinerary.pdf",
//     quadPrice: 15000, TriPrice: 18000, doubPrice: 20000, singlePrice: 25000,
//     inclusions:[
//       "Shikara Ride",
//       "Meals ( Breakfast & Dinner ) as mentioned in itinerary.",
//       "SUV/Tempo traveler/Coach/Volvo Vehicle for transfers and sightseeing as per mentioned above",
//       "Transfers as per itinerary",
//       "All toll taxes",
//       "Driver allowance with parking charges",
//       "Memories of a Lifetime",
//     ],
//     exclusions:[
//       "Anything else that is not mentioned in the inclusions",
//       "Personal expenses such as tips, telephone calls, laundry, medication etc.",
//       "Any Adventure Sport",
//       "Any extra transportation services availed",
//     ],
//     itenary:[
//       {day:1, stay:"Shimla", meals:"Dinner"},
//       {day:2, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:3, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:4, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:5, stay:"Shimla", meals:"Breakfast & Dinner"},
//     ]
//   },
//   {
//     id: 4,
//     heading: "Manali",
//     description: "🏔️ Adventure, trekking & snowy peaks",
//     photo: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537830/Manali_gdzuhq.png",
//     pdf: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537829/Shimla_tour_itinerary.pdf",
//     quadPrice: 15000, TriPrice: 18000, doubPrice: 20000, singlePrice: 25000,
//     inclusions:[
//       "Shikara Ride",
//       "Meals ( Breakfast & Dinner ) as mentioned in itinerary.",
//       "SUV/Tempo traveler/Coach/Volvo Vehicle for transfers and sightseeing as per mentioned above",
//       "Transfers as per itinerary",
//       "All toll taxes",
//       "Driver allowance with parking charges",
//       "Memories of a Lifetime",
//     ],
//     exclusions:[
//       "Anything else that is not mentioned in the inclusions",
//       "Personal expenses such as tips, telephone calls, laundry, medication etc.",
//       "Any Adventure Sport",
//       "Any extra transportation services availed",
//     ],
//     itenary:[
//       {day:1, stay:"Shimla", meals:"Dinner"},
//       {day:2, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:3, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:4, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:5, stay:"Shimla", meals:"Breakfast & Dinner"},
//     ]
//   },
//   {
//     id: 5,
//     heading: "Mcleodganj",
//     description: "🛕 Spiritual vibes & mountain tranquility",
//     photo: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537830/Mcleodganj_ynqo7s.webp",
//     pdf: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537829/Shimla_tour_itinerary.pdf",
//     quadPrice: 15000, TriPrice: 18000, doubPrice: 20000, singlePrice: 25000,
//     inclusions:[
//       "Shikara Ride",
//       "Meals ( Breakfast & Dinner ) as mentioned in itinerary.",
//       "SUV/Tempo traveler/Coach/Volvo Vehicle for transfers and sightseeing as per mentioned above",
//       "Transfers as per itinerary",
//       "All toll taxes",
//       "Driver allowance with parking charges",
//       "Memories of a Lifetime",
//     ],
//     exclusions:[
//       "Anything else that is not mentioned in the inclusions",
//       "Personal expenses such as tips, telephone calls, laundry, medication etc.",
//       "Any Adventure Sport",
//       "Any extra transportation services availed",
//     ],
//     itenary:[
//       {day:1, stay:"Shimla", meals:"Dinner"},
//       {day:2, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:3, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:4, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:5, stay:"Shimla", meals:"Breakfast & Dinner"},
//     ]
//   },
//   {
//     id: 6,
//     heading: "Char Dham",
//     description: "🛤️ A divine pilgrimage journey",
//     photo: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537829/chardham_vu1ojt.jpg",
//     pdf: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537829/Shimla_tour_itinerary.pdf",
//     quadPrice: 15000, TriPrice: 18000, doubPrice: 20000, singlePrice: 25000,
//     inclusions:[
//       "Shikara Ride",
//       "Meals ( Breakfast & Dinner ) as mentioned in itinerary.",
//       "SUV/Tempo traveler/Coach/Volvo Vehicle for transfers and sightseeing as per mentioned above",
//       "Transfers as per itinerary",
//       "All toll taxes",
//       "Driver allowance with parking charges",
//       "Memories of a Lifetime",
//     ],
//     exclusions:[
//       "Anything else that is not mentioned in the inclusions",
//       "Personal expenses such as tips, telephone calls, laundry, medication etc.",
//       "Any Adventure Sport",
//       "Any extra transportation services availed",
//     ],
//     itenary:[
//       {day:1, stay:"Shimla", meals:"Dinner"},
//       {day:2, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:3, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:4, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:5, stay:"Shimla", meals:"Breakfast & Dinner"},
//     ]
//   },
//   {
//     id: 7,
//     heading: "Dalhousie",
//     description: "🌲 A charming hill station escape",
//     photo: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537829/dalhousie_nbrxes.webp",
//     pdf: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537829/Shimla_tour_itinerary.pdf",
//     quadPrice: 15000, TriPrice: 18000, doubPrice: 20000, singlePrice: 25000,
//     inclusions:[
//       "Shikara Ride",
//       "Meals ( Breakfast & Dinner ) as mentioned in itinerary.",
//       "SUV/Tempo traveler/Coach/Volvo Vehicle for transfers and sightseeing as per mentioned above",
//       "Transfers as per itinerary",
//       "All toll taxes",
//       "Driver allowance with parking charges",
//       "Memories of a Lifetime",
//     ],
//     exclusions:[
//       "Anything else that is not mentioned in the inclusions",
//       "Personal expenses such as tips, telephone calls, laundry, medication etc.",
//       "Any Adventure Sport",
//       "Any extra transportation services availed",
//     ],
//     itenary:[
//       {day:1, stay:"Shimla", meals:"Dinner"},
//       {day:2, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:3, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:4, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:5, stay:"Shimla", meals:"Breakfast & Dinner"},
//     ]
//   },
//   {
//     id: 8,
//     heading: "Chopta Chandrashila",
//     description: "⛺ Stunning treks & serene beauty",
//     photo: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537829/ChoptaChandrashila_dbepri.jpg",
//     pdf: "https://res.cloudinary.com/dmr86c1jv/image/upload/v1739537829/Shimla_tour_itinerary.pdf",
//     quadPrice: 15000, TriPrice: 18000, doubPrice: 20000, singlePrice: 25000,
//     inclusions:[
//       "Shikara Ride",
//       "Meals ( Breakfast & Dinner ) as mentioned in itinerary.",
//       "SUV/Tempo traveler/Coach/Volvo Vehicle for transfers and sightseeing as per mentioned above",
//       "Transfers as per itinerary",
//       "All toll taxes",
//       "Driver allowance with parking charges",
//       "Memories of a Lifetime",
//     ],
//     exclusions:[
//       "Anything else that is not mentioned in the inclusions",
//       "Personal expenses such as tips, telephone calls, laundry, medication etc.",
//       "Any Adventure Sport",
//       "Any extra transportation services availed",
//     ],
//     itenary:[
//       {day:1, stay:"Shimla", meals:"Dinner"},
//       {day:2, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:3, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:4, stay:"Shimla", meals:"Breakfast & Dinner"},
//       {day:5, stay:"Shimla", meals:"Breakfast & Dinner"},
//     ]
//   },
// ];

const destinations = [
  {
    "heading": "PUSHKAR HOLI TRIP (Delhi to Delhi)",
    "description": "An immersive and vibrant Holi celebration in Pushkar with cultural exploration, festive fun, and lifelong memories.",
    "photo": "https://res.cloudinary.com/djvhd1shh/image/upload/v1739619546/pushkar_yaqqok.jpg",
    "quadPrice": 8500,
    "TriPrice": 9000,
    "doubPrice": 9500,
    "singlePrice": 0,
    "inclusions": [
      "Complimentary Holi T-shirt",
      "Refreshments on the bus",
      "Traditional Thandai for an authentic Holi experience",
      "Accommodation in a resort",
      "Meals as per itinerary",
      "Sightseeing & cultural activities",
      "Guided Holi celebration experience"
    ],
    "exclusions": [
      "Personal expenses such as tips, telephone calls, laundry, medication etc.",
      "Any Monument entry fees/Camera Fees",
      "Any Adventure Sport",
      "Travel insurance"
    ],
    "itenary": [
      {
        "day": 1,
        "stay": "Resort",
        "meals": "Welcome drink",
        "activity": "Arrival and check-in, explore local attractions, cultural performances"
      },
      {
        "day": 2,
        "stay": "Resort",
        "meals": "Breakfast, Dinner",
        "activity": "Holi celebrations, playing with colors, DJ night, local market exploration"
      },
      {
        "day": 3,
        "stay": "None (Departure)",
        "meals": "Breakfast",
        "activity": "Morning temple visit, departure for Delhi"
      }
    ]
  },
  {
    "heading": "MANALI-KASOL-KHEERGANGA TRIP (Delhi to Delhi)",
    "description": "An adventurous journey through Manali, Kasol, and Kheerganga with trekking, sightseeing, bonfire nights, and cultural exploration.",
    "photo": "https://res.cloudinary.com/djvhd1shh/image/upload/v1739619547/Manali_gtvq0r.png",
    "quadPrice": 0,
    "TriPrice": 0,
    "doubPrice": 0,
    "singlePrice": 0,
    "inclusions": [
      "Traveling DELHI-MANALI-DELHI (Semi-Sleeper Volvo / Super Deluxe Tempo)",
      "Sightseeing & Transfers by Private Vehicle",
      "Hotel stay in Manali (2 Nights)",
      "Luxury Swiss camping in Kasol & Kheerganga with Bonfire & DJ (2 Nights)",
      "Meals (4 Breakfasts & 4 Dinners) - Veg/NonVeg Unlimited Buffet",
      "All transfers as per itinerary",
      "All toll taxes",
      "Driver allowance with parking charges",
      "Local guided treks"
    ],
    "exclusions": [
      "Anything else that is not mentioned in the inclusions",
      "Personal expenses such as tips, telephone calls, laundry, medication etc.",
      "Any Monument entry fees/Camera Fees",
      "Any Adventure Sport",
      "River rafting",
      "Paragliding"
    ],
    "itenary": [
      {
        "day": 0,
        "stay": "Overnight Journey in Volvo/Tempo",
        "meals": "Dinner (Self-paid)",
        "activity": "Depart from Delhi, overnight bus journey"
      },
      {
        "day": 1,
        "stay": "Hotel in Manali",
        "meals": "Dinner",
        "activity": "Local sightseeing - Hadimba Temple, Mall Road, Tibetan Monastery"
      },
      {
        "day": 2,
        "stay": "Hotel in Manali",
        "meals": "Breakfast, Dinner",
        "activity": "Solang Valley adventure sports, snow activities, photography"
      },
      {
        "day": 3,
        "stay": "Swiss Camps in Kasol",
        "meals": "Breakfast, Dinner",
        "activity": "Kasol exploration, cafe hopping, Parvati River walk, bonfire night"
      },
      {
        "day": 4,
        "stay": "Alpine Camps in Kheerganga",
        "meals": "Breakfast, Dinner",
        "activity": "Trek to Kheerganga, hot water springs bath, sunset point"
      },
      {
        "day": 5,
        "stay": "Overnight Journey to Delhi",
        "meals": "Breakfast",
        "activity": "Trek down to Barshaini, return journey to Delhi"
      },
      {
        "day": 6,
        "stay": "Arrival in Delhi",
        "meals": "None",
        "activity": "End of trip"
      }
    ]
  },
  {
    "heading": "Char Dham",
    "description": "🛤️ A divine pilgrimage journey",
    "photo": "https://res.cloudinary.com/djvhd1shh/image/upload/v1739619546/chardham_wsx7kj.jpg",
    "quadPrice": 15000,
    "TriPrice": 18000,
    "doubPrice": 20000,
    "singlePrice": 25000,
    "inclusions": [
      "Shikara Ride",
      "Meals (Breakfast & Dinner) as mentioned in itinerary.",
      "SUV/Tempo traveler/Coach/Volvo Vehicle for transfers and sightseeing as per mentioned above",
      "Transfers as per itinerary",
      "All toll taxes",
      "Driver allowance with parking charges",
      "Memories of a Lifetime",
      "Temple visits with guided experiences"
    ],
    "exclusions": [
      "Anything else that is not mentioned in the inclusions",
      "Personal expenses such as tips, telephone calls, laundry, medication etc.",
      "Any Adventure Sport",
      "Any extra transportation services availed"
    ],
    "itenary": [
      {
        "day": 1,
        "stay": "Delhi / Haridwar to Barkot",
        "activity": "Overnight journey via Dehradun & Mussoorie, visit Shashtra Dhara, Prakashwer Temple, Kempty Fall",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "stay": "Barkot",
        "activity": "Arrival, rest, and preparation for Yamunotri trek",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 3,
        "stay": "Barkot - Yamunotri Dham - Barkot",
        "activity": "Yamunotri Darshan, trek 6 km, visit temple, Divya Shila, Surya Kund",
        "meals": "Breakfast, Packed Lunch, Dinner"
      },
      {
        "day": 4,
        "stay": "Barkot - Uttarkashi",
        "activity": "Travel to Uttarkashi, visit Vishwanath Temple",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 5,
        "stay": "Uttarkashi - Gangotri - Uttarkashi",
        "activity": "Gangotri Darshan, visit Bhagirathi River, Harsil Village, Surya Kund",
        "meals": "Breakfast, Packed Lunch, Dinner"
      },
      {
        "day": 6,
        "stay": "Uttarkashi - Guptkashi",
        "activity": "Travel via Mandakini River, overnight stay",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 7,
        "stay": "Guptkashi - Sonprayag - Kedarnath",
        "activity": "Trek 20 km to Kedarnath, temple visit, overnight stay",
        "meals": "Breakfast, Packed Lunch, Dinner"
      },
      {
        "day": 8,
        "stay": "Kedarnath - Sonprayag",
        "activity": "Morning darshan, trek down to Sonprayag, overnight stay",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 9,
        "stay": "Sonprayag - Badrinath",
        "activity": "Travel to Badrinath, visit Pandukeshwar",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 10,
        "stay": "Badrinath - Rishikesh - Haridwar",
        "activity": "Morning darshan, travel to Rishikesh, attend Ganga Aarti",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 11,
        "stay": "Rishikesh - Neelkanth - Delhi",
        "activity": "Visit Neelkanth Temple, return to Delhi",
        "meals": "Breakfast"
      }
    ]
  }
]


const destinationSchema = new mongoose.Schema({
  heading: String,
  description: String,
  photo: String,
  quadPrice: Number,
  TriPrice: Number,
  doubPrice: Number,
  singlePrice: Number,
  inclusions: [String],
  exclusions: [String],
  itenary: [{
    day: Number,
    stay: String,
    meals: String,
    activity: String
  }]
});

const Destination = mongoose.model("Destination", destinationSchema, "destinations");
// Destination.insertMany(destinations)
//   .then(() => {
//     console.log("Data inserted successfully");
//     mongoose.connection.close();
//   })
//   .catch((error) => console.error(error));


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
    res.status(500).json({ message: "Error fetching data", error });
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
// Serve uploaded images
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
