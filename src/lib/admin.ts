export const ADMIN_EMAILS = [
  "ringoosamsungj710@gmail.com",
  "petrotyma36@gmail.com",
  "mashechka.luchkiv@gmail.com",
];

export function isAdmin(email: string | null | undefined): boolean {
  return !!email && ADMIN_EMAILS.includes(email);
}
