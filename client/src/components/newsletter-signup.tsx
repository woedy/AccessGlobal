import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSignupProps {
  variant?: "default" | "footer" | "inline";
  className?: string;
}

export default function NewsletterSignup({ variant = "default", className = "" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate newsletter subscription
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className={`max-w-md mx-auto flex gap-4 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 text-gray-900"
          required
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-white text-primary-500 hover:bg-gray-100"
        >
          {isLoading ? "..." : "Subscribe"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`max-w-md mx-auto flex gap-4 ${className}`}>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1"
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "..." : "Subscribe"}
      </Button>
    </form>
  );
}
