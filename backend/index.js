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

// const destinations = [{
//   heading: "Pushkar Holi Festival Trip",
//   description: "Experience the world-famous Pushkar Holi celebration with music, colors, and unforgettable memories. Enjoy sightseeing, pool parties, and an EDM night in the heart of Pushkar.",
//   photo: "pushkar_holi_festival.jpg",
//   quadPrice: 8500,
//   TriPrice: 9000,
//   doubPrice: 9500,
//   singlePrice: 0, // No single price mentioned in the PDF
//   inclusions: [
//     "Transfers from Delhi to Delhi",
//     "Accommodation for 2 Nights in Pushkar Resort",
//     "4 Meals: Day 1 (Dinner), Day 2 (Breakfast + Dinner), Day 3 (Breakfast)",
//     "Colors for Holi Celebration",
//     "DJ & Pool Party",
//     "All Required Permits",
//     "Trip Buddy for Assistance",
//     "Medical Kit with the Trip Buddy",
//     "Driver Night Charges, Toll Taxes, Parking Charges",
//     "Complimentary Holi T-shirt",
//     "Refreshments on the Bus",
//     "Traditional Thandai for an Authentic Holi Experience"
//   ],
//   exclusions: [
//     "5% GST",
//     "Snacks and Extra Drinks/Food",
//     "Tickets for Any Sightseeing or Extra Activities Outside the Camp Area",
//     "Medical Services Apart from Basic First Aid",
//     "Travel Insurance and Other Benefits",
//     "Anything Not Mentioned in the Inclusions",
//     "Cost Escalation Due to Unforeseen Reasons like Weather, Road Conditions, or Landslides"
//   ],
//   itenary: [
//     {
//       day: 0,
//       heading: "Departure from Delhi to Pushkar",
//       description: [
//         "AC Volvo with Recliner Seats",
//         "Evening departure from Delhi",
//         "En route pit stop for dinner",
//         "Overnight journey to Pushkar with games, music, and an interactive introduction session led by the trip captain",
//         "Visit Ajmer Sharif Dargah en route (depending on the schedule) to seek blessings"
//       ]
//     },
//     {
//       day: 1,
//       heading: "Arrival and Holika Dahan",
//       description: [
//         "Morning check-in at the resort with a welcome drink",
//         "Freshen up and join a pool party",
//         "Local sightseeing:",
//         "  - Savitri Mata Temple (Cable car ride with panoramic views)",
//         "  - Brahma Temple (One of the world’s rarest temples dedicated to Lord Brahma)",
//         "  - Sacred Ghats (Experience the spiritual essence of Pushkar)",
//         "In the evening, witness the Holika Dahan, embracing the festive spirit"
//       ]
//     },
//     {
//       day: 2,
//       heading: "The Grand Holi Celebration",
//       description: [
//         "Wake up to a vibrant morning and collect a complimentary Holi T-shirt",
//         "Enjoy a delicious breakfast with engaging conversations",
//         "Join a pool party with colors and music",
//         "Celebrate Holi in the streets of Pushkar with travelers from around the world",
//         "Visit Mela Ground for the biggest Holi festival with fire brigades used as water toys",
//         "Return to the resort, freshen up, and prepare for an electrifying EDM Night at the Mela Ground",
//         "End the day with a delightful dinner and DJ party at the resort"
//       ]
//     },
//     {
//       day: 3,
//       heading: "Departure to Delhi",
//       description: [
//         "Wake up to breathtaking views of Savitri Mata Temple hills",
//         "Freshen up and enjoy a relaxing breakfast",
//         "Bid farewell to Pushkar and embark on the journey back to Delhi",
//         "Say goodbye to newfound friends and cherished memories"
//       ]
//     }
//   ]
// }];
const destinations = [
  {
    "heading": "MANALI-KASOL-KHEERGANGA TRIP",
    "description": "An adventurous journey through Manali, Kasol, and Kheerganga with trekking, sightseeing, bonfire nights, and cultural exploration.",
    "photo": "https://res.cloudinary.com/djvhd1shh/image/upload/v1739619547/Manali_gtvq0r.png",
    "cover": "https://media-cdn.tripadvisor.com/media/photo-s/09/f5/31/84/pushkar-lake.jpg",
    "quadPrice": 0,
    "TriPrice": 10000,
    "doubPrice": 12000,
    "singlePrice": 15000,
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
        "day": 1,
        "heading": "Overnight Journey to Manali",
        "description": [
          "Depart from Delhi by Volvo/Tempo for an overnight journey.",
          "Travel comfortably through scenic routes.",
          "Dinner will be self-paid."
        ]
      },
      {
        "day": 2,
        "heading": "Exploring Manali",
        "description": [
          "Arrive in Manali and check into the hotel.",
          "Visit Hadimba Temple, Mall Road, and Tibetan Monastery.",
          "You will be served dinner."
        ]
      }
    ],
    "things": [
      "Trekking Shoes",
      "Warm Clothes",
      "Sunscreen",
      "Water Bottle",
      "Personal Medication",
      "Power Bank",
      "Backpack"
    ]
  },
  {
    "heading": "Char Dham",
    "description": "Embark on a sacred journey through the four revered shrines of Yamunotri, Gangotri, Kedarnath, and Badrinath. Experience spiritual bliss, breathtaking Himalayan landscapes, and a deep connection to India's rich cultural heritage.",
    "photo": "https://res.cloudinary.com/djvhd1shh/image/upload/v1739619546/chardham_wsx7kj.jpg",
    "cover": "https://media-cdn.tripadvisor.com/media/photo-s/09/f5/31/84/pushkar-lake.jpg",
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
        "heading": "Journey from Delhi / Haridwar to Barkot",
        "description": [
          "Overnight journey via Dehradun & Mussoorie.",
          "Visit Shashtra Dhara, Prakashwer Temple, and Kempty Falls.",
          "You will be served dinner."
        ]
      },
      {
        "day": 2,
        "heading": "Arrival at Barkot & Preparation for Yamunotri",
        "description": [
          "Arrive and take time to rest.",
          "Prepare for the upcoming trek to Yamunotri.",
          "You will be provided with breakfast and dinner."
        ]
      }
    ],
    "things": [
      "Comfortable Trekking Shoes",
      "Raincoat",
      "Woolen Clothes",
      "Torchlight",
      "Dry Fruits & Snacks",
      "Personal Medicines",
      "Power Bank"
    ]
  },
  
];



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
  itenary: [{
    day: Number,
    heading: String,
    description: [String]
  }],
  things:[String]
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


