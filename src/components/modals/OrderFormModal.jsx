import { useEffect, useState } from 'react'
import { BaseModal } from '../common/BaseModal'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATUS_OPTIONS = ['Delivered', 'Pending', 'Cancelled']

export function OrderFormModal({ open, onClose, order, onSave }) {
  const isEdit = Boolean(order)

  const [form, setForm] = useState({
    orderId: '',
    customerName: '',
    storeName: '',
    items: '',
    total: '',
    status: 'Pending',
    orderDate: '',
  })

  useEffect(() => {
    if (open) {
      if (order) {
        setForm({
          orderId: order.orderId ?? '',
          customerName: order.customerName ?? '',
          storeName: order.storeName ?? '',
          items: order.items ?? '',
          total: order.total ?? '',
          status: order.status ?? 'Pending',
          orderDate: order.orderDate ?? '',
        })
      } else {
        setForm({
          orderId: '',
          customerName: '',
          storeName: '',
          items: '',
          total: '',
          status: 'Pending',
          orderDate: '',
        })
      }
    }
  }, [open, order])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
    onClose()
  }

  const renderField = (field, label, type = 'text', options) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={`order-${field}`}
          className="text-xs font-medium text-[var(--color-muted)]"
        >
          {label}
        </label>
        {options ? (
          <div className="relative">
            <select
              id={`order-${field}`}
              value={form[field]}
              onChange={handleChange(field)}
              className="h-9 w-full appearance-none rounded-lg border border-[var(--color-border)] bg-transparent px-3 pr-9 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-primary)]"
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
            />
          </div>
        ) : (
          <input
            id={`order-${field}`}
            type={type}
            value={form[field]}
            onChange={handleChange(field)}
            className={cn(
              'h-9 rounded-lg border border-[var(--color-border)] bg-transparent px-3 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)]'
            )}
            placeholder={`Enter ${label}`}
          />
        )}
      </div>
    )
  }

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit Order' : 'Add Order'}
      size="lg"
      footer={
        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-lg border border-[var(--color-border)] px-4 text-xs font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="order-form"
            className="h-9 rounded-lg bg-[var(--color-primary)] px-4 text-xs font-bold text-[var(--color-surface)] transition-opacity hover:opacity-90"
          >
            {isEdit ? 'Save Changes' : 'Add Order'}
          </button>
        </div>
      }
    >
      <form id="order-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField('orderId', 'Order ID')}
          {renderField('customerName', 'Customer Name')}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField('storeName', 'Store Name')}
          {renderField('items', 'Items', 'number')}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField('total', 'Total Amount', 'text')}
          {renderField('status', 'Status', 'text', STATUS_OPTIONS)}
        </div>
        {renderField('orderDate', 'Order Date', 'date')}
      </form>
    </BaseModal>
  )
}