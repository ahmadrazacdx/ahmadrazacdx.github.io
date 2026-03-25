import { MouseHover } from "@/components/MouseHover";
import { Navbar } from "@/components/Navbar";
import { Certificates } from "@/components/Certificates";

export default function CertificatesPage() {
  return (
    <div className="relative min-h-screen selection:bg-primary/30">
      <MouseHover />

      <div className="relative z-10 pt-24 pb-28 md:pb-0">
        <Navbar />
        <Certificates />
      </div>
    </div>
  );
}
