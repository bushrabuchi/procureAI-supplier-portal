export interface DemoUser {
  name: string;
  email: string;
  company: string;
}

const SESSION_KEY = "procureai_demo_session";

export function getDemoUser(): DemoUser | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    const user: unknown = JSON.parse(stored);

    if (
      typeof user === "object" &&
      user !== null &&
      "email" in user &&
      typeof user.email === "string" &&
      "name" in user &&
      typeof user.name === "string" &&
      "company" in user &&
      typeof user.company === "string"
    ) {
      return user as DemoUser;
    }
  } catch {
    return null;
  }

  return null;
}

export function saveDemoUser(user: DemoUser): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function logoutDemoUser(): void {
  localStorage.removeItem(SESSION_KEY);
}
