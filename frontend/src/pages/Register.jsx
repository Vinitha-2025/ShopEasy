function Register() {
  function handleSubmit(e) {
    e.preventDefault();
    // TODO: connect to backend auth API later
    alert("Register form submitted (not connected to backend yet)");
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-10">
      <h4 className="text-lg font-semibold mb-4">Create Account</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input type="text" required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" required className="w-full border rounded px-3 py-2" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;