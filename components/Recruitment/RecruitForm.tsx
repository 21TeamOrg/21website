export default function RecruitForm() {
  return (
    <form className="bg-background/80 rounded-xl border-2 border-cyan-500 p-6 shadow-glow max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4 text-cyan-500">Join Team 21</h3>
      <input
        type="text"
        placeholder="Name"
        className="mb-3 px-4 py-2 rounded w-full border border-cyan-500"
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="mb-3 px-4 py-2 rounded w-full border border-cyan-500"
        required
      />
      <textarea
        placeholder="Why do you want to join?"
        className="mb-3 px-4 py-2 rounded w-full border border-cyan-500"
        rows={4}
        required
      />
      <button
        type="submit"
        className="px-6 py-2 rounded-full bg-cyan-500 text-white font-bold shadow-glow hover:bg-cyan-400 w-full"
      >
        Apply
      </button>
    </form>
  );
}
