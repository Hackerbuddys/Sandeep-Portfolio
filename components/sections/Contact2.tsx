"use client";

import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Contact2() {
	const formRef = useRef<HTMLFormElement | null>(null);

	const sendEmail = (e: any) => {
		e.preventDefault();

		// 1️⃣ SEND EMAIL TO YOU (Admin Email)
		emailjs.sendForm(
			process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
			process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // your admin template
			formRef.current!,
			process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
		);

		// 2️⃣ SEND AUTO-REPLY TO THE USER
		emailjs.send(
			process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
			process.env.NEXT_PUBLIC_EMAILJS_CLIENT_TEMPLATE_ID!, // auto-reply template
			{
				name: e.target.name.value,
				email: e.target.email.value,
				phone: e.target.phone.value,
				subject: e.target.subject.value,
				message: e.target.message.value,
			},
			process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
		);

		e.target.reset();
		alert("Message sent successfully!");
	};

	return (
		<section id="contact" className="section-contact-2 position-relative pb-60 overflow-hidden">
			<div className="container position-relative z-1">
				<div className="row align-items-center">
					<div className="col-lg-7 pb-5 pb-lg-0">
						<div className="position-relative">
							<div className="position-relative z-2">

								<h3 className="text-primary-2 mb-3">Let’s connect</h3>

								{/* ⭐ FORM Updated with ref + sendEmail */}
								<form ref={formRef} onSubmit={sendEmail}>
									<div className="row g-3">

										<div className="col-md-6">
											<input type="text" className="form-control bg-3 border border-1 rounded-3" name="name" placeholder="Your name" required />
										</div>

										<div className="col-md-6">
											<input type="text" className="form-control bg-3 border border-1 rounded-3" name="phone" placeholder="Phone" required />
										</div>

										<div className="col-md-6">
											<input type="email" className="form-control bg-3 border border-1 rounded-3" name="email" placeholder="Email" required />
										</div>

										<div className="col-md-6">
											<input type="text" className="form-control bg-3 border border-1 rounded-3" name="subject" placeholder="Subject" required />
										</div>

										<div className="col-12">
											<textarea className="form-control bg-3 border border-1 rounded-3" name="message" placeholder="Message" rows={4} required />
										</div>

										<div className="col-12">
											<button type="submit" className="btn btn-primary-2 rounded-2">
												Send Message
												<i className="ri-arrow-right-up-line" />
											</button>
										</div>

									</div>
								</form>

							</div>

							<div className="z-0 bg-primary-dark rectangle-bg z-1 rounded-3" />

						</div>
					</div>

					{/* Right section (same as your original) */}
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
