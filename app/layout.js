export const metadata = {
  title: 'Client server static dynamic rendering tests',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
