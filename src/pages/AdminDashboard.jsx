import { Boxes } from "lucide-react";

const stats = [
  ["Total revenue", "$84,260.00", "+12.5%"],
  ["Total orders", "1,429", "+8.2%"],
  ["Active vendors", "264", "+18.4%"],
  ["Pending reviews", "18", "Needs action"],
];
const orders = [
  ["#MK-10492", "Olivia Martin", "Urban Nest", "$248.00", "Completed"],
  ["#MK-10491", "Liam Johnson", "Lumière", "$89.00", "Processing"],
  ["#MK-10490", "Emma Wilson", "Wander & Co.", "$142.00", "Completed"],
];
export function AdminDashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, change], index) => (
          <article
            key={label}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-card)]"
          >
            <span className="mb-4 grid size-10 place-items-center rounded-lg bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              <Boxes size={20} />
            </span>
            <p className="text-xs text-[var(--color-muted)]">{label}</p>
            <h3 className="my-1 text-2xl font-bold tracking-tight">{value}</h3>
            <span
              className={
                index === 3
                  ? "text-xs font-semibold text-[var(--color-warning)]"
                  : "text-xs font-semibold text-[var(--color-success)]"
              }
            >
              {change}
            </span>
          </article>
        ))}
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.65fr_1fr]">
        <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h2 className="font-bold">Revenue overview</h2>
          <p className="text-xs text-[var(--color-muted)]">
            Marketplace performance over the last 7 days
          </p>
          <div className="mt-5 flex h-52 items-end justify-around gap-3 border-b border-[var(--color-border)] bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_43px,var(--color-border)_44px)] p-3">
            {[43, 58, 48, 76, 62, 84, 72].map((height, i) => (
              <div
                key={i}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <i
                  className="w-full max-w-10 rounded-t-md bg-[var(--color-primary)]"
                  style={{ height: `${height}%` }}
                />
                <small className="text-[10px] text-[var(--color-muted)]">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                </small>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h2 className="font-bold">Top vendors</h2>
          <p className="text-xs text-[var(--color-muted)]">
            By sales this month
          </p>
          {[
            ["Urban Nest", "$12,480"],
            ["Wander & Co.", "$9,820"],
            ["Lumière", "$8,540"],
            ["Northline", "$7,260"],
          ].map(([name, sales]) => (
            <div
              key={name}
              className="flex items-center gap-3 border-b border-[var(--color-border)] py-4 last:border-0"
            >
              <span className="grid size-8 place-items-center rounded-full bg-[var(--color-primary-soft)] text-xs font-bold text-[var(--color-primary)]">
                {name.slice(0, 2)}
              </span>
              <b className="flex-1 text-xs">{name}</b>
              <small className="text-xs text-[var(--color-muted)]">
                {sales}
              </small>
            </div>
          ))}
        </article>
      </div>
      <OrdersTable orders={orders} />
    </>
  );
}
function OrdersTable({ orders }) {
  return (
    <article className="mt-4 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="p-5">
        <h2 className="font-bold">Recent orders</h2>
        <p className="text-xs text-[var(--color-muted)]">
          Latest marketplace purchases
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left text-xs">
          <thead className="bg-[var(--color-page)] text-[var(--color-muted)]">
            <tr>
              {["Order", "Customer", "Vendor", "Total", "Status"].map((x) => (
                <th key={x} className="px-5 py-3 font-semibold">
                  {x}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((row) => (
              <tr
                key={row[0]}
                className="border-t border-[var(--color-border)]"
              >
                {row.map((cell, i) => (
                  <td key={cell} className="px-5 py-4">
                    {i === 4 ? (
                      <span className="rounded-full bg-[var(--color-success-soft)] px-2 py-1 font-semibold text-[var(--color-success)]">
                        {cell}
                      </span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
