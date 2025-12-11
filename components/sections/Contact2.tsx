"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact2() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [msg, setMsg] = useState<string>("");

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || status === "sending") return;

    setStatus("sending");
    setMsg("");

    const form = formRef.current;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value || "";
    const subject = (form.elements.namedItem("subject") as HTMLInputElement)?.value || "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";

    // Prepare promises
    const adminPromise = emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // admin template — make sure To Email is set to your inbox in EmailJS
      form,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    const clientPromise = emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_CLIENT_TEMPLATE_ID!, // client auto-reply template — To Email = {{email}}
      {
        from_name: name,
        from_email: email,
        phone,
        subject,
        message,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    try {
      // Run both requests in parallel and inspect results
      const results = await Promise.allSettled([adminPromise, clientPromise]);

      const adminResult = results[0];
      const clientResult = results[1];

      // Check statuses
      const adminFulfilled = adminResult.status === "fulfilled";
      const clientFulfilled = clientResult.status === "fulfilled";

      // If admin failed but client succeeded → success for user (but log admin error)
      if (adminFulfilled || clientFulfilled) {
        setStatus("success");
        setMsg("Message sent — I will get back to you soon.");
        form.reset();

        // Auto-hide success after 4s
        setTimeout(() => {
          setStatus("idle");
          setMsg("");
        }, 4000);

        // If any rejected, log details for debugging
        if (!adminFulfilled) {
          // admin failed — log reason
          // eslint-disable-next-line no-console
          console.warn("Admin email failed:", adminResult);
        }
        if (!clientFulfilled) {
          // client failed — log reason
          // eslint-disable-next-line no-console
          console.warn("Client auto-reply failed:", clientResult);
        }

        // Optionally: if admin failed with 422 (recipient missing), try fallback send using explicit params
        if (!adminFulfilled && adminResult.status === "rejected") {
          const err: any = adminResult.reason;
          if (err?.status === 422) {
            console.warn("Admin send returned 422 - recipient missing. Attempting fallback send with explicit params.");
            try {
              // fallback using emailjs.send and explicit variables (requires template that accepts these fields)
              await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // same template if it accepts params in body
                {
                  to_email: "sandeepkumargupta254@gmail.com",
                  from_name: name,
                  from_email: email,
                  phone,
                  subject,
                  message,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
              );
              // fallback succeeded
              console.info("Fallback admin send succeeded.");
            } catch (fallbackErr) {
              console.error("Fallback admin send failed:", fallbackErr);
            }
          }
        }

        return;
      }

      // If both rejected -> treat as error
      // show friendly message but keep detailed logs in console
      // eslint-disable-next-line no-console
      console.error("Both EmailJS requests failed:", { adminResult, clientResult });
      setStatus("error");
      setMsg("Something went wrong. Please try again later.");

      setTimeout(() => {
        setStatus("idle");
        setMsg("");
      }, 6000);
    } catch (error) {
      // unexpected error while handling promises
      // eslint-disable-next-line no-console
      console.error("Unexpected EmailJS error:", error);
      setStatus("error");
      setMsg("Something went wrong. Please try again later.");

      setTimeout(() => {
        setStatus("idle");
        setMsg("");
      }, 6000);
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

                <form ref={formRef} onSubmit={sendEmail}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input type="text" name="name" className="form-control bg-3 border border-1 rounded-3" placeholder="Your name" required />
                    </div>

                    <div className="col-md-6">
                      <input type="text" name="phone" className="form-control bg-3 border border-1 rounded-3" placeholder="Phone" />
                    </div>

                    <div className="col-md-6">
                      <input type="email" name="email" className="form-control bg-3 border border-1 rounded-3" placeholder="Email" required />
                    </div>

                    <div className="col-md-6">
                      <input type="text" name="subject" className="form-control bg-3 border border-1 rounded-3" placeholder="Subject" />
                    </div>

                    <div className="col-12">
                      <textarea name="message" className="form-control bg-3 border border-1 rounded-3" placeholder="Message" rows={4} required />
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-primary-2 rounded-2" disabled={status === "sending"}>
                        {status === "sending" ? "Sending..." : "Send Message"}
                        <i className="ri-arrow-right-up-line" />
                      </button>
                    </div>

                    {/* status message */}
                    {status === "success" && (
                      <div className="col-12 mt-2 text-success text-secondary-2">{msg}</div>
                    )}
                    {status === "error" && (
                      <div className="col-12 mt-2 text-danger text-secondary-2">{msg}</div>
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
                <h6 className="mb-0">sandeepkumargupta254@gmail.com</h6>
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
                <h6 className="mb-0">GTB Nagar Metro Station Gate No.3, Delhi - 110009</h6>
              </div>
              <a href="#" className="position-absolute top-0 start-0 w-100 h-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
