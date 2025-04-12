import AdminLayout from "../components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const AdminStudentManagement = () => {
  return (
    <AdminLayout currentPage="Student Management">
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>Manage student records, enrollments, and information</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Student management interface will be displayed here.</p>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminStudentManagement;
