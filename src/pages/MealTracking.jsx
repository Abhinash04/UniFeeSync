import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import StudentLayout from "../components/StudentLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ForkKnife, CalendarCheck, Check, X, Info } from "lucide-react";
import { toast } from "../components/ui/use-toast";
import { format, addDays, startOfDay } from "date-fns";

const MealTracking = () => {
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

  return (
    <StudentLayout currentPage="Meal Tracking">
      <Tabs defaultValue="meal-tracking" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="meal-tracking" className="focus:bg-white">Meal Tracking</TabsTrigger>
          <TabsTrigger value="non-mess-days" className="focus:bg-white">Non-Mess Days</TabsTrigger>
        </TabsList>

        <TabsContent value="meal-tracking">
          <MealTrackingContent />
        </TabsContent>

        <TabsContent value="non-mess-days">
          <NonMessDaysContent />
        </TabsContent>
      </Tabs>
    </StudentLayout>
  );
};

const MealTrackingContent = () => {
  const meals = [
    { id: 1, name: "Breakfast", time: "7:30 AM - 9:00 AM", marked: true },
    { id: 2, name: "Lunch", time: "12:30 PM - 2:00 PM", marked: false },
    { id: 3, name: "Snacks", time: "4:30 PM - 5:30 PM", marked: false },
    { id: 4, name: "Dinner", time: "7:30 PM - 9:00 PM", marked: false },
  ];

  const pastWeek = [
    { day: "Monday", breakfast: true, lunch: true, snacks: true, dinner: true },
    { day: "Tuesday", breakfast: true, lunch: true, snacks: false, dinner: true },
    { day: "Wednesday", breakfast: true, lunch: false, snacks: true, dinner: true },
    { day: "Thursday", breakfast: true, lunch: true, snacks: true, dinner: false },
    { day: "Friday", breakfast: false, lunch: true, snacks: true, dinner: true },
    { day: "Saturday", breakfast: true, lunch: true, snacks: false, dinner: true },
    { day: "Sunday", breakfast: true, lunch: true, snacks: true, dinner: true },
  ];

  const handleMarkMeal = (mealId) => {
    toast({
      title: "Meal Marked",
      description: "Your attendance has been recorded successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Today's Meals</CardTitle>
              <CardDescription>{format(new Date(), "EEEE, MMMM d, yyyy")}</CardDescription>
            </div>
            <ForkKnife className="h-6 w-6 text-student" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meals.map((meal) => (
              <div key={meal.id} className="flex items-center justify-between p-4 border-2 border-[#dbdbdb] rounded-lg">
                <div>
                  <h3 className="font-medium">{meal.name}</h3>
                  <p className="text-sm text-muted-foreground">{meal.time}</p>
                </div>
                <Button
                  variant={meal.marked ? "default" : "outline"}
                  className={meal.marked ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => handleMarkMeal(meal.id)}
                  disabled={meal.marked}
                >
                  {meal.marked ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Marked
                    </>
                  ) : (
                    "Mark Attendance"
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Weekly Meal Summary</CardTitle>
          <CardDescription>Your meal attendance for the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Day</th>
                  <th className="text-center py-3 px-4">Breakfast</th>
                  <th className="text-center py-3 px-4">Lunch</th>
                  <th className="text-center py-3 px-4">Snacks</th>
                  <th className="text-center py-3 px-4">Dinner</th>
                </tr>
              </thead>
              <tbody>
                {pastWeek.map((day, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-medium">{day.day}</td>
                    <td className="text-center py-3 px-4">
                      {day.breakfast ? <Check className="inline h-5 w-5 text-green-600" /> : <X className="inline h-5 w-5 text-gray-400" />}
                    </td>
                    <td className="text-center py-3 px-4">
                      {day.lunch ? <Check className="inline h-5 w-5 text-green-600" /> : <X className="inline h-5 w-5 text-gray-400" />}
                    </td>
                    <td className="text-center py-3 px-4">
                      {day.snacks ? <Check className="inline h-5 w-5 text-green-600" /> : <X className="inline h-5 w-5 text-gray-400" />}
                    </td>
                    <td className="text-center py-3 px-4">
                      {day.dinner ? <Check className="inline h-5 w-5 text-green-600" /> : <X className="inline h-5 w-5 text-gray-400" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const NonMessDaysContent = () => {
  const today = startOfDay(new Date());
  const [upcomingNonMessDays, setUpcomingNonMessDays] = useState([
    addDays(today, 5),
    addDays(today, 6),
    addDays(today, 12),
    addDays(today, 13),
  ]);

  const handleMarkNonMessDay = (date) => {
    const dateStr = format(date, "EEEE, MMMM d, yyyy");
    toast({
      title: "Non-Mess Day Marked",
      description: `You have successfully marked ${dateStr} as a non-mess day.`,
    });

    setUpcomingNonMessDays([...upcomingNonMessDays, date]);
  };

  const handleRemoveNonMessDay = (date) => {
    const dateStr = format(date, "EEEE, MMMM d, yyyy");
    toast({
      title: "Non-Mess Day Removed",
      description: `You have removed ${dateStr} from your non-mess days.`,
    });

    setUpcomingNonMessDays(upcomingNonMessDays.filter(d => d.getTime() !== date.getTime()));
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Mark Non-Mess Days</CardTitle>
              <CardDescription>Select days when you won't be using the mess</CardDescription>
            </div>
            <CalendarCheck className="h-6 w-6 text-student" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-student-light/70 text-student-dark p-4 rounded-lg mb-6 flex items-start">
            <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              You can mark up to 7 non-mess days per month. Non-mess days must be marked at least 24 hours in advance.
              These days will be excluded from your monthly meal charges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 14 }).map((_, index) => {
              const date = addDays(today, index + 1);
              const dateStr = format(date, "EEE, MMM d");
              const isMarked = upcomingNonMessDays.some(d => d.getTime() === date.getTime());

              return (
                <div key={index} className={`p-4 rounded-lg border-2 border-[#dbdbdb] ${isMarked ? 'border-student bg-student-light/50' : 'hover:border-student-light'}`}>
                  <div className="font-medium">{dateStr}</div>
                  <Button
                    variant={isMarked ? "default" : "outline"}
                    size="sm"
                    className={`mt-2 w-full ${isMarked ? "bg-student hover:bg-student-dark" : "border-student-light hover:bg-student-light/50 text-student-dark"}`}
                    onClick={() => isMarked ? handleRemoveNonMessDay(date) : handleMarkNonMessDay(date)}
                  >
                    {isMarked ? (
                      <>
                        <X className="mr-1 h-3 w-3" /> Remove
                      </>
                    ) : (
                      <>
                        <Check className="mr-1 h-3 w-3" /> Mark
                      </>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Upcoming Non-Mess Days</CardTitle>
          <CardDescription>Days you've marked as non-mess days</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingNonMessDays.length > 0 ? (
            <div className="space-y-2">
              {upcomingNonMessDays
                .sort((a, b) => a.getTime() - b.getTime())
                .map((date, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border-2 border-[#dbdbdb] rounded-lg">
                    <div className="font-medium">{format(date, "EEEE, MMMM d, yyyy")}</div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemoveNonMessDay(date)}
                    >
                      <X className="mr-1 h-4 w-4" /> Cancel
                    </Button>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <CalendarCheck className="h-10 w-10 mx-auto mb-2" />
              No upcoming non-mess days.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MealTracking;
