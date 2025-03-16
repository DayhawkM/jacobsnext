'use client';
import { useEffect, useState } from "react";
import Advert from "../advert";

export default function Rescue() {
    const [dogs, setDogs] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("/dogs.json"); // Fetch from public folder
          const data = await response.json();
          setDogs(data.dogs); // Ensure the JSON structure uses "dogs"
        } catch (error) {
          console.error("Error fetching JSON:", error);
        }
      };
      fetchData();
    }, []);
  
    return (
      <div className="theme-spring">
        <h1 className="text-center text-3xl font-bold mb-6">Meet Our Rescue Dogs</h1>
        <p className="text-center mb-4">Find a loving companion and give a rescue dog a forever home!</p>
  
        {/* ✅ Grid container for rescue dogs */}
        <div className="grid-container">
          {dogs.map((dog) => (
            <Advert
              key={dog.id}
              id={dog.id}
              name={dog.name}
              description={dog.description}
              image={dog.image}
              breed={dog.breed} // Only for dogs
            />
          ))}
        </div>
      </div>
    );
}
