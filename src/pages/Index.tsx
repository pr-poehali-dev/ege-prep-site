import { useState } from "react";
import { Page } from "@/components/data";
import Navbar, { BottomNav } from "@/components/Navbar";
import { HomePage, CoursesPage, TestsPage, MaterialsPage } from "@/components/pages/ContentPages";
import { ProgressPage, ProfilePage, AboutPage } from "@/components/pages/UserPages";
import { TheoryPage } from "@/components/pages/TheoryPage";
import { ExamPage } from "@/components/pages/ExamPage";

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage />;
      case "courses":
        return <CoursesPage />;
      case "tests":
        return <TestsPage />;
      case "materials":
        return <MaterialsPage />;
      case "exams":
        return <ExamPage />;
      case "theory":
        return <TheoryPage />;
      case "progress":
        return <ProgressPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <Navbar
        page={page}
        setPage={setPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{renderPage()}</main>

      <BottomNav page={page} setPage={setPage} />

      <div className="h-20 md:h-0" />
    </div>
  );
}