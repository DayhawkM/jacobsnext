import fs from "fs/promises"; //FILE SYSTEM MODULE USED FOR SERVER-SIDE RENDERING
import path from "path";
import Advert from "../advert";

export default async function Rescue() {
  try {
    const filePath = path.join(process.cwd(), "public", "dogs.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const { dogs } = JSON.parse(jsonData);

   
    const determineSeason = () => {
      const month = new Date().getMonth();
      if (month >= 2 && month <= 4) {
        return "spring";
      } else if (month >= 5 && month <= 7) {
        return "summer";
      } else if (month >= 8 && month <= 10) {
        return "autumn";
      } else {
        return "winter";
      }
    };

    const currentSeason = determineSeason();

    return (
      <div className={`theme-${currentSeason}`}>
        <h1 className="text-center text-3xl font-bold mb-6">Meet Our Rescue Dogs</h1>
        <p className="text-center mb-4">Our dogs need your help now more than ever.</p>

        <div className="grid-container">
          {dogs.map((dog: any) => (
            <Advert
              key={dog.id}
              name={dog.name}
              description={dog.description}
              image={dog.image}
              price={0}
              isOnSale={false} 
              season={currentSeason} 
              breed={dog.breed} 
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to load dogs.json:", error);
    return <p className="text-center text-red-500">Error loading rescue dogs.</p>;
  }
}
