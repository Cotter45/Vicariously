import { useNavigate } from "react-router-dom";

function FourOhFour() {
  const navigate = useNavigate();

  return (
    <main className="main">
      <section className="section">
        <h2>This page doesn't exist yet!</h2>
        <button
          name="Return Home"
          type="button"
          className="splash-button"
          onClick={() => navigate("/")}
        >
          Phone Home
        </button>
      </section>
    </main>
  );
}

export default FourOhFour;
