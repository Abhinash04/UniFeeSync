
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, User, Users, Building, Receipt } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout currentPage="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-student-light hover:shadow-md transition-shadow">
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
    <Users className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent className="space-y-1">
    <div className="text-2xl font-bold">534</div>

    <div className="my-2 border-t border-gray-500" />

    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <p className="text-green-600 font-medium">+4.25% <span className="text-muted-foreground font-normal">from Last month</span></p>
      <a href="#" className="text-muted-foreground hover:underline">View more →</a>
    </div>
  </CardContent>
</Card>
        <Card className="border-student-light hover:shadow-md transition-shadow">
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Rooms Occupied</CardTitle>
    <Building className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent className="space-y-1">
    <div className="text-2xl font-bold">87%</div>

    <div className="my-2 border-t border-gray-500" />

    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <p className="text-green-600 font-medium">+2% <span className="text-muted-foreground font-normal">from Last month</span></p>
      <a href="#" className="text-muted-foreground hover:underline">View more →</a>
    </div>
  </CardContent>
</Card>
<Card className="border-student-light hover:shadow-md transition-shadow">
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
    <Receipt className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent className="space-y-1">
    <div className="text-2xl font-bold">$253,418</div>

    <div className="my-2 border-t border-gray-500" />

    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <p className="text-green-600 font-medium">+18% <span className="text-muted-foreground font-normal">from Last month</span></p>
      <a href="#" className="text-muted-foreground hover:underline">View more →</a>
    </div>
  </CardContent>
</Card>
<Card className="border-student-light hover:shadow-md transition-shadow">
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
    <Receipt className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent className="space-y-1">
    <div className="text-2xl font-bold">24</div>

    <div className="my-2 border-t border-gray-500" />

    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <p className="text-green-600 font-medium">-4 <span className="text-muted-foreground font-normal">from yesterday</span></p>
      <a href="#" className="text-muted-foreground hover:underline">View more →</a>
    </div>
  </CardContent>
</Card>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card className="col-span-2 border-student-light hover:shadow-md transition-shadow">
            <CardHeader className="shadow-xs">
              <CardTitle>Monthly Fee Collection</CardTitle>
            </CardHeader>
            <CardContent className="flex h-80 items-center justify-center border-none shadow-xl pt-4">
              <LineChart className="h-40 w-40 text-muted-foreground" />
              <p className="text-center text-sm text-muted-foreground">Chart showing monthly fee collection trends</p>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-student-light hover:shadow-md transition-shadow">
              <CardHeader className="shadow-xs">
                <CardTitle>Student Distribution by Year</CardTitle>
              </CardHeader>
              <CardContent className="flex h-80 items-center justify-center border-none shadow-xl pt-4">
                <PieChart className="h-40 w-40 text-muted-foreground" />
                <p className="text-center text-sm text-muted-foreground">Student distribution chart</p>
              </CardContent>
            </Card>
            <Card className="border-student-light hover:shadow-md transition-shadow">
              <CardHeader className="shadow-xs">
                <CardTitle>Room Occupancy by Floor</CardTitle>
              </CardHeader>
              <CardContent className="flex h-80 items-center justify-center border-none shadow-xl pt-4">
                <BarChart className="h-40 w-40 text-muted-foreground" />
                <p className="text-center text-sm text-muted-foreground">Room occupancy chart</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDashboard;
