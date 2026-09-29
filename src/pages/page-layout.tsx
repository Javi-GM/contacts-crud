import { JSXNode } from "hono/jsx"

interface PageLayoutProps {
  children: JSXNode | JSXNode[] | Promise<string> | string
}

export function PageLayout({ children }: PageLayoutProps) {
  return (<html>
    <head>
      <meta lang='en' />
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Contact.app</title>
      <script src="https://cdn.tailwindcss.com" />
      <link href="/styles/index.css" rel="stylesheet" />
      <script src="/js/htmx.js" defer />
    </head>
    <body hx-boost="true" class="min-h-screen bg-slate-50">
      <div class="w-5/12 m-auto pt-8 min-w-[600px]">
        <header class="flex items-center justify-between border-b-2 border-b-slate-600 py-6">
          <h1 class="text-xl font-semibold">Contacts.app</h1>
        </header>
        <div class="h-14" />
        <main>
          {children}
        </main>
      </div>
    </body>
  </html >
  )
}
