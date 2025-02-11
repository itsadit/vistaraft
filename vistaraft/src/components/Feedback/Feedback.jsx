import { useState } from "react";
import { FaStar } from "react-icons/fa";

function Feedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-center text-gray-900 dark:text-white">
      <h2 className="text-4xl font-bold mb-6">We Value Your Feedback!</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded border focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded border focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Your Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              className="w-full p-3 rounded border focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
            ></textarea>
          </div>
          <div className="mb-6">
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
  );
}

export default Feedback;
