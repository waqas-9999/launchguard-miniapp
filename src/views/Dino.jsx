import BottomNav from "../components/boost/BottomNav";

function Dino() {
  return (
    <div className="w-full h-screen bg-black flex flex-col">
      <iframe
        title="Dino Game"
        src="/dino.html"
        className="flex-1 w-full border-0"
        // Allow scripts and same-origin so clicks & JS work inside iframe
        sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups"
      ></iframe>
      <BottomNav />
    </div>
  );
}

export default Dino;