// // Define the updated itinerary
const updatedItenary = [
  {
    day: 1,
    heading: "Overnight Journey from Delhi / Haridwar to Barkot via Dehradun & Mussoorie",
    description: [
      "Morning stop for breakfast and visit Shashtra Dhara, Prakashwer temple, and Kempty Falls.",
      "Continue journey to Barkot via Mussoorie."
    ]
  },
  {
    day: 2,
    heading: "Reaching Barkot",
    description: [
      "Arrive in Barkot and check into the hotel.",
      "Enjoy the meal and take rest to prepare for the next day's trek."
    ]
  },
  {
    day: 3,
    heading: "Barkot - Yamunotri Dham Darshan - Barkot | Overnight Stay",
    description: [
      "After breakfast, travel to Jankichatti/Phoolchatti.",
      "Start a 6 km trek to Yamunotri (optional horse ride or pony available).",
      "Visit Yamunotri Temple, Divya Shila, Surya Kund.",
      "Return to Barkot and stay overnight."
    ]
  },
  {
    day: 4,
    heading: "Barkot - Uttarkashi - Vishwanath Temple | Overnight Stay",
    description: [
      "Travel from Barkot to Uttarkashi (80 km, approx. 2-3 hours).",
      "Check into the hotel and freshen up.",
      "Visit the famous Vishwanath Temple.",
      "Overnight stay in Uttarkashi."
    ]
  },
  {
    day: 5,
    heading: "Uttarkashi - Gangotri Dham Darshan - Uttarkashi | Overnight Stay",
    description: [
      "After breakfast, travel to Gangotri (100 km, approx. 2-3 hours).",
      "Visit Gangotri Temple, Surya Kund, Bhagirath Shila.",
      "Explore Gomukh.",
      "Return to Uttarkashi for an overnight stay."
    ]
  },
  {
    day: 6,
    heading: "Uttarkashi - Guptkashi via Mandakini River | Overnight Stay",
    description: [
      "After breakfast, travel to Guptkashi (197 km, approx. 7-8 hours).",
      "En route, witness Mandakini River at Tilwara.",
      "Check into a hotel in Guptkashi for overnight stay."
    ]
  },
  {
    day: 7,
    heading: "Guptkashi - Sonprayag - Kedarnath Trek | Overnight Stay",
    description: [
      "Travel 30 km from Guptkashi to Sonprayag.",
      "Start 20 km trek to Kedarnath (carry essentials like warm clothes, medicines).",
      "Visit Kedarnath Temple, Chorabari Tal, Ghorabari Glacier.",
      "Overnight stay in Kedarnath Dham."
    ]
  },
  {
    day: 8,
    heading: "Kedarnath Dham Darshan - Gaurikund - Sonprayag | Overnight Stay",
    description: [
      "Early morning visit to Kedarnath Temple.",
      "Witness the scenic beauty of the Garhwal Himalayan Range.",
      "Trek down to Gaurikund and reach Sonprayag.",
      "Dinner and overnight stay in Sonprayag."
    ]
  },
  {
    day: 9,
    heading: "Sonprayag - Badrinath Dham Darshan | Overnight Stay",
    description: [
      "After breakfast, travel to Badrinath Dham.",
      "Visit Pandukeshwar.",
      "Dinner and overnight stay in Badrinath/Joshimath."
    ]
  },
  {
    day: 10,
    heading: "Badrinath Dham - Rishikesh - Haridwar | Departure",
    description: [
      "After breakfast, drive to Rishikesh (218 km, approx. 6-7 hours).",
      "Short break in Rishikesh, then continue to Haridwar (19 km, 30 min).",
      "Attend Ganga Aarti in Rishikesh.",
      "Overnight stay in Rishikesh."
    ]
  },
  {
    day: 11,
    heading: "Neelkanth Visit & Return to Delhi",
    description: [
      "Morning visit to Neelkanth Temple.",
      "Return journey to Delhi (187 km, approx. 7 hours).",
      "Tour ends with beautiful memories."
    ]
  }
];

// Find the document using `heading` and update the itinerary
Destination.findOneAndUpdate(
  { heading: "Char Dham" }, // Find by heading
  { $set: { itenary: updatedItenary } },
  { new: true } // Return updated document
)
  .then((updatedTrip) => {
    if (!updatedTrip) {
      console.log("No document found with the given heading.");
    } else {
      console.log("Updated Trip Itinerary:", updatedTrip);
    }
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error updating trip:", err);
    mongoose.connection.close();
  });





// Serve uploaded images
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
