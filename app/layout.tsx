import "./globals.css";

export const metadata = {
  title: "Proyecto para postulacion - Nimble Gravity",
  description: "Crea un mini proyecto para demostrar tus habilidades como desarrollador fullstack jr. Este proyecto es parte de mi postulacion a Nimble Gravity. - Victor Roberti",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
