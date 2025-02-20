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
    heading: String,
    description: [String]
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
// Serve uploaded images
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
