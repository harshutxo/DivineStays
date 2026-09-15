import { prisma } from "@/lib/prisma";
import LeadsTable from "./LeadsTable";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { property: { select: { name: true } } },
  });

  return (
    <div>
      <h1 className="serif text-3xl">Leads</h1>
      <div className="mt-6">
        <LeadsTable
          leads={leads.map((l) => ({
            id: l.id,
            name: l.name,
            phone: l.phone,
            propertyName: l.property?.name ?? "Any location",
            budgetBand: l.budgetBand,
            roomType: l.roomType,
            status: l.status,
            createdAt: l.createdAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}
