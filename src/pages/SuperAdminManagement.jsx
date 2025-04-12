import SuperAdminLayout from "@/components/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SuperAdminManagement = () => {
  return (
    <SuperAdminLayout currentPage="Admin Management">
      <Card>
        <CardHeader>
          <CardTitle>Admin Management</CardTitle>
          <CardDescription>Manage administrator accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Admin management interface will be displayed here.</p>
        </CardContent>
      </Card>
    </SuperAdminLayout>
  );
};

export default SuperAdminManagement;
