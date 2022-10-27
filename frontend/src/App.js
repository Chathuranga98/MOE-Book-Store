import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Dashboard from './components/admin/dashboard.js';
import DivisionalOffice from './components/admin/divisional_office.js';
import Announcement from './components/admin/announcement.js';
import BookRequest from './components/admin/book request.js';
import Admin_Private_user from './components/admin/private_user.js';
import Admin_bookshop from './components/admin/bookshop.js';
import Admin_subjects from './components/admin/subjects.js';
import GivePermissionForBookShop from './components/admin/givePermissionForBookShop.js';
import View_announcement_by_admin from './components/admin/view_announcement_by_admin.js';

import DivisionalOffice_dashboard from './components/education_division/dashboard.js';
import DivisionalOffice_Schools from './components/education_division/schools.js';
import Notice_for_deo from './components/education_division/notice_for_deo.js';
import Notice_view_deo from './components/education_division/view_announcement_by_deo.js';
import BookRequestToDeo from './components/education_division/book_request_to_deo.js';

import SchoolsDashboard from './components/school/dashboard.js';
import SchoolsBook_request_Deo from './components/school/book_request_to_edo.js';
import RequestBookFromSchool from './components/school/book_request_from_school.js';
import Notice_for_school from './components/school/notice_for_school.js';
import ViewAnnouncement from './components/school/view_announcement_by_schools.js';
import Received_book_request from './components/school/received_book_request.js';
import School_profile from './components/school/school_profile.js';

import Private_user_reg from './components/private_user/registration.js';
import Private_user_login from './components/private_user/login.js';
import Private_user_dashboard from './components/private_user/dashboard.js';
import Private_user_books from './components/private_user/books.js';
import Private_books_buying_history from './components/private_user/buying_history.js';
import Private_OneShop from './components/private_user/one_Shop.js';
import Private_notice from './components/private_user/notice_for_private_user.js';
import Private_notice_view_announcement from './components/private_user/view_announcement_by_private_user.js';

import Bookshop_dashboard from './components/bookshop/dashboard.js';
import Bookshop_book_request from './components/bookshop/book_request.js';
import Bookshop_books from './components/bookshop/books.js';
import BookshopSelfReg from './components/bookshop/bookshop_reg.js';
import Book_selling from './components/bookshop/book_selling.js';

import Home from './components/home.js';

import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/Admin_Dashboard" element={<Dashboard />} />
          <Route path="/DivisionalOffice" element={<DivisionalOffice />} />
          <Route path="/DivisionalOffice_dashboard" element={<DivisionalOffice_dashboard />} />
          <Route path="/DivisionalOffice_Schools" element={<DivisionalOffice_Schools />} />
          <Route path="/SchoolsDashboard" element={<SchoolsDashboard />} />
          <Route path="/SchoolsBook_request_Deo" element={<SchoolsBook_request_Deo />} />
          <Route path="/Admin_Announcement" element={<Announcement />} />
          <Route path="/RequestBookFromSchool" element={<RequestBookFromSchool />} />
          <Route path="/Admin_BookRequest" element={<BookRequest />} />
          <Route path="/Notice_for_deo" element={<Notice_for_deo />} />
          <Route path="/Notice_for_school" element={<Notice_for_school />} />
          <Route path="/ViewAnnouncement" element={<ViewAnnouncement />} />
          <Route path="/Notice_view_deo" element={<Notice_view_deo />} />
          <Route path="/BookRequestToDeo" element={<BookRequestToDeo />} />
          <Route path="/Received_book_request" element={<Received_book_request />} />
          <Route path="/Private_user_reg" element={<Private_user_reg />} />
          <Route path="/Admin_Private_user" element={<Admin_Private_user />} />
          <Route path="/Private_user_login" element={<Private_user_login />} />
          <Route path="/Admin_bookshop" element={<Admin_bookshop />} />
          <Route path="/Admin_subjects" element={<Admin_subjects />} />
          <Route path="/Bookshop_dashboard" element={<Bookshop_dashboard />} />
          <Route path="/Bookshop_book_request" element={<Bookshop_book_request />} />
          <Route path="/Bookshop_books" element={<Bookshop_books />} />
          <Route path="/Private_user_dashboard" element={<Private_user_dashboard />} />
          <Route path="/Private_user_books" element={<Private_user_books />} />
          <Route path="/Private_books_buying_history" element={<Private_books_buying_history />} />
          <Route path="/BookshopSelfReg" element={<BookshopSelfReg />} />
          <Route path="/GivePermissionForBookShop" element={<GivePermissionForBookShop />} />
          <Route path="/View_announcement_by_admin" element={<View_announcement_by_admin />} />
          <Route path="/Private_OneShop" element={<Private_OneShop />} />
          <Route path="/Private_notice" element={<Private_notice />} />
          <Route path="/School_profile" element={<School_profile />} />
          <Route path="/Private_notice_view_announcement" element={<Private_notice_view_announcement />} />
          <Route path="/Book_selling" element={<Book_selling />} />
          <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
