import { Switch, Route } from "wouter";
import DonateSuccess from "@/pages/donate-success";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "./contexts/CartContext";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import FloatingDonateButton from "@/components/floating-donate-button";
import ScrollToTop from "@/components/scroll-to-top";
import Home from "@/pages/home";
import About from "@/pages/about";
import Programs from "@/pages/programs";
import EducationProgram from "@/pages/programs/education";
import EnvironmentProgram from "@/pages/programs/environment";
import EconomicProgram from "@/pages/programs/economic";
import HealthProgram from "@/pages/programs/health";
import AgricultureProgram from "@/pages/programs/agriculture";
import EnergyProgram from "@/pages/programs/energy";
import AgriTechProgram from "@/pages/programs/agritech";
import Stories from "@/pages/stories";
import GetInvolved from "@/pages/get-involved";
import Donate from "@/pages/donate";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import Blog from "./pages/blog";
import BlogPost from "./pages/blog/[id]";
import TeamMemberPage from "./pages/team/[id]";
import StorePage from "./pages/StorePage";
import ProductDetailPage from "./pages/store/[id]";
import CartPage from "./pages/CartPage";
import OrderSuccess from "./pages/OrderSuccess";
import StoreAdmin from "./pages/admin/StoreAdmin";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <ScrollToTop />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/programs" component={Programs} />
          <Route path="/programs/education" component={EducationProgram} />
          <Route path="/programs/environment" component={EnvironmentProgram} />
          <Route path="/programs/economic" component={EconomicProgram} />
          <Route path="/programs/health" component={HealthProgram} />
          <Route path="/programs/agriculture" component={AgricultureProgram} />
          <Route path="/programs/energy" component={EnergyProgram} />
          <Route path="/programs/agritech" component={AgriTechProgram} />
          <Route path="/stories" component={Stories} />
          <Route path="/get-involved" component={GetInvolved} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:id" component={BlogPost} />
          <Route path="/donate" component={Donate} />
          <Route path="/contact" component={Contact} />
          <Route path="/donate-success" component={DonateSuccess} />
          <Route path="/team/:id" component={TeamMemberPage} />
          <Route path="/store" component={StorePage} />
          <Route path="/store/:id" component={ProductDetailPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/order/success" component={OrderSuccess} />
          <Route path="/admin/store" component={StoreAdmin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Router />
        <FloatingDonateButton />
      </TooltipProvider>
    </CartProvider>
  );
}

export default App;


