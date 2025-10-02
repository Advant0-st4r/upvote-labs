import Clerk from "@clerk/clerk-js";

const clerk = Clerk({ apiKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY });

export async function getUser() {
  try {
    return await clerk.loadUser();
  } catch (err) {
    console.error("Clerk fetch user error:", err);
    return null;
  }
}
