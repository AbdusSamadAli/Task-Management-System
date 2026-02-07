import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="bg-gray-200 w-full max-w-xl rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Task Management System
        </h1>

        <p className="text-gray-600 text-center mb-8">
          A simple and secure way to manage your daily tasks.
        </p>

        <div className="grid grid-cols-1 gap-4 mb-8">
          <Feature text="Create, update, and delete tasks easily" />
          <Feature text="Filter tasks by completion status" />
          <Feature text="Search tasks instantly by title" />
          <Feature text="Secure login with JWT authentication" />
        </div>

        <div className="space-y-3">
          <Link
            href="/login"
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors"
          >
            Register
          </Link>

          <Link
            href="/dashboard"
            className="block w-full text-center border border-gray-300 hover:bg-gray-100 text-gray-800 py-2 rounded transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-blue-600 font-bold">✔</span>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}
