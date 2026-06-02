export function isPasswordValid(
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
) {
  if (!oldPassword || !newPassword || !confirmPassword) return false;
  if (newPassword.length < 6) return false;
  if (newPassword !== confirmPassword) return false;
  if (!/[A-Z]/.test(newPassword)) return false;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) return false;

  return true;
}