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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-none shadow-md">
        <div className="mr-2.5 ml-2.5 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <CalendarCheck className="h-7 w-7 text-student mr-2" />
            <h1 className="text-2xl font-bold text-student-dark">UniFeeSync</h1>
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
              className=" hover:bg-student bg-student-dark"
            >
              <LogOut className="h-5 w-5 text-white hover:text-student" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 border-none">
          <nav className="p-4 space-y-3 m-1 fixed w-62">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={currentPage === item.name ? "default" : "ghost"}
                className={`w-full justify-start ${
                  currentPage === item.name 
                    ? "bg-student-dark hover:bg-student" 
                    : "hover:bg-student-light/70 hover:text-student"
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
        <div className="md:hidden bg-white h-15 fixed z-20 w-full shadow-md">
          <div className="flex overflow-x-auto p-2.5 gap-2 justify-around">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={currentPage === item.name ? "default" : "outline"}
                className={`flex-shrink-0 ${
                  currentPage === item.name 
                    ? "bg-student-dark hover:bg-student" 
                    : "hover:bg-student-light/50"
                }`}
                onClick={() => navigate(item.path)}
              >
                <span className="ml-2 scale-110">{item.icon}</span>
                <span className="sr-only md:not-sr-only">{item.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <main className="hidden md:block flex-1 p-4 md:p-6 bg-gray-100">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{currentPage}</h1>
            <Separator className="mt-2 bg-gray-300 h-0.5" />
          </div>
          {children}
        </main>
      </div>

      <main className="md:hidden flex-1 p-4 md:p-6 bg-gray-100 ">
          <div className="mb-6 mt-17">
            <h1 className="text-3xl font-bold">{currentPage}</h1>
            <Separator className="mt-2 bg-gray-300 h-0.5" />
          </div>
          {children}
        </main>


    </div>
  );
};

export default StudentLayout;