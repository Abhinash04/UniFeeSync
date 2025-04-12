import { Toaster } from "@/components/ui/toaster"; // Make sure this file exists and is error-free
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard"; 
import MealTracking from "./pages/MealTracking";
import FeeManagement from "./pages/FeeManagement";
import PaymentPortal from "./pages/PaymentPortal";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import Protected from "./components/Protected";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudentManagement from "./pages/AdminStudentManagement";
import AdminFeeManagement from "./pages/AdminFeeManagement";
import AdminPaymentRecords from "./pages/AdminPaymentRecords";
import AdminRoomAllocation from "./pages/AdminRoomAllocation";

// Super Admin pages
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SuperAdminManagement from "./pages/SuperAdminManagement";
import SuperAdminCampusManagement from "./pages/SuperAdminCampusManagement";
import SuperAdminStudentDirectory from "./pages/SuperAdminStudentDirectory";
import SuperAdminSystemSettings from "./pages/SuperAdminSystemSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            {/* Student routes */}
            <Route path="/student/dashboard" element={
              <Protected allowedRoles={["student", "admin", "superadmin"]}>
                <StudentDashboard />
              </Protected>
            } />
            <Route path="/student/meal-tracking" element={
              <Protected allowedRoles={["student", "admin", "superadmin"]}>
                <MealTracking />
              </Protected>
            } />
            <Route path="/student/fee-management" element={
              <Protected allowedRoles={["student", "admin", "superadmin"]}>
                <FeeManagement />
              </Protected>
            } />
            <Route path="/student/payment-portal" element={
              <Protected allowedRoles={["student", "admin", "superadmin"]}>
                <PaymentPortal />
              </Protected>
            } />

            {/* Admin routes */}
            <Route path="/admin/dashboard" element={
              <Protected allowedRoles={["admin", "superadmin"]}>
                <AdminDashboard />
              </Protected>
            } />
            <Route path="/admin/student-management" element={
              <Protected allowedRoles={["admin", "superadmin"]}>
                <AdminStudentManagement />
              </Protected>
            } />
            <Route path="/admin/fee-management" element={
              <Protected allowedRoles={["admin", "superadmin"]}>
                <AdminFeeManagement />
              </Protected>
            } />
            <Route path="/admin/payment-records" element={
              <Protected allowedRoles={["admin", "superadmin"]}>
                <AdminPaymentRecords />
              </Protected>
            } />
            <Route path="/admin/room-allocation" element={
              <Protected allowedRoles={["admin", "superadmin"]}>
                <AdminRoomAllocation />
              </Protected>
            } />

            {/* Super Admin routes */}
            <Route path="/superadmin/dashboard" element={
              <Protected allowedRoles={["superadmin"]}>
                <SuperAdminDashboard />
              </Protected>
            } />
            <Route path="/superadmin/admin-management" element={
              <Protected allowedRoles={["superadmin"]}>
                <SuperAdminManagement />
              </Protected>
            } />
            <Route path="/superadmin/campus-management" element={
              <Protected allowedRoles={["superadmin"]}>
                <SuperAdminCampusManagement />
              </Protected>
            } />
            <Route path="/superadmin/student-directory" element={
              <Protected allowedRoles={["superadmin"]}>
                <SuperAdminStudentDirectory />
              </Protected>
            } />
            <Route path="/superadmin/system-settings" element={
              <Protected allowedRoles={["superadmin"]}>
                <SuperAdminSystemSettings />
              </Protected>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
