import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import FloatingDonateButton from "@/components/floating-donate-button";
import Home from "@/pages/home";
import About from "@/pages/about";
import Programs from "@/pages/programs";
import Stories from "@/pages/stories";
import GetInvolved from "@/pages/get-involved";
import Donate from "@/pages/donate";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import Blog from "./pages/blog";
import BlogPost from "./pages/blog/[id]";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/programs" component={Programs} />
          <Route path="/stories" component={Stories} />
          <Route path="/get-involved" component={GetInvolved} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:id" component={BlogPost} />
          <Route path="/donate" component={Donate} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <FloatingDonateButton />
    </div>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
