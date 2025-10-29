import { FaTools } from "react-icons/fa";

export default function Maintenance() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white rounded-3xl shadow-lg p-12 flex flex-col items-center animate-fadeIn">
        <FaTools className="text-6xl text-red-500 mb-6 animate-bounce" />
        <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">
          Hệ thống đang bảo trì
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-xs">
          Hệ thống đang được nâng cấp, vui lòng quay lại sau vài giờ.
        </p>
      </div>
    </div>
  );
}
