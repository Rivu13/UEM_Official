import { siteConfig } from "../data/siteConfig"

const CHECKOUT_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js"

let scriptLoadPromise = null

export function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve()
  if (scriptLoadPromise) return scriptLoadPromise

  scriptLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = CHECKOUT_SCRIPT_SRC
    script.onload = () => resolve()
    script.onerror = () => {
      scriptLoadPromise = null
      reject(new Error("Could not load the Razorpay checkout script."))
    }
    document.body.appendChild(script)
  })

  return scriptLoadPromise
}

export async function fetchPaymentCatalog(endpoint) {
  const response = await fetch(endpoint)
  const json = await response.json()

  if (!response.ok || !json.success) {
    throw new Error(json.message || `Failed to load payment catalog (HTTP ${response.status})`)
  }

  return json.data
}

export async function createRazorpayOrder(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const json = await response.json()

  if (!response.ok || !json.success) {
    throw new Error(json.message || `Order creation failed (HTTP ${response.status})`)
  }

  return json.data
}

export function openRazorpayCheckout({ order, amountRupees, name, description, prefill, keyId, onSuccess, onFailure }) {
  const checkout = new window.Razorpay({
    key: keyId || siteConfig.razorpayKeyId,
    amount: order.amount ?? amountRupees * 100,
    currency: order.currency ?? "INR",
    order_id: order.order_id ?? order.id,
    name,
    description,
    prefill,
    theme: { color: "#14205a" },
    handler: (response) => onSuccess(response),
    modal: {
      ondismiss: () => onFailure(new Error("Payment was cancelled before completion.")),
    },
  })

  checkout.on("payment.failed", (response) => onFailure(new Error(response.error?.description || "Payment failed.")))
  checkout.open()
}
