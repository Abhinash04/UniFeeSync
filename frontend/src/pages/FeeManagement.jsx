import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import StudentLayout from "@/components/StudentLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Receipt, Download, CreditCard, Clock, CheckCircle, ArrowRight, FileText } from "lucide-react";
import { format } from "date-fns";

const FeeManagement = () => {
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
    <StudentLayout currentPage="Fee & Invoice Management">
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="summary">Fee Summary</TabsTrigger>
          <TabsTrigger value="invoices">Invoices & Receipts</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <FeeSummaryContent />
        </TabsContent>

        <TabsContent value="invoices">
          <InvoicesContent />
        </TabsContent>
      </Tabs>
    </StudentLayout>
  );
};

const FeeSummaryContent = () => {
  const navigate = useNavigate();

  const feeDetails = [
    { name: "Mess Fee", amount: 3500, status: "pending" },
    { name: "Hostel Rent", amount: 0, status: "paid" },
    { name: "Utilities", amount: 1000, status: "pending" },
    { name: "Internet Charges", amount: 0, status: "paid" },
  ];

  const totalPending = feeDetails.reduce((sum, fee) =>
    fee.status === "pending" ? sum + fee.amount : sum, 0
  );

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Fee Status</CardTitle>
              <CardDescription>Academic Year 2023-2024</CardDescription>
            </div>
            <Receipt className="h-6 w-6 text-student" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-student-light/70 rounded-lg p-4">
              <div className="text-sm text-student-dark mb-1">Total Fees</div>
              <div className="text-2xl font-bold">₹12,500</div>
            </div>
            <div className="bg-green-100 rounded-lg p-4">
              <div className="text-sm text-green-700 mb-1">Paid Amount</div>
              <div className="text-2xl font-bold">₹8,000</div>
            </div>
            <div className="bg-orange-100 rounded-lg p-4">
              <div className="text-sm text-orange-700 mb-1">Due Amount</div>
              <div className="text-2xl font-bold">₹4,500</div>
            </div>
          </div>

          <div className="space-y-4">
            {feeDetails.map((fee, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-2 border-[#dbdbdb] rounded-lg">
                <div>
                  <h3 className="font-medium">{fee.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Due Date: {format(new Date(), "MMMM d, yyyy")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-medium">₹{fee.amount.toLocaleString()}</div>
                    <div className={`text-sm ${fee.status === "paid" ? "text-green-600" : "text-orange-600"}`}>
                      {fee.status === "paid" ? "Paid" : "Pending"}
                    </div>
                  </div>
                  {fee.status === "pending" && (
                    <Button
                      size="sm"
                      className="bg-student hover:bg-student-dark"
                      onClick={() => navigate("/student/payment-portal")}
                    >
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t border-[#dbdbdb] bg-muted/50 flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Due Amount</p>
            <p className="text-xl font-bold">₹{totalPending.toLocaleString()}</p>
          </div>
          <Button
            className="bg-student hover:bg-student-dark"
            onClick={() => navigate("/student/payment-portal")}
          >
            Proceed to Payment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Payment Timeline</CardTitle>
          <CardDescription>Monthly payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { month: "April 2023", amount: 4500, status: "paid", date: "April 10, 2023" },
              { month: "March 2023", amount: 4500, status: "paid", date: "March 8, 2023" },
              { month: "February 2023", amount: 4500, status: "paid", date: "February 12, 2023" },
              { month: "January 2023", amount: 4500, status: "paid", date: "January 9, 2023" },
            ].map((payment, index) => (
              <div key={index} className="flex items-center p-4 border-2 border-[#dbdbdb] rounded-lg">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                  payment.status === "paid" ? "bg-green-100" : "bg-orange-100"
                }`}>
                  {payment.status === "paid" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-orange-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{payment.month}</h3>
                    <div className="font-medium">₹{payment.amount.toLocaleString()}</div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <div className="text-sm text-muted-foreground">Paid on {payment.date}</div>
                    <div className="text-sm text-green-600">Paid</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const InvoicesContent = () => {
  const invoices = [
    { id: "INV-2023-04", date: "April 1, 2023", amount: 4500, status: "pending" },
    { id: "INV-2023-03", date: "March 1, 2023", amount: 4500, status: "paid" },
    { id: "INV-2023-02", date: "February 1, 2023", amount: 4500, status: "paid" },
    { id: "INV-2023-01", date: "January 1, 2023", amount: 4500, status: "paid" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>View and download your invoices</CardDescription>
            </div>
            <FileText className="h-6 w-6 text-student" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-2 border-[#dbdbdb] rounded-lg">
                <div>
                  <h3 className="font-medium">{invoice.id}</h3>
                  <p className="text-sm text-muted-foreground">Generated on {invoice.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-medium">₹{invoice.amount.toLocaleString()}</div>
                    <div className={`text-sm ${invoice.status === "paid" ? "text-green-600" : "text-orange-600"}`}>
                      {invoice.status === "paid" ? "Paid" : "Pending"}
                    </div>
                  </div>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  {invoice.status === "pending" && (
                    <Button
                      size="sm"
                      className="bg-student hover:bg-student-dark"
                    >
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Receipts</CardTitle>
          <CardDescription>View and download your payment receipts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: "RCPT-2023-03", date: "March 8, 2023", amount: 4500, method: "Credit Card" },
              { id: "RCPT-2023-02", date: "February 12, 2023", amount: 4500, method: "Net Banking" },
              { id: "RCPT-2023-01", date: "January 9, 2023", amount: 4500, method: "UPI" },
            ].map((receipt, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-2 border-[#dbdbdb] rounded-lg">
                <div>
                  <h3 className="font-medium">{receipt.id}</h3>
                  <p className="text-sm text-muted-foreground">Paid on {receipt.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-medium">₹{receipt.amount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">via {receipt.method}</div>
                  </div>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeeManagement;
