import "./globals.css";

export const metadata = {
  title: "PM Quest — learn product management, the Duolingo way",
  description:
    "Bite-sized lessons that turn the HelloPM curriculum into a game: streaks, XP, hearts, and active recall.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#fbf7ef" />
      </head>
      <body>{children}</body>
    </html>
  );
}
