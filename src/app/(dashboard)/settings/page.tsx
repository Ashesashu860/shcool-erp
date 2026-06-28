import { EmptyState } from "@/shared/components/empty-state";
import { PageHeader } from "@/shared/components/page-header";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Workspace" }, { label: "Settings", current: true }]}
        title="Settings"
        description="Configure your institution, roles, and preferences."
      />
      <EmptyState
        icon="settings"
        title="Settings are coming soon"
        description="Institution configuration, roles, and preferences will be available in an upcoming release."
      />
    </>
  );
}
