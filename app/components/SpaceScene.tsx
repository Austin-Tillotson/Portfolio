import Planet from "./Planet";
import ShootingStarManager from "./ShootingStarManager";
import StarField from "./StarField";

export default function SpaceScene() {
  return (
    <div aria-hidden="true" className="space-scene">
      <Planet
        className="planet--one glow--pulse"
        radius={300}
        opacity={0.15}
        size={100}
        pulseDuration={5}
      />
      <Planet
        className="planet--two glow--pulse"
        radius={200}
        opacity={0.17}
        size={100}
        pulseDuration={15}
      />
      <Planet
        className="planet--three glow--pulse"
        radius={40}
        opacity={0.11}
        size={40}
        pulseDuration={5}
        pulseSizeMin={1}
        pulseSizeMax={1}
      />
      <Planet
        className="planet--four glow--pulse"
        radius={60}
        opacity={0.13}
        size={55}
        pulseDuration={8}
      />
      <Planet
        className="planet--five glow--pulse"
        radius={120}
        opacity={0.1}
        size={110}
        pulseDuration={8}
      />
      <StarField />
      <ShootingStarManager />
    </div>
  );
}
