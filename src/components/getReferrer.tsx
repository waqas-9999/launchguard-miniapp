export function getReferralFromURL(): string | null {
  if (typeof window === "undefined") return null;

  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get("ref");

  if (ref && /^0x[a-fA-F0-9]{40}$/.test(ref)) {
    localStorage.setItem("referrer", ref);
    return ref;
  }

  return null;
}
