// default file that Expo will grab if you are not on mobile (web view)

export default function MapComponent() {
  return (
    <iframe
      title="map"
      width="100%"
      height="100%"
      style={{
        border: 1,
        flex: 1,
      }}
      src="https://www.openstreetmap.org/export/embed.html?bbox=-122.45,37.75,-122.39,37.80&layer=mapnik"
    />
  );
}