import { siteConfig } from "../data/siteConfig"

export const API_BASE_URL = "/api/v1"
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

export async function fetchPaymentCatalog(path) {
  const response = await fetch(`${API_BASE_URL}/${path}`)
  const json = await response.json()

  if (!response.ok || !json.success) {
    throw new Error(json.message || `Failed to load payment catalog (HTTP ${response.status})`)
  }

  return json.data
}

async function postJson(path, payload, failureMessage) {
  const response = await fetch(`${API_BASE_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const json = await response.json()

  if (!response.ok || !json.success) {
    throw new Error(json.message || `${failureMessage} (HTTP ${response.status})`)
  }

  return json.data
}

export function createRazorpayOrder(path, payload) {
  return postJson(path, payload, "Order creation failed")
}

export function verifyRazorpayPayment(path, checkoutResponse) {
  return postJson(
    path,
    {
      razorpay_order_id: checkoutResponse.razorpay_order_id,
      razorpay_payment_id: checkoutResponse.razorpay_payment_id,
      razorpay_signature: checkoutResponse.razorpay_signature,
    },
    "Payment verification failed",
  )
}

export function openRazorpayCheckout({ order, amountRupees, name, description, prefill, keyId, onSuccess, onFailure }) {
  const checkout = new window.Razorpay({
    key: keyId || order.keyId || siteConfig.razorpayKeyId,
    amount: order.amountPaise ?? amountRupees * 100,
    currency: order.currency ?? "INR",
    order_id: order.orderId,
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
