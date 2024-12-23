export function ChristmasDecorations() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-8 bg-repeat-x" style={{ backgroundImage: "url('/images/christmas-lights.png')" }}></div>
      <div className="absolute top-8 left-4 w-8 h-8 bg-contain bg-no-repeat" style={{ backgroundImage: "url('/images/christmas-tree.png')" }}></div>
      <div className="absolute top-8 right-4 w-8 h-8 bg-contain bg-no-repeat" style={{ backgroundImage: "url('/images/santa-hat.png')" }}></div>
    </>
  );
}