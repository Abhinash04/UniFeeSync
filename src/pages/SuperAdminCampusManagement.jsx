import SuperAdminLayout from "@/components/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SuperAdminCampusManagement = () => {
  return (
    <SuperAdminLayout currentPage="Campus Management">
      <Card>
        <CardHeader>
          <CardTitle>Campus Management</CardTitle>
          <CardDescription>Manage campus details, facilities, and configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Campus management interface will be displayed here.</p>
        </CardContent>
      </Card>
    </SuperAdminLayout>
  );
};

export default SuperAdminCampusManagement;
