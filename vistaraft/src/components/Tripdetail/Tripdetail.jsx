export default function TripDetail({ toggleDayWisePlan }) {
    return (
      <div className="flex justify-around bg-gray-900 text-white p-6 rounded-2xl">
        {/* Days of Trip */}
        <div className="flex flex-col items-center">
          <i className="fa-regular fa-clock text-blue-400 text-3xl"></i>
          <p className="mt-2 text-gray-400">Days of Trip</p>
          <h2 className="text-xl font-bold">2N-3D</h2>
        </div>
  
        {/* Pickup & Drop */}
        <div className="flex flex-col items-center">
          <i className="fa-solid fa-location-dot text-blue-400 text-3xl"></i>
          <p className="mt-2 text-gray-400">Pickup & Drop</p>
          <h2 className="text-xl font-bold">Delhi</h2>
        </div>
  
        {/* Buttons */}
        <div className="flex mt-4 space-x-4">
          <button className="bg-blue-600 px-4 py-2 rounded-lg" onClick={toggleDayWisePlan}>
            Day Wise Plan
          </button>
          <button className="bg-gray-700 px-4 py-2 rounded-lg">Inclusions & Excl.</button>
        </div>
      </div>
    );
  }
  