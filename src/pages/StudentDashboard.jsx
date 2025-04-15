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
      icon: <ForkKnife className="h-8 w-8 text-student-dark" />,
      stats: {
        primary: "28",
        label: "Meals Marked This Month",
      },
      action: () => navigate("/student/meal-tracking"),
    },
    {
      title: "Fee & Invoice",
      description: "View your fee summary and invoice details",
      icon: <Receipt className="h-8 w-8 text-student-dark" />,
      stats: {
        primary: "₹4,500",
        label: "Current Due",
      },
      action: () => navigate("/student/fee-management"),
    },
    {
      title: "Payment Portal",
      description: "Make payments and track transaction history",
      icon: <CreditCard className="h-8 w-8 text-student-dark" />,
      stats: {
        primary: "3",
        label: "Recent Transactions",
      },
      action: () => navigate("/student/payment-portal"),
    },
    {
      title: "Non-Mess Days",
      description: "View and mark days you won't be using the mess",
      icon: <CalendarCheck className="h-8 w-8 text-student-dark" />,
      stats: {
        primary: "4",
        label: "Non-Mess Days This Month",
      },
      action: () => navigate("/student/meal-tracking"),
    },
  ];

  return (
    <StudentLayout currentPage="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg hover:scale-103 transition-transform duration-300 flex flex-col justify-between h-full border-gray-200 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                <CardTitle className="text-2xl mb-1.5">{card.title}</CardTitle>
                {/* <CardDescription>{card.description}</CardDescription> */}
                </div>
                {card.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-5">
                <div>
                  <div className={`text-3xl font-bold mb-1.5 `}>{card.stats.primary}</div>
                  <div className="text-sm text-muted-foreground">{card.stats.label}</div>
                </div>
                <Button 
                 onClick={card.action} 
                 variant="outline" 
                 className={`relative overflow-hidden group w-full bg-student-dark text-white hover:bg-student-dark}`}
                 >
                 <span className={`absolute inset-y-0 left-1/2 w-0 transition-all group-hover:left-0 group-hover:w-full group-hover:bg-student`}/>
                 <span className="relative flex items-center group-hover:text-white float-end">
                  View Details
                 <ArrowRight className="h-4 w-4 ml-2" />
                </span>
              </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card className="border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { event: "Meal marked for lunch", date: "Today, 1:15 PM", type: "meal",},
                { event: "Payment of ₹1,500 made", date: "Yesterday, 4:30 PM", type: "payment", },
                { event: "Non-mess day marked", date: "2 days ago", type: "non-mess",},
                { event: "Meal marked for dinner", date: "3 days ago", type: "meal", },
              ].map((activity, i) => (
                <div key={i} className="flex items-center p-3 rounded-md">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 
                    ${activity.type === 'meal' ? 'bg-green-200 text-green-600' : 
                      activity.type === 'payment' ? 'bg-blue-200 text-blue-600' : 
                      'bg-orange-200 text-orange-600'}`}>
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