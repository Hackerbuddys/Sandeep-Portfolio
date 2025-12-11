
export default function Footer2() {
	return (
		<>
			<footer>
				<div className="section-footer-2 position-relative">
					<div className="container position-relative z-1 border-top border-1 pb-2 pt-4">
						<div className="text-center">
							<a className="d-flex main-logo align-items-center justify-content-center mb-3">
								<img src="assets/imgs/home-page-2/template/favicon.svg" alt="sandeep-portfolio" />
								<span className="fs-4 ms-2">Sandeep Kumar Gupta</span>
							</a>
							<div className="d-flex justify-content-center gap-3">
								<a href="https://wa.me/917506483883">
									<i className="ri-whatsapp-fill fs-18" />
								</a>
								<a href="mailto:sandeepkumargupta254@gmail.com">
									<i className="ri-mail-fill fs-18" />
								</a>
								<a href="https://www.linkedin.com/in/sandeep-kumar-gupta-8679b8230/">
									<i className="ri-linkedin-fill fs-18" />
								</a>
								<a href="https://github.com/Hackerbuddys">
									<i className="ri-github-fill fs-18" />
								</a>
							</div>
							<div className="navigation d-flex align-items-center justify-content-center flex-wrap gap-4 my-4">
								<a href="#about" className="fs-6"> About me </a>
								<a href="#education" className="fs-6"> Education </a>
								<a href="#services" className="fs-6"> Services </a>
								<a href="#expericence" className="fs-6"> Expericence </a>
								<a href="#project" className="fs-6"> Project </a>
								<a href="#contact" className="fs-6"> Contact </a>
							</div>
						</div>
					</div>
				</div>
			</footer>

		</>
	)
}
