'use client'
import { Page, Form } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useState } from 'react'

// Shadcn UI Imports
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

type ContactProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'contactForm' }>

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

export function ContactFormBlock({ block }: { block: ContactProps }) {
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: null,
    success: false,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!block.form || typeof block.form !== 'object') return

    setFormState({ loading: true, error: null, success: false })

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        body: JSON.stringify({
          form: block.form.id,
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
      {typeof block?.form === 'object' && block?.form?.title === 'Contact' && (
        <section id="contact" className="contactSection py-12">
          <div className="container flex gap-8">
            <div className="flex-1">{block.heading && <RichText data={block.heading} />}</div>
            <div className="flex-1">
              <form className="grid gap-4" onSubmit={handleSubmit}>
                {block.form.fields?.map((field) => {
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
                  <p className="text-destructive text-sm font-medium">{formState.error}</p>
                )}

                {formState.success ? (
                  <div className="confirmationMessage p-4 bg-primary/10 rounded-md">
                    <RichText data={block.form.confirmationMessage!} />
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Button type="submit" disabled={formState.loading}>
                      {block.form.submitButtonLabel || 'Submit'}
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
