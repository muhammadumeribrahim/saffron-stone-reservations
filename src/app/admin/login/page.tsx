import AdminLoginForm from "./ui";

export default function AdminLoginPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-3xl font-semibold">Admin Login</h1>
      <p className="mt-2 text-sm text-gray-600">Sign in to manage reservation requests.</p>

      <div className="mt-6 rounded-xl border p-6">
        <AdminLoginForm />
      </div>
    </main>
  );
}
