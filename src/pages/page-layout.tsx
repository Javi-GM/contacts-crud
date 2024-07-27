import { JSXNode } from "hono/jsx"
import { GithubIcon } from "../components/github-icon"

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
      <script
        src="https://unpkg.com/htmx.org@2.0.1"
        integrity="sha384-QWGpdj554B4ETpJJC9z+ZHJcA/i59TyjxEPXiiUgN2WmTyV5OEZWCD6gQhgkdpB/"
        crossorigin="anonymous"
        defer
      />
      <script src="https://cdn.tailwindcss.com" />
      <link href="/styles/index.css" rel="stylesheet" />
    </head>
    <body class="min-h-screen bg-slate-50">
      <div class="w-5/12 m-auto pt-8">
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
