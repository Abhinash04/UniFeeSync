
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminPaymentRecords = () => {
  return (
    <AdminLayout currentPage="Payment Records">
      <Card>
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
          <CardDescription>View and manage payment records and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Payment records interface will be displayed here.</p>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminPaymentRecords;
