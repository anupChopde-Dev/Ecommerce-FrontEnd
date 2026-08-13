import { useMemo, useState } from "react";
import { DataTable } from "../../components/common/DataTable";

const vendorHeaders = [
  "storeName",
  "ownerName",
  { key: "email", label: "Email", truncate: true, maxWidth: "12rem", getTooltip: (value) => `${value}`,
 },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${value === "Active" ? "bg-[var(--color-success-soft)] text-[var(--color-success)]" : "bg-[var(--color-warning-soft)] text-[var(--color-warning)]"}`}
      >
        {value}
      </span>
    ),
  },
  "totalSales",
];

const demoVendors = [
  {
    id: 1,
    storeName: "Urban Nest",
    ownerName: "Mira Patel",
    email: "mira@urbannest.com",
    status: "Active",
    totalSales: "$12,480",
  },
  {
    id: 2,
    storeName: "Wander & Co.",
    ownerName: "Liam Carter",
    email: "liam@wanderco.comkjhihid ibibiufheifuiefihui",
    status: "Active",
    totalSales: "$9,820",
  },
  {
    id: 3,
    storeName: "Lumière",
    ownerName: "Ava Thompson",
    email: "ava@lumiere.com",
    status: "Pending",
    totalSales: "$8,540",
  },
  {
    id: 4,
    storeName: "Northline",
    ownerName: "Noah Williams",
    email: "noah@northline.com",
    status: "Active",
    totalSales: "$7,260",
  },
  {
    id: 5,
    storeName: "Studio 44",
    ownerName: "Emma Wilson",
    email: "emma@studio44.com",
    status: "Active",
    totalSales: "$6,940",
  },
  {
    id: 6,
    storeName: "Kindred Goods",
    ownerName: "Oliver Brown",
    email: "oliver@kindredgoods.com",
    status: "Pending",
    totalSales: "$6,110",
  },
  {
    id: 7,
    storeName: "The Daily Edit",
    ownerName: "Sophia Davis",
    email: "sophia@dailyedit.com",
    status: "Active",
    totalSales: "$5,870",
  },
  {
    id: 8,
    storeName: "Fern & Form",
    ownerName: "James Miller",
    email: "james@fernform.com",
    status: "Active",
    totalSales: "$5,420",
  },
  {
    id: 9,
    storeName: "Arden Home",
    ownerName: "Isabella Moore",
    email: "isabella@ardenhome.com",
    status: "Pending",
    totalSales: "$4,980",
  },
  {
    id: 10,
    storeName: "Still Studio",
    ownerName: "Benjamin Lee",
    email: "ben@stillstudio.com",
    status: "Active",
    totalSales: "$4,650",
  },
  {
    id: 11,
    storeName: "Little Loom",
    ownerName: "Charlotte Hall",
    email: "charlotte@littleloom.com",
    status: "Active",
    totalSales: "$4,320",
  },
  {
    id: 12,
    storeName: "Morrow Supply",
    ownerName: "Henry Young",
    email: "henry@morrow.com",
    status: "Pending",
    totalSales: "$3,890",
  },
];

export function AdminVendors() {
  const [vendors, setVendors] = useState(demoVendors);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(vendors.length / pageSize));
//   const visibleVendors = useMemo(
//     () => vendors.slice((currentPage - 1) * pageSize, currentPage * pageSize),
//     [vendors, currentPage],
//   );

  return (
    <DataTable
      headers={vendorHeaders}
      rows={vendors}
      rowKey="id"
      tableName="Vendors"
      visibleRows={10}
      emptyMessage="No vendors found."
      sortableFields={["storeName", "ownerName", "status", "totalSales"]}
    //   createLabel="Add vendor"
    //   onCreate={() => console.log("Create vendor")}
      onShow={(vendor) => console.log("Show vendor", vendor)}
      onEdit={(vendor) => console.log("Edit vendor", vendor)}
      onDelete={(vendor) => setVendors((current) => {
        const remaining = current.filter((item) => item.id !== vendor.id);
        return remaining;
      })}
    //   pagination
    //  currentPage={currentPage}
    //  totalPages={totalPages}
    //  onPageChange={(page) => setCurrentPage(page)}

      searchable
    // searchValue={search}
    // onSearchChange={handleSearchChange}
    />
  );
}
export function AdminOrders() {
  return null;
}
export function AdminCatalog() {
  return null;
}
export function AdminReports() {
  return null;
}
export function AdminSettings() {
  return null;
}
