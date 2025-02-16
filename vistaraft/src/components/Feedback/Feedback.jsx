import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useTheme } from "../ThemeContext/ThemeContext";

function Feedback() {
  const {mode} = useTheme();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !feedback || rating === 0) {
      alert("Please fill all fields and rate your experience.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("feedback", feedback);
    formData.append("rating", rating);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post(`${import.meta.env.VITE_HOST}/api/feedback`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className={`max-w-screen max-h-screen ${mode==='light'?'!bg-gray-100': 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'} `}>
      <div className={`max-w-3xl mx-auto px-6 py-12 text-center ${mode==='dark'?'text-white':'!text-gray-900'}`}>
      <h2 className="text-4xl font-bold mb-6">We Value Your Feedback!</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} className={`${mode==='light'?'!bg-gray-200': 'bg-gray-800'} p-6 rounded-lg shadow-lg`}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`w-full p-3 rounded   ${mode==='light'?'!bg-gray-300': 'bg-gray-700'}`}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
               className={`w-full p-3 rounded   ${mode==='light'?'!bg-gray-300': 'bg-gray-700'}`}
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Your Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
               className={`w-full p-3 rounded   ${mode==='light'?'!bg-gray-300 !text-gray-900': 'bg-gray-700 !text-white'}`}
            ></textarea>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Rate Your Experience</p>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    className={`cursor-pointer text-3xl ${
                      starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(starValue)}
                  />
                );
              })}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Upload an Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`w-full p-2 border rounded ${mode==='light'?'!bg-gray-300 text-gray-900': 'bg-gray-700'}`}
            />
            {preview && <img src={preview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-lg mx-auto" />}
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-bold">
            Submit Feedback
          </button>
        </form>
      ) : (
        <div className="bg-green-100 dark:bg-green-700 p-6 rounded-lg shadow-lg text-lg font-semibold">
          Thank you for your feedback! We appreciate your time.
        </div>
      )}
    </div>
    </div>
  );
}

export default Feedback;
