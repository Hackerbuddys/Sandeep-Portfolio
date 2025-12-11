'use client'
import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"

export default function Contact2() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [status, setStatus] = useState<null | "idle" | "sending" | "success" | "error">(null)
  const [msg, setMsg] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setStatus("sending")
    setMsg("")

    try {
      const res = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      // success
      setStatus("success")
      setMsg("Message sent - I will get back to you soon.")
      formRef.current.reset()
    } catch (error) {
      console.error("EmailJS error:", error)
      setStatus("error")
      setMsg("Something went wrong. Please try again later.")
    }
  }

  return (
    <section id="contact" className="section-contact-2 position-relative pb-60 overflow-hidden">
      <div className="container position-relative z-1">
        <div className="row align-items-center">
          <div className="col-lg-7 pb-5 pb-lg-0">
            <div className="position-relative">
              <div className="position-relative z-2">
                <h3 className="text-primary-2 mb-3">Let’s connect</h3>

                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6 ">
                      <input name="from_name" type="text" className="form-control bg-3 border border-1 rounded-3" id="name" placeholder="Your name" required />
                    </div>

                    <div className="col-md-6">
                      <input name="phone" type="tel" className="form-control bg-3 border border-1 rounded-3" id="phone" placeholder="Phone" />
                    </div>

                    <div className="col-md-6">
                      <input name="from_email" type="email" className="form-control bg-3 border border-1 rounded-3" id="email" placeholder="Email" required />
                    </div>

                    <div className="col-md-6">
                      <input name="subject" type="text" className="form-control bg-3 border border-1 rounded-3" id="subject" placeholder="Subject" />
                    </div>

                    <div className="col-12">
                      <textarea name="message" className="form-control bg-3 border border-1 rounded-3" id="message" placeholder="Message" required />
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
          {/* Right column unchanged - keep your contact info blocks */}
	                    <div className="col-lg-5 d-flex flex-column ps-lg-8">
							<div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
								<div className="d-inline-block">
									<div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
										<i className="ri-phone-fill text-primary-2 fs-26" />
									</div>
								</div>
								<div className="ps-3 h-100">
									<span className="text-400 fs-6">Phone Number</span>
									<h6 className="mb-0">+91-750-648-3883</h6>
								</div>
								<a href="tel:+91-750-648-3883" className="position-absolute top-0 start-0 w-100 h-100" />
							</div>
							<div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
								<div className="d-inline-block">
									<div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
										<i className="ri-mail-fill text-primary-2 fs-26" />
									</div>
								</div>
								<div className="ps-3 h-100">
									<span className="text-400 fs-6">Email</span>
									<h6 className="mb-0">sandeepkumargupta254@gmail.com</h6>
								</div>
								<a href="mailto:sandeepkumargupta254@gmail.com" className="position-absolute top-0 start-0 w-100 h-100" />
							</div>
							<div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
								<div className="d-inline-block">
									<div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
										<i className="ri-linkedin-fill text-primary-2 fs-26" />
									</div>
								</div>
								<div className="ps-3 h-100">
									<span className="text-400 fs-6">LinkedIn</span>
									<h6 className="mb-0">Sandeep Kumar Gupta</h6>
								</div>
								<a href="https://www.linkedin.com/in/sandeep-kumar-gupta-8679b8230/" className="position-absolute top-0 start-0 w-100 h-100" />
							</div>
							<div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
								<div className="d-inline-block">
									<div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
										<i className="ri-map-2-fill text-primary-2 fs-26" />
									</div>
								</div>
								<div className="ps-3 h-100">
									<span className="text-400 fs-6">Address</span>
									<h6 className="mb-0">GTB Nagar Metro Station Gate No.3, Delhi - 110009</h6>
								</div>
								<a href="https://maps.google.com/maps?q=1st+avenue,New+York" className="position-absolute top-0 start-0 w-100 h-100" />
							</div>
						</div>
        </div>
      </div>
    </section>
  )
}

