import { JSXNode } from "hono/jsx"

interface PageLayoutProps {
  children: JSXNode | JSXNode[] | Promise<string> | string
}

export function PageLayout({ children }: PageLayoutProps) {
  return (<html>
    <head>
      <meta lang='en' />
      <title>Contact.app</title>
      <script src="https://unpkg.com/htmx.org@2.0.1" integrity="sha384-QWGpdj554B4ETpJJC9z+ZHJcA/i59TyjxEPXiiUgN2WmTyV5OEZWCD6gQhgkdpB/" crossorigin="anonymous"></script>
    </head>
    <body style={{ margin: 0, padding: 0, minHeight: "100vh", display: "grid", gridTemplateRows: "60px 1fr 120px" }}>
      <header style={{ background: "lightgray" }}>Contacts.app</header>
      <main style={{ padding: "32px" }}>
        {children}
      </main>
      <footer style={{ background: "lightgray" }}>This is the footer</footer>
    </body>
  </html>
  )
}
