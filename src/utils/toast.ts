export function showToast(
  message: string,
  type: "success" | "error" = "success"
) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const alert = document.createElement("div");
  alert.className = `alert ${
    type === "success" ? "alert-success" : "alert-error"
  } flex items-center gap-2`;
  alert.innerHTML =
    type === "success"
      ? `<span>✅ ${message}</span>`
      : `<span>❌ ${message}</span>`;

  container.appendChild(alert);

  // Auto remove after 3s
  setTimeout(() => {
    alert.remove();
  }, 3000);
}
