'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const PRODUCT_OPTIONS = [
  { value: 'fire_screen', label: 'Fire Screen' },
  { value: 'lighting', label: 'Lighting' },
  { value: 'wall_sculpture', label: 'Wall Sculpture' },
  { value: 'mirror', label: 'Mirror' },
  { value: 'table', label: 'Table' },
  { value: 'multiple', label: 'Multiple Pieces' },
  { value: 'other', label: 'Other' },
]

const FINISH_OPTIONS = [
  { value: 'aged_gold', label: 'Aged Gold' },
  { value: 'aged_silver', label: 'Aged Silver' },
  { value: 'brilliant_gold', label: 'Brilliant Gold' },
  { value: 'gold_rubbed_black', label: 'Gold Rubbed Black' },
  { value: 'tobacco', label: 'Tobacco' },
  { value: 'warm_black', label: 'Warm Black' },
  { value: 'other', label: 'Other' },
]

const ENVIRONMENT_OPTIONS = [
  { value: 'living_room', label: 'Living Room' },
  { value: 'dining_room', label: 'Dining Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'study', label: 'Study' },
  { value: 'outdoor', label: 'Outdoor Space' },
]

const TIMELINE_OPTIONS = [
  { value: '1_2_months', label: '1-2 Months' },
  { value: '3_4_months', label: '3-4 Months' },
  { value: 'flexible', label: 'Flexible' },
]

const QUANTITY_OPTIONS = ['1', '2', '3', '4', '5+']

function SelectField({
  label, required, options, value, onChange,
}: {
  label: string
  required?: boolean
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-stone-700">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </Label>
      <select
        className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#b87d6b]/30 focus:border-[#b87d6b]"
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
      >
        <option value="">Please Select</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

export default function NewProjectForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    interest: '', quantity: '', width: '', height: '',
    finish: '', environment: '', timeline: '',
    street: '', city: '', state: '', zip: '',
    context: '', inquiryNature: '', source: '',
  })

  function set(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }))
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#b87d6b]/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-6 h-6 text-[#b87d6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl text-stone-800">Project Submitted</h1>
        <p className="text-stone-500 text-sm leading-relaxed">
          Your custom quote is being thoughtfully prepared and will arrive via email within 24-48 hours.
          Please check your spam folder if it doesn&apos;t appear in your primary inbox.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 rounded-full border border-stone-200 px-5 py-2 text-sm text-stone-500 hover:bg-stone-50 transition-colors"
        >
          Submit another
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl text-stone-800">Start a New Project</h1>
        <p className="text-stone-400 text-sm mt-1">
          Share your vision and we&apos;ll have a custom quote ready within 24-48 hours.
        </p>
      </div>

      <form
        className="space-y-8"
        onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
      >
        <section className="rounded-xl border border-stone-200 bg-white p-6 space-y-5">
          <p className="text-xs uppercase tracking-widest text-stone-400">Project Details</p>

          <SelectField
            label="What are you interested in?"
            required
            options={PRODUCT_OPTIONS}
            value={form.interest}
            onChange={v => set('interest', v)}
          />

          <SelectField
            label="Envisioned quantity"
            required
            options={QUANTITY_OPTIONS.map(q => ({ value: q, label: q }))}
            value={form.quantity}
            onChange={v => set('quantity', v)}
          />

          <div className="space-y-1.5">
            <Label className="text-stone-700">
              Project Location<span className="text-red-400 ml-0.5">*</span>
            </Label>
            <Input placeholder="Street Address" className="mb-2" value={form.street} onChange={e => set('street', e.target.value)} />
            <div className="grid grid-cols-3 gap-2">
              <Input placeholder="City" value={form.city} onChange={e => set('city', e.target.value)} />
              <Input placeholder="State" value={form.state} onChange={e => set('state', e.target.value)} />
              <Input placeholder="Zip Code" value={form.zip} onChange={e => set('zip', e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-stone-700">
                Width (inches)<span className="text-red-400 ml-0.5">*</span>
              </Label>
              <Input
                placeholder="e.g. 42"
                value={form.width}
                onChange={e => set('width', e.target.value)}
                required
              />
              <p className="text-xs text-stone-400">If not applicable, type N/A</p>
            </div>
            <div className="space-y-1.5">
              <Label className="text-stone-700">
                Height (inches)<span className="text-red-400 ml-0.5">*</span>
              </Label>
              <Input
                placeholder="e.g. 36"
                value={form.height}
                onChange={e => set('height', e.target.value)}
                required
              />
              <p className="text-xs text-stone-400">If not applicable, type N/A</p>
            </div>
          </div>

          <SelectField
            label="Specified finish"
            required
            options={FINISH_OPTIONS}
            value={form.finish}
            onChange={v => set('finish', v)}
          />

          <SelectField
            label="Environment / Setting"
            options={ENVIRONMENT_OPTIONS}
            value={form.environment}
            onChange={v => set('environment', v)}
          />

          <SelectField
            label="Anticipated timeline"
            required
            options={TIMELINE_OPTIONS}
            value={form.timeline}
            onChange={v => set('timeline', v)}
          />

          <div className="space-y-1.5">
            <Label className="text-stone-700">Site photos</Label>
            <div className="rounded-lg border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
              <p className="text-sm text-stone-400">Drag and drop files here, or click to browse</p>
              <p className="text-xs text-stone-300 mt-1">A photo helps us visualize the space and provide better recommendations.</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-stone-700">Additional creative context</Label>
            <Textarea
              placeholder="Share your vision, inspiration, or any specific details about what you're looking for..."
              className="min-h-[100px]"
              value={form.context}
              onChange={e => set('context', e.target.value)}
            />
          </div>
        </section>

        <section className="rounded-xl border border-stone-200 bg-white p-6 space-y-5">
          <p className="text-xs uppercase tracking-widest text-stone-400">Inquiry Nature</p>
          <SelectField
            label="How are you connected to the collection?"
            required
            options={[
              { value: 'established', label: 'Established Claire Crowe Collection Trade Member' },
              { value: 'prospective', label: 'Interested in Becoming a Trade Member' },
              { value: 'enthusiast', label: 'A Design Enthusiast' },
            ]}
            value={form.inquiryNature}
            onChange={v => set('inquiryNature', v)}
          />
        </section>

        <section className="rounded-xl border border-stone-200 bg-white p-6 space-y-5">
          <p className="text-xs uppercase tracking-widest text-stone-400">Additional Information</p>
          <SelectField
            label="How did you discover the collection?"
            required
            options={[
              { value: 'google', label: 'Google Search' },
              { value: 'instagram', label: 'Instagram' },
              { value: 'facebook', label: 'Facebook' },
              { value: 'pinterest', label: 'Pinterest' },
              { value: 'showroom', label: 'Showroom' },
              { value: 'showhouse', label: 'Showhouse' },
              { value: '1stdibs', label: '1stDibs' },
            ]}
            value={form.source}
            onChange={v => set('source', v)}
          />
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-[#b87d6b] px-8 py-3 text-white text-sm font-medium hover:bg-[#a56d5c] transition-colors"
          >
            Submit Project Request
          </button>
        </div>
      </form>
    </div>
  )
}
