import fs from "fs/promises";
import path from "path";
import Advert from "../advert";

export default async function Rescue() {
  try {
    // ✅ Get the correct path to dogs.json
    const filePath = path.join(process.cwd(), "public", "dogs.json");

    // ✅ Read and parse the JSON file
    const jsonData = await fs.readFile(filePath, "utf-8");
    const { dogs } = JSON.parse(jsonData);

    return (
      <div className="theme-spring">
        <h1 className="text-center text-3xl font-bold mb-6">Meet Our Rescue Dogs</h1>
        <p className="text-center mb-4">Find a loving companion and give a rescue dog a forever home!</p>

        <div className="grid-container">
          {dogs.map((dog: any) => (
            <Advert
              key={dog.id}
              id={dog.id}
              name={dog.name}
              description={dog.description}
              image={dog.image}
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
