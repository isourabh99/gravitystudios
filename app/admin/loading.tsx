import { FullAdminSkeleton } from "@/components/admin/AdminSkeleton";

export default function AdminLoading() {
  return (
    <div className="max-w-8xl mx-auto w-full">
      <FullAdminSkeleton />
    </div>
  );
}
