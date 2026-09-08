import { useState } from "react"
import { DataTable } from "../../components/common/DataTable"
import { OrderFormModal } from "../../components/modals/OrderFormModal"

const orderHeaders = [
  {
    key: "orderId",
    label: "Order ID",
    truncate: true,
    maxWidth: "10rem",
    getTooltip: (value) => `${value}`,
  },
  "customerName",
  "storeName",
  "items",
  "total",
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${value === "Delivered" ? "bg-[var(--color-success-soft)] text-[var(--color-success)]" : value === "Pending" ? "bg-[var(--color-warning-soft)] text-[var(--color-warning)]" : "bg-[var(--color-danger-soft)] text-[var(--color-danger)]"}`}
      >
        {value}
      </span>
    ),
  },
  "orderDate",
];

const demoOrders = [
  {
    id: 1,
    orderId: "ORD-1024",
    customerName: "Mira Patel",
    storeName: "Urban Nest",
    items: 3,
    total: "$214.50",
    status: "Delivered",
    orderDate: "2026-08-10",
  },
  {
    id: 2,
    orderId: "ORD-1023",
    customerName: "Liam Carter",
    storeName: "Wander & Co.",
    items: 1,
    total: "$89.00",
    status: "Pending",
    orderDate: "2026-08-11",
  },
  {
    id: 3,
    orderId: "ORD-1022",
    customerName: "Ava Thompson",
    storeName: "Lumière",
    items: 5,
    total: "$342.75",
    status: "Delivered",
    orderDate: "2026-08-11",
  },
  {
    id: 4,
    orderId: "ORD-1021",
    customerName: "Noah Williams",
    storeName: "Northline",
    items: 2,
    total: "$126.40",
    status: "Cancelled",
    orderDate: "2026-08-12",
  },
  {
    id: 5,
    orderId: "ORD-1020",
    customerName: "Emma Wilson",
    storeName: "Studio 44",
    items: 4,
    total: "$198.20",
    status: "Delivered",
    orderDate: "2026-08-12",
  },
  {
    id: 6,
    orderId: "ORD-1019",
    customerName: "Oliver Brown",
    storeName: "Kindred Goods",
    items: 2,
    total: "$74.90",
    status: "Pending",
    orderDate: "2026-08-13",
  },
  {
    id: 7,
    orderId: "ORD-1018",
    customerName: "Sophia Davis",
    storeName: "The Daily Edit",
    items: 1,
    total: "$45.00",
    status: "Delivered",
    orderDate: "2026-08-13",
  },
  {
    id: 8,
    orderId: "ORD-1017",
    customerName: "James Miller",
    storeName: "Fern & Form",
    items: 3,
    total: "$167.30",
    status: "Delivered",
    orderDate: "2026-08-14",
  },
  {
    id: 9,
    orderId: "ORD-1016",
    customerName: "Isabella Moore",
    storeName: "Arden Home",
    items: 2,
    total: "$112.60",
    status: "Pending",
    orderDate: "2026-08-14",
  },
  {
    id: 10,
    orderId: "ORD-1015",
    customerName: "Benjamin Lee",
    storeName: "Still Studio",
    items: 1,
    total: "$58.00",
    status: "Cancelled",
    orderDate: "2026-08-15",
  },
  {
    id: 11,
    orderId: "ORD-1014",
    customerName: "Charlotte Hall",
    storeName: "Little Loom",
    items: 4,
    total: "$289.15",
    status: "Delivered",
    orderDate: "2026-08-15",
  },
  {
    id: 12,
    orderId: "ORD-1013",
    customerName: "Henry Young",
    storeName: "Morrow Supply",
    items: 2,
    total: "$96.75",
    status: "Pending",
    orderDate: "2026-08-16",
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(demoOrders)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const totalPages = Math.max(1, Math.ceil(orders.length / pageSize))

  const handleCreate = () => {
    setEditingOrder(null)
    setModalOpen(true)
  }

  const handleEdit = (order) => {
    setEditingOrder(order)
    setModalOpen(true)
  }

  const handleSave = (formData) => {
    if (editingOrder) {
      setOrders((prev) =>
        prev.map((o) => (o.id === editingOrder.id ? { ...o, ...formData } : o))
      )
    } else {
      const newOrder = {
        id: Date.now(),
        orderId: formData.orderId || `ORD-${Date.now()}`,
        customerName: formData.customerName,
        storeName: formData.storeName,
        items: Number(formData.items) || 0,
        total: formData.total,
        status: formData.status,
        orderDate: formData.orderDate,
      }
      setOrders((prev) => [...prev, newOrder])
    }
  }

  return (
    <>
      <DataTable
        headers={orderHeaders}
        rows={orders}
        rowKey="id"
        tableName="Orders"
        visibleRows={10}
        emptyMessage="No orders found."
        sortableFields={["orderId", "customerName", "storeName", "total", "status", "orderDate"]}
        createLabel="Add order"
        onCreate={handleCreate}
        onShow={(order) => console.log("Show order", order)}
        onEdit={handleEdit}
        onDelete={(order) => setOrders((current) => {
          const remaining = current.filter((item) => item.id !== order.id)
          return remaining
        })}
        searchable
      />
      <OrderFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingOrder(null) }}
        order={editingOrder}
        onSave={handleSave}
      />
    </>
  )
}

export default Orders