import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import Gallery from "../pages/Gallery.jsx";
import Membership from "../pages/MemberShip.jsx";
import ProgramUser, { ProgramDetails } from "../components/Program/ProgramUser.jsx";
import Trainer, { TrainerDetails } from "../pages/Trainer.jsx";
import TrainerEnquiryForm from "../components/Trainer/TrainerEnquiryForm.jsx";
import Payment from "../pages/Payment.jsx";
import TimeTable from "../pages/TimeTable.jsx";
import JoinPage from "../pages/JoinPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import AdminLogin from "../components/Admin/AdminLogin.jsx";
import AdminLayout from "../components/Admin/AdminLayout.jsx";
import Dashboard from "../pages/adminpage/Dashboard.jsx";
import TrainerAdmin from "../pages/adminpage/traineradmin.jsx";
import ProgramAdmin from "../pages/adminpage/program.jsx";
import EnquiryAdmin from "../pages/adminpage/enquiry.jsx";
import TimetableAdmin from "../pages/adminpage/timetable.jsx";
import MembershipAdmin from "../pages/adminpage/membership.jsx";
import SettingsAdmin from "../pages/adminpage/settings.jsx";
import JoinRequests from "../pages/adminpage/joinrequests.jsx";
import OffersAdmin from "../pages/adminpage/offers.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<HomePage />} />
      <Route path="/register" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/programs" element={<ProgramUser />} />
      <Route path="/programs/:id" element={<ProgramDetails />} />
      <Route path="/trainer" element={<Trainer />} />
      <Route path="/trainers/:id" element={<TrainerDetails />} />
      <Route path="/trainers/:id/enquiry" element={<TrainerEnquiryForm />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/membership" element={<Membership />} />
      <Route path="/timetable" element={<TimeTable />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/join" element={<JoinPage />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/adminpage" element={<AdminLayout />}>
        <Route path="dashboard"  element={<Dashboard />} />
        <Route path="trainers"   element={<TrainerAdmin />} />
        <Route path="programs"   element={<ProgramAdmin />} />
        <Route path="enquiries"  element={<EnquiryAdmin />} />
        <Route path="timetable"  element={<TimetableAdmin />} />
        <Route path="memberships" element={<MembershipAdmin />} />
        <Route path="settings"     element={<SettingsAdmin />} />
        <Route path="joinrequests"  element={<JoinRequests />} />
        <Route path="offers" element={<OffersAdmin />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
