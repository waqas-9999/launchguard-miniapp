export function getReferralFromURL(): string | null {
  if (typeof window === "undefined") return null;

  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get("ref");

  if (ref && /^0x[a-fA-F0-9]{40}$/.test(ref)) {
    console.log("✅ Referrer detected from URL:", ref);
    localStorage.setItem("referrer", ref);
    console.log("LocalStorage referrer:", localStorage.getItem("referrer"));

    return ref;
  }
console.log("LocalStorage referrer:", localStorage.getItem("referrer"));

  console.log("❌ No valid referrer found in URL.");
  return null;
}
