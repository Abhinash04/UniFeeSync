import SuperAdminLayout from "@/components/SuperAdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SuperAdminStudentDirectory = () => {
  return (
    <SuperAdminLayout currentPage="Student Directory">
      <Card>
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
          <CardDescription>View comprehensive student directory across all campuses</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Student directory interface will be displayed here.</p>
        </CardContent>
      </Card>
    </SuperAdminLayout>
  );
};

export default SuperAdminStudentDirectory;
