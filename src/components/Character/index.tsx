import { useEffect, useState } from "react";
import Scene from "./Scene";

const CharacterModel = () => {
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowScene(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return showScene ? <Scene /> : null;
};

export default CharacterModel;
