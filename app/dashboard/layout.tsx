import DashboardNavBar from "../components/DashboardNavBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashboardNavBar />
      {children}
    </div>
  );
}
