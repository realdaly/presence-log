import { ThemeProvider } from "@/components/template/ConfigContext";
import "./globals.css";

export default function RootLayout({ children }) {
    return (
      <ThemeProvider>
        <html lang="ar" dir="rtl" className="font-vaz">
          <body className="relative">
            {children}
          </body>
        </html>
      </ThemeProvider>
    );
}