import { Inter } from "next/font/google";
import Documents from "@/components/Documents";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main>
            <Documents />
        </main>
    );
}

