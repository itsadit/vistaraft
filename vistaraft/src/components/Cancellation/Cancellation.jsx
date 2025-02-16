import { FaExclamationTriangle, FaCalendarTimes, FaEnvelope, FaInfoCircle } from "react-icons/fa";
import { useTheme } from "../ThemeContext/ThemeContext";

function Cancellation() {
  const {mode} = useTheme();
  return (
    <div className={`overflow-hidden ${mode==='light'?'!bg-gray-100': 'bg-gray-900'}`}>
      <div className={`max-w-3xl mx-auto px-6 py-12 text-center ${mode==='dark'?'text-white':'!text-gray-900'}`}>
      {/* Title */}
      <h1 className="text-5xl font-bold mb-6 transition-transform duration-300 hover:scale-105">
        <FaCalendarTimes className="inline text-red-500" /> Cancellation Policy
      </h1>

      {/* Introduction */}
      <p className="text-lg mb-8">
        At <strong>Vistaraft</strong>, we understand that plans may change. Please review our cancellation policy before making a booking.
      </p>

      {/* Key Points */}
      <div className={`mb-8 p-6 border border-gray-300 rounded-lg ${mode==='light'?'!bg-gray-200': 'bg-gray-800'}`}>
        <h2 className="text-3xl font-semibold mb-4 flex items-center justify-center gap-2">
          <FaExclamationTriangle className="text-yellow-500" /> Key Points
        </h2>
        <p><strong>Initial Booking Amount:</strong> Non-refundable under any circumstances.</p>
        <p><strong>Cancellation Fees:</strong> Applied based on the timeline before the trip starts.</p>
      </div>

      {/* Cancellation Fees */}
      <div className={`mb-8 p-6 border border-gray-300 rounded-lg ${mode==='light'?'!bg-gray-200': 'bg-gray-800'}`}>
        <h2 className="text-3xl font-semibold mb-4 flex items-center justify-center gap-2">
          <FaInfoCircle className="text-blue-500" /> Cancellation Fees
        </h2>
        <ul className="text-lg text-left">
          <li className="mb-2"><strong>30+ days before trip:</strong> 50% of advance amount (excluding initial booking amount) is charged.</li>
          <li className="mb-2"><strong>15-30 days before trip:</strong> 75% of advance amount (excluding initial booking amount) is charged.</li>
          <li><strong>0-15 days before trip:</strong> 100% of advance amount (excluding initial booking amount) is charged.</li>
        </ul>
      </div>

      {/* Unforeseen Circumstances */}
      <div className={`mb-8 p-6 border border-gray-300 rounded-lg ${mode==='light'?'!bg-gray-200': 'bg-gray-800'}`}>
        <h2 className="text-3xl font-semibold mb-4 flex items-center justify-center gap-2">
          <FaExclamationTriangle className="text-red-500" /> Unforeseen Circumstances
        </h2>
        <p>
          In case of extreme weather, natural disasters, or government restrictions, parts of the trip may be canceled.
        </p>
        <p className="mt-2 font-semibold">No refunds will be issued, but alternative arrangements may be provided.</p>
      </div>

      {/* Contact for Cancellations */}
      <div className={`p-6 border border-gray-300 rounded-lg ${mode==='light'?'!bg-gray-200': 'bg-gray-800'}`}>
        <h2 className="text-3xl font-semibold mb-4 flex items-center justify-center gap-2">
          <FaEnvelope className="text-green-500" /> Cancellation Requests
        </h2>
        <p className="text-lg">All cancellation requests must be submitted in writing to:</p>
        <p className="text-2xl font-bold text-blue-500 mt-2 hover:underline">
          <a href="mailto:Travelwithvistaraft@gmail.com">Travelwithvistaraft@gmail.com</a>
        </p>
        <p className="mt-4 text-lg">Refunds, if applicable, will be processed within <strong>7 business days</strong> to the original payment method.</p>
      </div>
    </div>
    </div>
  );
}

export default Cancellation;