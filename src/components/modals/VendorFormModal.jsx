import { useEffect, useState } from 'react'
import { BaseModal } from '../common/BaseModal'
import {  ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const GENDER_OPTIONS = ['Male', 'Female', 'Other', 'Prefer not to say']

const STATUS_OPTIONS = ['Active', 'Pending', 'Suspended']


export function VendorFormModal({ open, onClose, vendor, onSave }) {
  const isEdit = Boolean(vendor)

  const [form, setForm] = useState({
    name: '',
    shopName: '',
    email: '',
    shopDes: '',
    phone: '',
    Gender: 'Male',
    address: '',
    status: 'Pending',
    subscription: 'Free',
  })

  useEffect(() => {
    if (open) {
      if (vendor) {
        setForm({
          name: vendor.name ?? '',
          shopName: vendor.shopName ?? vendor.storeName ?? '',
          email: vendor.email ?? '',
          shopDes: vendor.shopDes ?? vendor.storeDescription ?? '',
          phone: vendor.phone ?? '',
          Gender: vendor.Gender ?? vendor.gender ?? 'Male',
          address: vendor.address ?? '',
          status: vendor.status ?? 'Pending',
          subscription: vendor.subscription ?? 'Free',
        })
      } else {
        setForm({
          name: '',
          shopName: '',
          email: '',
          shopDes: '',
          phone: '',
          Gender: 'Male',
          address: '',
          status: 'Pending',
          subscription: 'Free',
        })
      }
    }
  }, [open, vendor])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
    onClose()
  }

  const renderField = (field, label, type = 'text', options) => {
    if (type === 'textarea') {
      return (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`vendor-${field}`}
            className="text-xs font-medium text-[var(--color-muted)]"
          >
            {label}
          </label>
          <textarea
            id={`vendor-${field}`}
            value={form[field]}
            onChange={handleChange(field)}
            rows={3}
            className="rounded-lg border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)]"
            placeholder={`Enter ${label}`}
          />
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={`vendor-${field}`}
          className="text-xs font-medium text-[var(--color-muted)]"
        >
          {label}
        </label>
        {options ? (
          <div className="relative">
            <select
              id={`vendor-${field}`}
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
            id={`vendor-${field}`}
            type={type}
            value={form[field]}
            onChange={handleChange(field)}
            readOnly={field === 'createdAt' || field === 'approvedAt'}
            className={cn(
              'h-9 rounded-lg border border-[var(--color-border)] bg-transparent px-3 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)]',
              (field === 'createdAt' || field === 'approvedAt') && 'cursor-not-allowed opacity-60'
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
      title={isEdit ? 'Edit Vendor' : 'Add Vendor'}
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
            form="vendor-form"
            className="h-9 rounded-lg bg-[var(--color-primary)] px-4 text-xs font-bold text-[var(--color-surface)] transition-opacity hover:opacity-90"
          >
            {isEdit ? 'Save Changes' : 'Add Vendor'}
          </button>
        </div>
      }
    >
      <form id="vendor-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField('name', 'Full Name')}
          {renderField('shopName', 'Shop Name')}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField('email', 'Email', 'email')}
          {renderField('phone', 'Phone Number', 'tel')}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField('Gender', 'Gender', 'text', GENDER_OPTIONS)}
          {renderField('status', 'Status', 'text', STATUS_OPTIONS)}
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderField('createdAt', 'Created At', 'date')}
          {renderField('approvedAt', 'Approved At', 'date')}
        </div> */}
        {renderField('shopDes', 'Shop Description', 'textarea')}
        {renderField('address', 'Address', 'textarea')}
        <div className="flex flex-col gap-4">
          {/* <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[var(--color-muted)]">Featured Vendor</label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
                className="h-4 w-4 rounded border-[var(--color-border)] bg-transparent text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <span className="text-sm text-[var(--color-text)]">Mark as Featured</span>
            </label>
          </div> */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[var(--color-muted)]">Subscription Plan</label>
            <div className="flex flex-wrap items-center gap-4">
              {['Free', 'Basic', 'Premium'].map((plan) => (
                <label key={plan} className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="subscription"
                    value={plan}
                    checked={form.subscription === plan}
                    onChange={handleChange('subscription')}
                    className="h-4 w-4 border-[var(--color-border)] bg-transparent text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <span className="text-sm text-[var(--color-text)]">{plan}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </form>
    </BaseModal>
  )
}
