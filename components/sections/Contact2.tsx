"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact2() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [msg, setMsg] = useState<string>("");

  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const ADMIN_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const CLIENT_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CLIENT_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const showError = (text: string) => {
    setStatus("error");
    setMsg(text);
    setTimeout(() => {
      setStatus("idle");
      setMsg("");
    }, 6000);
  };

  const showSuccess = (text: string) => {
    setStatus("success");
    setMsg(text);
    setTimeout(() => {
      setStatus("idle");
      setMsg("");
    }, 4000);
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    if (status === "sending") return;

    // Quick env check
    if (!SERVICE_ID || !PUBLIC_KEY || (!ADMIN_TEMPLATE_ID && !CLIENT_TEMPLATE_ID)) {
      console.error("Missing EmailJS environment variables.", {
        SERVICE_ID,
        ADMIN_TEMPLATE_ID,
        CLIENT_TEMPLATE_ID,
        PUBLIC_KEY,
      });
      showError("Email service is not configured. Please contact the site owner.");
      return;
    }

    const form = formRef.current;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value?.trim() || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value?.trim() || "";
    const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value?.trim() || "";
    const subject = (form.elements.namedItem("subject") as HTMLInputElement)?.value?.trim() || "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value?.trim() || "";

    // Basic validation
    if (!name) {
      showError("Please enter your name.");
      return;
    }
    if (!email || !isValidEmail(email)) {
      showError("Please enter a valid email address.");
      return;
    }
    if (!message) {
      showError("Please enter a message.");
      return;
    }

    setStatus("sending");
    setMsg("");

    // Build promises safely (only create each promise if its template id exists)
    const promises: Promise<any>[] = [];

    // Admin send: recommended to keep ADMIN_TEMPLATE_ID configured so To Email is a real address in EmailJS dashboard
    if (ADMIN_TEMPLATE_ID) {
      try {
        // sendForm uses the form values directly (recommended for admin notification templates)
        promises.push(
          emailjs.sendForm(SERVICE_ID, ADMIN_TEMPLATE_ID, form, PUBLIC_KEY)
        );
      } catch (err) {
        // Should not normally throw here, but catch to avoid crash
        console.error("prepare admin send error:", err);
      }
    }

    // Client auto-reply: send only if CLIENT_TEMPLATE_ID exists
    if (CLIENT_TEMPLATE_ID) {
      try {
        promises.push(
          emailjs.send(SERVICE_ID, CLIENT_TEMPLATE_ID, {
            from_name: name,
            from_email: email,
            phone,
            subject,
            message,
          }, PUBLIC_KEY)
        );
      } catch (err) {
        console.error("prepare client send error:", err);
      }
    }

    if (promises.length === 0) {
      showError("Email templates are not configured. Please contact the site owner.");
      return;
    }

    try {
      const results = await Promise.allSettled(promises);

      // Determine if any succeeded
      const anyFulfilled = results.some(r => r.status === "fulfilled");
      const anyRejected = results.some(r => r.status === "rejected");

      // Log rejections for debugging
      results.forEach((r, idx) => {
        if (r.status === "rejected") {
          console.warn(`EmailJS promise[${idx}] rejected:`, r.reason);
        }
      });

      if (anyFulfilled) {
        // Success for the user if at least one email was sent
        form.reset();
        showSuccess("Message sent — I will get back to you soon.");
        return;
      }

      // If here, all failed
      console.error("All Email requests failed:", results);
      showError("Something went wrong. Please try again later.");
    } catch (err) {
      console.error("Unexpected error sending emails:", err);
      showError("Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="contact" className="section-contact-2 position-relative pb-60 overflow-hidden">
      <div className="container position-relative z-1">
        <div className="row align-items-center">
          <div className="col-lg-7 pb-5 pb-lg-0">
            <div className="position-relative">
              <div className="position-relative z-2">
                <h3 className="text-primary-2 mb-3">Let’s connect</h3>

                <form ref={formRef} onSubmit={sendEmail} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        className="form-control bg-3 border border-1 rounded-3"
                        placeholder="Your name"
                        required
                        aria-label="Your name"
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        name="phone"
                        className="form-control bg-3 border border-1 rounded-3"
                        placeholder="Phone"
                        aria-label="Phone"
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="email"
                        name="email"
                        className="form-control bg-3 border border-1 rounded-3"
                        placeholder="Email"
                        required
                        aria-label="Email"
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        name="subject"
                        className="form-control bg-3 border border-1 rounded-3"
                        placeholder="Subject"
                        aria-label="Subject"
                      />
                    </div>

                    <div className="col-12">
                      <textarea
                        name="message"
                        className="form-control bg-3 border border-1 rounded-3"
                        placeholder="Message"
                        rows={4}
                        required
                        aria-label="Message"
                      />
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary-2 rounded-2"
                        disabled={status === "sending"}
                        aria-busy={status === "sending"}
                      >
                        {status === "sending" ? "Sending..." : "Send Message"}
                        <i className="ri-arrow-right-up-line" style={{ marginLeft: 8 }} />
                      </button>
                    </div>

                    {/* status message (uses your color utilities) */}
                    {status === "success" && (
                      <div className="col-12 mt-2">
                        <div className="p-2 rounded-2 text-white" style={{ background: "#1f8a3b" }}>
                          {msg}
                        </div>
                      </div>
                    )}
                    {status === "error" && (
                      <div className="col-12 mt-2">
                        <div className="p-2 rounded-2 text-white" style={{ background: "#c53030" }}>
                          {msg}
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>

              <div className="z-0 bg-primary-dark rectangle-bg z-1 rounded-3" />
            </div>
          </div>

          {/* Right section unchanged */}
          <div className="col-lg-5 d-flex flex-column ps-lg-8">
            <div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
              <div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
                <i className="ri-phone-fill text-primary-2 fs-26" />
              </div>
              <div className="ps-3">
                <span className="text-400 fs-6">Phone Number</span>
                <h6 className="mb-0">+91-750-648-3883</h6>
              </div>
              <a href="tel:+917506483883" className="position-absolute top-0 start-0 w-100 h-100" />
            </div>

            <div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
              <div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
                <i className="ri-mail-fill text-primary-2 fs-26" />
              </div>
              <div className="ps-3">
                <span className="text-400 fs-6">Email</span>
                <h6 className="mb-0">Sandeep Gupta</h6>
              </div>
              <a href="mailto:sandeepkumargupta254@gmail.com" className="position-absolute top-0 start-0 w-100 h-100" />
            </div>

            <div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
              <div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
                <i className="ri-linkedin-fill text-primary-2 fs-26" />
              </div>
              <div className="ps-3">
                <span className="text-400 fs-6">LinkedIn</span>
                <h6 className="mb-0">Sandeep Kumar Gupta</h6>
              </div>
              <a href="https://www.linkedin.com/in/sandeep-kumar-gupta-8679b8230/" className="position-absolute top-0 start-0 w-100 h-100" />
            </div>

            <div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
              <div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
                <i className="ri-map-2-fill text-primary-2 fs-26" />
              </div>
              <div className="ps-3">
                <span className="text-400 fs-6">Address</span>
                <h6 className="mb-0">GTB Nagar, DL-110009</h6>
              </div>
              <a href="#" className="position-absolute top-0 start-0 w-100 h-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
