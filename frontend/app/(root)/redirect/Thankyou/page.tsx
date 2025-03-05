import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
        <h1 className="text-2xl font-bold mt-4">Thank You!</h1>
        <p className="text-gray-600 mt-2">
          Your submission has been received successfully.
        </p>
      </div>
    </div>
  );
}
