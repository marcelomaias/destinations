'use client'
import { Form, ContactFormBlockType } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useState } from 'react'

// Shadcn UI Imports
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

type FormState = {
  loading: boolean
  error: string | null
  success: boolean
}

type InputFormField = Extract<
  NonNullable<Form['fields']>[number],
  {
    blockType:
      | 'text'
      | 'email'
      | 'textarea'
      | 'number'
      | 'checkbox'
      | 'select'
      | 'country'
      | 'state'
    name: string
    label?: string | null
    required?: boolean | null
  }
>

export const ContactFormBlock: React.FC<ContactFormBlockType> = ({ form, heading }) => {
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: null,
    success: false,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form || typeof form !== 'object') return

    setFormState({ loading: true, error: null, success: false })

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        body: JSON.stringify({
          form: form.id,
          submissionData: Object.entries(data)?.map(([field, value]) => ({
            field,
            value: value as string,
          })),
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) throw new Error('Failed to submit form')

      setFormState({ loading: false, error: null, success: true })
      ;(e.target as HTMLFormElement).reset()

      setTimeout(() => {
        setFormState({ loading: false, error: null, success: false })
      }, 5000)
    } catch (error) {
      setFormState({ loading: false, error: 'Failed to submit form', success: false })
    }
  }

  return (
    <>
      {typeof form === 'object' && form?.title === 'Contact' && (
        <section id="contact" className="my-4 lg:my-20">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 container px-4">
            <div className="flex-1 text-center">
              {heading && <RichText data={heading} />} <br />
              <Send size={128} className="mx-auto" />
            </div>
            <div className="flex-1">
              <form className="grid gap-4 md:pr-28" onSubmit={handleSubmit}>
                {form.fields?.map((field) => {
                  const inputField = field as InputFormField
                  if (!('name' in field)) return null

                  return (
                    <div key={inputField.name} className="grid gap-2">
                      {/* Optional: Uncomment if you want Shadcn Labels */}
                      {/* <Label htmlFor={inputField.name}>{inputField.label}</Label> */}

                      {inputField.blockType === 'textarea' ? (
                        <Textarea
                          id={inputField.name}
                          name={inputField.name}
                          required={inputField.required || false}
                          placeholder={inputField.label || ''}
                          rows={5}
                        />
                      ) : (
                        <Input
                          id={inputField.name}
                          type={inputField.blockType}
                          name={inputField.name}
                          required={inputField.required || false}
                          placeholder={inputField.label || ''}
                        />
                      )}
                    </div>
                  )
                })}

                {formState.error && (
                  <div className="px-4 py-2 h-[46px] flex items-center bg-red-800 text-red-300 rounded-md">
                    <p className="text-sm font-medium">There was an error.</p>
                  </div>
                )}

                {formState.success ? (
                  <div className="px-4 py-2 h-[46px] flex items-center bg-green-900 text-green-300 rounded-md">
                    <RichText data={form.confirmationMessage!} />
                  </div>
                ) : (
                  <div className="flex items-center gap-4 h-[46px]">
                    <Button type="submit" disabled={formState.loading}>
                      {form.submitButtonLabel || 'Submit'}
                    </Button>
                    {formState.loading && (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
