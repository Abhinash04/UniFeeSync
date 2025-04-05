
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ForkKnife, CalendarCheck, Receipt, CreditCard, User, LogOut } from "lucide-react";

const StudentLayout = ({ children, currentPage }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: <User className="h-5 w-5 mr-2" />,
    },
    {
      name: "Meal Tracking",
      path: "/student/meal-tracking",
      icon: <ForkKnife className="h-5 w-5 mr-2" />,
    },
    {
      name: "Fee & Invoice",
      path: "/student/fee-management",
      icon: <Receipt className="h-5 w-5 mr-2" />,
    },
    {
      name: "Payment Portal",
      path: "/student/payment-portal",
      icon: <CreditCard className="h-5 w-5 mr-2" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-none shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center">
            <CalendarCheck className="h-7 w-7 text-student mr-2" />
            <h1 className="text-xl font-bold text-student-dark">Student Management System</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-muted-foreground">Student ID: {user?.studentId}</p>
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleLogout}
              className="text-student-dark hover:bg-student-light"
            >
              <LogOut className="h-5 w-5 text-black" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-none shadow-md">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={currentPage === item.name ? "default" : "ghost"}
                className={`w-full justify-start ${
                  currentPage === item.name 
                    ? "bg-student hover:bg-student-dark" 
                    : "hover:bg-student-light/50"
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Mobile navigation */}
        <div className="md:hidden border-b bg-white">
          <div className="flex overflow-x-auto p-2 gap-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={currentPage === item.name ? "default" : "outline"}
                className={`flex-shrink-0 ${
                  currentPage === item.name 
                    ? "bg-student hover:bg-student-dark" 
                    : "hover:bg-student-light/50"
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span className="sr-only md:not-sr-only">{item.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{currentPage}</h1>
            <Separator className="mt-2" />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;