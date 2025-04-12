import AdminLayout from "../components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const AdminRoomAllocation = () => {
  return (
    <AdminLayout currentPage="Room Allocation">
      <Card>
        <CardHeader>
          <CardTitle>Room Allocation</CardTitle>
          <CardDescription>Manage dormitory room assignments and allocations</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Room allocation interface will be displayed here.</p>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminRoomAllocation;
