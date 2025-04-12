import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import StudentLayout from "@/components/StudentLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, CheckCircle, RotateCcw, Info, ArrowRight, Clock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
// import { format } from "date-fns"

const PaymentPortal = () => {
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
    <StudentLayout currentPage="Payment Portal">
      <Tabs defaultValue="payment" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="payment">Make Payment</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payment">
          <PaymentContent />
        </TabsContent>
        
        <TabsContent value="history">
          <HistoryContent />
        </TabsContent>
      </Tabs>
    </StudentLayout>
  );
};

const PaymentContent = () => {
  const [amount, setAmount] = useState("4500");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handlePayment = () => {
    if (paymentMethod === "card" && (!cardNumber || !cardName || !cardExpiry || !cardCvv)) {
      toast({
        title: "Missing information",
        description: "Please fill all card details to proceed",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: `Your payment of ₹${amount} has been processed successfully.`,
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Make a Payment</CardTitle>
              <CardDescription>Pay your fees securely</CardDescription>
            </div>
            <CreditCard className="h-6 w-6 text-student" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-student-light/70 text-student-dark p-4 rounded-lg mb-6 flex items-start">
            <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              Your current outstanding payment is ₹4,500. You can pay the full amount or a partial amount of your choice.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Payment Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={setPaymentMethod}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <Label htmlFor="netbanking">Net Banking</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi">UPI</Label>
                </div>
              </RadioGroup>
            </div>
            
            {paymentMethod === "card" && (
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="**** **** **** ****"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Expiry Date</Label>
                    <Input
                      id="cardExpiry"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvv">CVV</Label>
                    <Input
                      id="cardCvv"
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="***"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {paymentMethod === "netbanking" && (
              <div className="p-4 border rounded-lg">
                <p className="text-muted-foreground mb-4">Select your bank to proceed with Net Banking payment.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["SBI", "HDFC", "ICICI", "Axis", "PNB", "Bank of Baroda"].map((bank) => (
                    <div key={bank} className="flex items-center p-3 border rounded-lg cursor-pointer hover:border-student-light">
                      <RadioGroupItem 
                        value={bank.toLowerCase()} 
                        id={bank.toLowerCase()} 
                        className="mr-2"
                      />
                      <Label htmlFor={bank.toLowerCase()}>{bank} Bank</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {paymentMethod === "upi" && (
              <div className="p-4 border rounded-lg space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@upi"
                  />
                  <p className="text-xs text-muted-foreground">Enter your UPI ID (e.g., name@okicici, name@ybl)</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/50">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-xl font-bold">₹{parseFloat(amount).toLocaleString()}</p>
            </div>
            <Button 
              className="w-full sm:w-auto bg-student hover:bg-student-dark"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Pay Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const HistoryContent = () => {
  // Sample payment history data
  const payments = [
    { 
      id: "TXN123456", 
      date: "March 8, 2023", 
      amount: 4500, 
      method: "Credit Card", 
      status: "success",
      description: "April Mess Fee"
    },
    { 
      id: "TXN123455", 
      date: "February 12, 2023", 
      amount: 4500, 
      method: "Net Banking", 
      status: "success",
      description: "March Mess Fee"
    },
    { 
      id: "TXN123454", 
      date: "January 9, 2023", 
      amount: 4500, 
      method: "UPI", 
      status: "success",
      description: "February Mess Fee"
    },
    { 
      id: "TXN123453", 
      date: "December 15, 2022", 
      amount: 1000, 
      method: "Credit Card", 
      status: "refunded",
      description: "Additional Utilities (Refunded)"
    },
  ];
  
  const [selectedPayment, setSelectedPayment] = useState<typeof payments[0] | null>(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  
  const handleRefundRequest = () => {
    setShowRefundModal(false);
    toast({
      title: "Refund Request Submitted",
      description: "Your refund request has been submitted successfully. We'll process it within 3-5 business days.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View your past transactions</CardDescription>
            </div>
            <CreditCard className="h-6 w-6 text-student" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment, index) => (
              <div 
                key={index} 
                className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-student-light"
                onClick={() => setSelectedPayment(payment)}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                  payment.status === "success" ? "bg-green-100" : "bg-orange-100"
                }`}>
                  {payment.status === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <RotateCcw className="h-5 w-5 text-orange-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{payment.description}</h3>
                    <div className="font-medium">₹{payment.amount.toLocaleString()}</div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <div className="text-sm text-muted-foreground">
                      {payment.date} • {payment.method}
                    </div>
                    <div className={`text-sm ${
                      payment.status === "success" ? "text-green-600" : "text-orange-600"
                    }`}>
                      {payment.status === "success" ? "Completed" : "Refunded"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {selectedPayment && (
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>Transaction ID: {selectedPayment.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-medium">{selectedPayment.date}, 10:30 AM</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium">{selectedPayment.method}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium">₹{selectedPayment.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className={`font-medium ${
                    selectedPayment.status === "success" ? "text-green-600" : "text-orange-600"
                  }`}>
                    {selectedPayment.status === "success" ? "Successful" : "Refunded"}
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="font-medium">{selectedPayment.description}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50">
            <div className="w-full flex flex-col sm:flex-row items-center gap-4">
              <Button 
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => setSelectedPayment(null)}
              >
                Close
              </Button>
              {selectedPayment.status === "success" && (
                <Button 
                  variant="outline"
                  className="w-full sm:w-auto border-orange-500 text-orange-600 hover:bg-orange-50"
                  onClick={() => setShowRefundModal(true)}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Request Refund
                </Button>
              )}
              <Button 
                variant="outline"
                className="w-full sm:w-auto"
              >
                Download Receipt
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
      
      {showRefundModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Request Refund</CardTitle>
              <CardDescription>
                Please provide a reason for your refund request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="refundReason">Reason for Refund</Label>
                  <select id="refundReason" className="w-full p-2 border rounded-md">
                    <option value="">Select a reason</option>
                    <option value="duplicate">Duplicate Payment</option>
                    <option value="error">Payment Error</option>
                    <option value="service">Service Not Received</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refundComment">Additional Comments</Label>
                  <textarea 
                    id="refundComment" 
                    className="w-full p-2 border rounded-md h-24"
                    placeholder="Please provide more details about your refund request"
                  ></textarea>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Button 
                variant="outline"
                onClick={() => setShowRefundModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-student hover:bg-student-dark"
                onClick={handleRefundRequest}
              >
                Submit Request
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PaymentPortal;
