'use client'

import { useEffect, useState } from 'react'
import type { Form } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

export function RenderForm({ form }: { form: Form }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setError(null) // ✅ CLEAR OLD ERRORS

    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: form.id,
          submissionData: Object.entries(data).map(([field, value]) => ({
            field,
            value,
          })),
        }),
      })

      if (!res.ok) throw new Error()

      e.currentTarget.reset()
      setSuccess(true)
    } catch {
      setError('Failed to submit form')
    } finally {
      setLoading(false)
    }
  }

  // ✅ AUTO RESET SUCCESS AFTER 5s (optional but nice)
  useEffect(() => {
    if (!success) return
    const t = setTimeout(() => setSuccess(false), 5000)
    return () => clearTimeout(t)
  }, [success])

  if (success) {
    return (
      <div className="space-y-4">
        {form.confirmationMessage && <RichText data={form.confirmationMessage} />}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {form.fields?.map((field) => {
        if (!('name' in field)) return null

        return (
          <div key={field.id} className="space-y-1">
            {/* ✅ LABEL FOR ALL FIELDS */}
            {field.label && (
              <label htmlFor={field.name} className="block text-sm font-medium">
                {field.label}
                {field.required && ' *'}
              </label>
            )}

            {field.blockType === 'textarea' && (
              <textarea id={field.name} name={field.name} required={field.required ?? false} />
            )}

            {field.blockType === 'checkbox' && (
              <input
                id={field.name}
                type="checkbox"
                name={field.name}
                required={field.required ?? false}
              />
            )}

            {field.blockType === 'select' && (
              <select
                id={field.name}
                name={field.name}
                required={field.required ?? false}
                defaultValue=""
              >
                <option value="" disabled>
                  Select an option
                </option>

                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {['text', 'email', 'number'].includes(field.blockType) && (
              <input
                id={field.name}
                type={field.blockType}
                name={field.name}
                required={field.required ?? false}
              />
            )}
          </div>
        )
      })}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Sending…' : form.submitButtonLabel || 'Submit'}
      </button>
    </form>
  )
}
