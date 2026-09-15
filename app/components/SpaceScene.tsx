import Planet from "./Planet";
import ShootingStarManager from "./ShootingStarManager";
import StarField from "./StarField";

export default function SpaceScene() {
  return (
    <div aria-hidden="true" className="space-scene">
      <Planet
        className="planet--top-left glow--pulse"
        radius={80}
        opacity={0.15}
        size={70}
        pulseDuration={10}
      />
      <Planet
        className="planet--contact glow--pulse"
        radius={200}
        opacity={0.17}
        size={100}
        pulseDuration={15}
      />
      <Planet
        className="planet--lower-title glow--pulse"
        radius={40}
        opacity={0.11}
        size={40}
        pulseDuration={5}
        pulseSizeMin={1}
        pulseSizeMax={1}
      />
      <StarField />
      <ShootingStarManager />
    </div>
  );
}
