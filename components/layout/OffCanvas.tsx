import Link from 'next/link'

export default function OffCanvas({ isOffCanvas, handleOffCanvas }: any) {
	return (
		<>
			{/* offCanvas-menu */}
			<div className={`offCanvas__info ${isOffCanvas ? 'active' : ''}`}>
					<div className="offCanvas__close-icon menu-close" onClick={handleOffCanvas}>
						<button><i className="ri-close-line" /></button>
					</div>
					<div className="offCanvas__logo mb-5">
						<h3 className="mb-0">Get in touch</h3>
					</div>
					<div className="offCanvas__side-info mb-30">
						<div className="contact-list mb-30">
							<p className="fs-6 fw-medium text-200 mb-5">I'm always excited to take on new projects and collaborate with innovative minds.</p>
							<div className="mb-3">
								<span className="text-400 fs-5">Phone Number</span>
								<p className="mb-0">+91-750-648-3883</p>
							</div>
							<div className="mb-3">
								<span className="text-400 fs-5">Email</span>
								<p className="mb-0">sandeepkumargupta254@gmail.com</p>
							</div>
							<div className="mb-3">
								<span className="text-400 fs-5">YouTube</span>
								<p className="mb-0">@RealUnseenShadow</p>
							</div>
							<div className="mb-3">
								<span className="text-400 fs-5">Address</span>
								<p className="mb-0">GTB Nagar Metro Station Gate No.3, Delhi - 110009</p>
							</div>
						</div>
						<div className="contact-list">
							<p className="text-400 fs-5 mb-2">Social</p>
							<div className="https://wa.me/917506483883" target="_blank">
								<Link href="/http://facebook.com">
									<i className="ri-whatsapp-fill fs-18" />
								</Link>
								<Link href="mailto:sandeepkumargupta254@gmail.com" >
									<i className="ri-mail-fill fs-18" />
								</Link>
								<Link href="https://www.linkedin.com/in/sandeep-kumar-gupta-8679b8230/">
									<i className="ri-linkedin-fill fs-18" />
								</Link>
								<Link href="https://github.com/Hackerbuddys">
									<i className="ri-github-fill fs-18" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			<div className={`offCanvas__overly ${isOffCanvas ? 'active' : ''}`}  onClick={handleOffCanvas}/>
		</>
	)
}
