export default function ReportForm({ onCreated }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (onCreated) onCreated();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Report" />
      <button type="submit">Submit</button>
    </form>
  );
}
