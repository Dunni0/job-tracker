import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";
import NextAuthProvider from "@/providers/SessionProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Job Tracker",
  description: "Track your job applications and progress in one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <ReduxProvider>
            <QueryProvider>
              {children}
              <Toaster
                position="bottom-left"
                toastOptions={{
                  duration: 3000,
                  style: {
                    fontSize: "13px",
                    borderRadius: "8px",
                    background: "#111827",
                    color: "#fff",
                  },
                  success: {
                    iconTheme: {
                      primary: "#10B981",
                      secondary: "#fff",
                    },
                  },
                  error: {
                    style: {
                      background: "#EF4444",
                      color: "#fff",
                    },
                    iconTheme: {
                      primary: "#fff",
                      secondary: "#EF4444",
                    },
                  },
                }}
              />
            </QueryProvider>
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
