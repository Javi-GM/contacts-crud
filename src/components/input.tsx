interface InputProps extends Partial<HTMLInputElement> {
  label: string
  id: string
  name: string
  className?: string
  error?: string
}

export default function Input({ label, id, name, error, className = '', ...props }: InputProps) {
  return (
    <div class={`${className} flex flex-col gap-1`} >
      <label for={id} class="font-medium">{label}</label>
      <input id={id} name={name} {...props as any} class="border border-gray py-2 px-4 rounded-md" />
      {error && <p class="text-red-500 text-sm">{error}</p>}
    </div >
  )
}
