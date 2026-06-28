import { EmptyState } from "@/shared/components/empty-state";
import { PageHeader } from "@/shared/components/page-header";

export default function PrincipalsPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Directory" }, { label: "Principals", current: true }]}
        title="Principals"
        description="Manage school leadership and district assignments."
      />
      <EmptyState
        icon="account_balance"
        title="Principal management is coming soon"
        description="Leadership records and district mapping will be available in an upcoming release."
      />
    </>
  );
}
