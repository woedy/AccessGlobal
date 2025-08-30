import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function FloatingDonateButton() {
  return (
    <Link href="/donate">
      <Button 
        className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg rounded-full w-16 h-16 flex items-center justify-center z-50 transition-all transform hover:scale-110"
        size="lg"
      >
        <i className="fas fa-heart text-xl"></i>
      </Button>
    </Link>
  );
}
