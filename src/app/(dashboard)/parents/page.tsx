import { EmptyState } from "@/shared/components/empty-state";
import { PageHeader } from "@/shared/components/page-header";

export default function ParentsPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Directory" }, { label: "Parents", current: true }]}
        title="Parents & Guardians"
        description="Manage guardian records, verification, and communication."
      />
      <EmptyState
        icon="family_restroom"
        title="Parent management is coming soon"
        description="Guardian directory, verification, and messaging will be available in an upcoming release."
      />
    </>
  );
}
