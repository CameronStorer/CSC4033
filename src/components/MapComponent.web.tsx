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
      src="https://www.openstreetmap.org/export/embed.html?bbox=-92.67,32.51,-92.62,32.55&layer=mapnik"
    />
  );
}