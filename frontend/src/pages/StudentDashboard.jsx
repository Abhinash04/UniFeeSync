
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import StudentLayout from "@/components/StudentLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarCheck, ForkKnife, Receipt, CreditCard, ArrowRight } from "lucide-react";

const StudentDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "student") {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== "student") {
    return null;
  }

  const dashboardCards = [
    {
      title: "Meal Tracking",
      description: "View and mark your meal attendance and non-mess days",
      icon: <ForkKnife className="h-10 w-10 text-student" />,
      stats: {
        primary: "28",
        label: "Meals Marked This Month",
      },
      action: () => navigate("/student/meal-tracking"),
    },
    {
      title: "Fee & Invoice Management",
      description: "View your fee summary and invoice details",
      icon: <Receipt className="h-10 w-10 text-student" />,
      stats: {
        primary: "₹4,500",
        label: "Current Due",
      },
      action: () => navigate("/student/fee-management"),
    },
    {
      title: "Payment Portal",
      description: "Make payments and track transaction history",
      icon: <CreditCard className="h-10 w-10 text-student" />,
      stats: {
        primary: "3",
        label: "Recent Transactions",
      },
      action: () => navigate("/student/payment-portal"),
    },
    {
      title: "Non-Mess Days",
      description: "View and mark days you won't be using the mess",
      icon: <CalendarCheck className="h-10 w-10 text-student" />,
      stats: {
        primary: "4",
        label: "Non-Mess Days This Month",
      },
      action: () => navigate("/student/meal-tracking"),
    },
  ];

  return (
    <StudentLayout currentPage="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {dashboardCards.map((card, index) => (
          <Card key={index} className="overflow-hidden border-student-light hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{card.title}</CardTitle>
                {card.icon}
              </div>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold">{card.stats.primary}</div>
                  <div className="text-sm text-muted-foreground">{card.stats.label}</div>
                </div>
                <Button 
                  onClick={card.action} 
                  variant="outline" 
                  className="w-full border-student hover:bg-student-light text-student-dark"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { event: "Meal marked for lunch", date: "Today, 1:15 PM", type: "meal" },
                { event: "Payment of ₹1,500 made", date: "Yesterday, 4:30 PM", type: "payment" },
                { event: "Non-mess day marked", date: "2 days ago", type: "non-mess" },
                { event: "Meal marked for dinner", date: "3 days ago", type: "meal" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center p-3 rounded-md bg-secondary/50">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 
                    ${activity.type === 'meal' ? 'bg-green-100 text-green-600' : 
                      activity.type === 'payment' ? 'bg-blue-100 text-blue-600' : 
                      'bg-orange-100 text-orange-600'}`}>
                    {activity.type === 'meal' ? (
                      <ForkKnife className="h-4 w-4" />
                    ) : activity.type === 'payment' ? (
                      <CreditCard className="h-4 w-4" />
                    ) : (
                      <CalendarCheck className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{activity.event}</div>
                    <div className="text-sm text-muted-foreground">{activity.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
