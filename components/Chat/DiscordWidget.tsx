export default function DiscordWidget() {
  return (
    <iframe
      src="https://discord.com/widget?id=1122339820736380978&theme=dark"
      width="350"
      height="500"
      allowTransparency={true}
      frameBorder="0"
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      title="Discord"
      className="rounded-xl shadow-glow border-2 border-cyan-500"
    ></iframe>
  );
}
