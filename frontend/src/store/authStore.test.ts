import { describe, it, expect } from "vitest";
import { useAuthStore } from "./authStore";

describe("authStore", () => {
  it("sets auth state on login and clears it on logout", () => {
    useAuthStore.getState().setAuth("token-123", "admin", "ADMIN");

    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().token).toBe("token-123");
    expect(useAuthStore.getState().username).toBe("admin");
    expect(useAuthStore.getState().role).toBe("ADMIN");

    useAuthStore.getState().logout();

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().username).toBeNull();
    expect(useAuthStore.getState().role).toBeNull();
  });
});
