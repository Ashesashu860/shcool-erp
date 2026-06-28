import { EmptyState } from "@/shared/components/empty-state";
import { PageHeader } from "@/shared/components/page-header";

export default function TeachersPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Directory" }, { label: "Teachers", current: true }]}
        title="Teachers"
        description="Manage faculty members, assignments, and departments."
      />
      <EmptyState
        icon="person_4"
        title="Teacher management is coming soon"
        description="Faculty directory, assignments, and onboarding will be available in an upcoming release."
      />
    </>
  );
}
