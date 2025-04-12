import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "../components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showStudentDialog, setShowStudentDialog] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const images = [
    'https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1679547203090-6313a91d4478?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1664372145865-c7526455ea94?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleLogin = async (role) => {
    if (role === "student") {
      if (!registrationNumber || !password) {
        toast({
          title: "Missing information",
          description: "Please provide both registration number and password",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (!email || !password) {
        toast({
          title: "Missing information",
          description: "Please provide both email and password",
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);
    try {
      const success = await login(
        role === "student" ? registrationNumber : email,
        password,
        role
      );
      if (success) {
        toast({
          title: "Login successful",
          description: `Welcome back!`,
        });

        if (role === "student") {
          navigate("/student/dashboard");
        } else if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/superadmin/dashboard");
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formContent = (
    <div className="w-full max-w-md p-4 justify-center items-center mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-student-dark">UniFeeSync</h1>
        <p className="text-muted-foreground">Please log in to continue</p>
      </div>

      <Tabs defaultValue="student" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="superadmin">Super Admin</TabsTrigger>
        </TabsList>

        <TabsContent value="student">
          <StudentLoginCard
            title="Student Login"
            description="Enter your student credentials"
            registrationNumber={registrationNumber}
            setRegistrationNumber={setRegistrationNumber}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            onSubmit={() => handleLogin("student")}
            onForgotPassword={() => setShowStudentDialog(true)}
          />
        </TabsContent>

        <TabsContent value="admin">
          <AdminLoginCard
            title="Admin Login"
            description="Enter your admin credentials"
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            onSubmit={() => handleLogin("admin")}
            onForgotPassword={() => setShowAdminDialog(true)}
          />
        </TabsContent>

        <TabsContent value="superadmin">
          <AdminLoginCard
            title="Super Admin Login"
            description="Enter your super admin credentials"
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            onSubmit={() => handleLogin("superadmin")}
            onForgotPassword={() => setShowAdminDialog(true)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <>
      <div className="md:hidden flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
        <div className="w-full max-w-md p-4 bg-secondary/30 backdrop-blur-sm rounded-lg">
          {formContent}
          <StudentDialog showDialog={showStudentDialog} setShowDialog={setShowStudentDialog} />
          <AdminDialog showDialog={showAdminDialog} setShowDialog={setShowAdminDialog} />
        </div>
      </div>

      <div className="hidden md:flex min-h-screen">
        <div className="w-1/2 p-4">
          {formContent}
          <StudentDialog showDialog={showStudentDialog} setShowDialog={setShowStudentDialog} />
          <AdminDialog showDialog={showAdminDialog} setShowDialog={setShowAdminDialog} />
        </div>
        <div className="w-1/2 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}></div>
      </div>
    </>
  );
};

const StudentLoginCard = ({ title, description, registrationNumber, setRegistrationNumber, password, setPassword, isLoading, onSubmit, onForgotPassword }) => {
  return (
    <Card className="border-student">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input
              id="registrationNumber"
              type="text"
              placeholder="Enter your registration number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4 text-right">
            <Button variant="link" onClick={onForgotPassword}>
              Forgot Password?
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-student hover:bg-student-dark"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const AdminLoginCard = ({ title, description, email, setEmail, password, setPassword, isLoading, onSubmit, onForgotPassword }) => {
  return (
    <Card className="border-student">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4 text-right">
            <Button variant="link" onClick={onForgotPassword}>
              Forgot Password?
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-student hover:bg-student-dark"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const StudentDialog = ({ showDialog, setShowDialog }) => {
  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription>
            Visit your hostel reception or contact your advisor to reset your password.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setShowDialog(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AdminDialog = ({ showDialog, setShowDialog }) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription>
            Contact the academic section of the university to reset your password.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setShowDialog(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Login;