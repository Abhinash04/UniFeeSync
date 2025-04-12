import SuperAdminLayout from "../components/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const SuperAdminSystemSettings = () => {
  return (
    <SuperAdminLayout currentPage="System Settings">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Configure global system settings and parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">System settings interface will be displayed here.</p>
        </CardContent>
      </Card>
    </SuperAdminLayout>
  );
};

export default SuperAdminSystemSettings;
