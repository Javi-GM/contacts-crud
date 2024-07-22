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
      <script
        src="https://unpkg.com/htmx.org@2.0.1"
        integrity="sha384-QWGpdj554B4ETpJJC9z+ZHJcA/i59TyjxEPXiiUgN2WmTyV5OEZWCD6gQhgkdpB/"
        crossorigin="anonymous"
        defer
      />
      <script src="https://cdn.tailwindcss.com" defer />
      <link href="/styles/index.css" rel="stylesheet" />
    </head>
    <body class="min-h-screen grid">
      <header class="bg-gray-100">Contacts.app</header>
      <main class="p-4">
        {children}
      </main>
      <footer class="bg-gray-100">This is the footer</footer>
    </body>
  </html>
  )
}
