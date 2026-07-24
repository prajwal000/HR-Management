import { getCurrentUser } from "@/lib/dal";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <div className="max-w-md space-y-6">
      <h1 className="text-xl font-semibold text-neutral-900">Profile</h1>

      <div className="rounded-lg border border-neutral-200 bg-white p-6 space-y-4">
        <Field label="Name" value={user.name} />
        <Field label="Email" value={user.email} />
        <Field label="Role" value={user.role} />
        <Field label="Department" value={user.department ?? "—"} />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
        {label}
      </p>
      <p className="mt-1 text-sm text-neutral-900">{value}</p>
    </div>
  );
}
