import Link from 'next/link'


export default function Experience2() {
	return (
		<>

			<section id="expericence" className="section-experience pt-5">
				<div className="container">
					<div className="rounded-3 border border-1 position-relative overflow-hidden">
						<div className="box-linear-animation position-relative z-1">
							<div className="p-lg-8 p-md-6 p-3 position-relative z-1">
								<div className="d-flex align-items-center">
									<svg className="text-primary-2 me-2" xmlns="http://www.w3.org/2000/svg" width={5} height={6} viewBox="0 0 5 6" fill="none">
										<circle cx="2.5" cy={3} r="2.5" fill="#A8FF53" />
									</svg>
									<span className="text-linear-4 d-flex align-items-center"> Expericence </span>
								</div>
								<h3>
									+4 years of
									<span className="text-300"> expertise in </span>
									full-stack 
									<span className="text-300">
										 <br />
										development & IT engineering
									</span>
								</h3>
								<div className="row mt-5">
									<div className="col-lg-4">
										<div className="d-flex flex-column gap-2">
											<Link href="#" className="technology border border-1 rounded-3 p-3">
												<div className="d-flex align-items-center gap-2">
													<img src="assets/imgs/home-page-2/experience/dbtpl.png" alt="sandeep-portfolio" />
													<div className="d-flex flex-column ms-2">
														<h5 className="mb-1">DB-Tech</h5>
														<span className="text-300">2024 - 2025</span>
													</div>
												</div>
											</Link>
											<Link href="#" className="technology border border-1 rounded-3 p-3">
												<div className="d-flex align-items-center gap-2">
													<img src="assets/imgs/home-page-2/experience/MeCard.png" alt="sandeep-portfolio" />
													<div className="d-flex flex-column ms-2">
														<h5 className="mb-1">MeCard</h5>
														<span className="text-300">2023 - 2024</span>
													</div>
												</div>
											</Link>
											<Link href="#" className="technology border border-1 rounded-3 p-3">
												<div className="d-flex align-items-center gap-2">
													<img src="assets/imgs/home-page-2/experience/whistlesentinel.png" alt="sandeep-portfolio" />
													<div className="d-flex flex-column ms-2">
														<h5 className="mb-1">Whistlesentinel</h5>
														<span className="text-300">2023 - 2023</span>
													</div>
												</div>
											</Link>
											<Link href="#" className="technology border border-1 rounded-3 p-3">
												<div className="d-flex align-items-center gap-2">
													<img src="assets/imgs/home-page-2/experience/deepija.png" alt="sandeep-portfolio" />
													<div className="d-flex flex-column ms-2">
														<h5 className="mb-1">Deepija</h5>
														<span className="text-300">2022 - 2023</span>
													</div>
												</div>
											</Link>
										</div>
									</div>
									<div className="col-lg-8 ps-lg-5 mt-5 mt-lg-0">
										<h6 className="text-linear-4">Full-Stack Developer | IT Support | Social Media Designer</h6>
										<ul className="mt-4">
											<li className="text-dark mb-3">Full-stack developer with hands-on experience in <span className="text-secondary-2">React, Next.js, Node.js, TypeScript, API development, and WordPress website development,</span> delivering scalable and modern web solutions.</li>
											<li className="text-dark mb-3">Strong technical foundation in Linux systems, troubleshooting, <span className="text-secondary-2">server handling, and IT support,</span> ensuring smooth performance and reliable operations across platforms.</li>
											<li className="text-dark mb-3">Skilled in creative content design using Canva and AI tools, producing high-quality visuals, marketing content, and social media assets for brands.</li>
										</ul>
										<div className="d-flex flex-wrap align-items-center gap-3 mt-7">
											<Link href="#" className="text-300 border border-1 px-3 py-1">ReactJS</Link>
											<Link href="#" className="text-300 border border-1 px-3 py-1">Next.js</Link>
											<Link href="#" className="text-300 border border-1 px-3 py-1">Node.js</Link>
											<Link href="#" className="text-300 border border-1 px-3 py-1">JavaScript</Link>
											<Link href="#" className="text-300 border border-1 px-3 py-1">WordPress</Link>
											<Link href="#" className="text-300 border border-1 px-3 py-1">Bootstrap</Link>
											<Link href="#" className="text-300 border border-1 px-3 py-1">SQL (MySQL / PostgreSQL)</Link>
											<Link href="#" className="text-300 border border-1 px-3 py-1">Linux (Ubuntu / CentOS)</Link>
											<Link href="#" className="text-300 border border-1 px-3 py-1">Troubleshooting</Link>
											<Link href="#" className="text-300 border border-1 px-3 py-1">VMware</Link>
											<Link href="#" className="text-300 border border-1 px-3 py-1">Networking</Link>
											<Link href="#" className="text-300 border border-1 px-3 py-1">Graphic design</Link>
										</div>
									</div>
								</div>
							</div>
							<img className="position-absolute top-0 start-0 z-0" src="assets/imgs/home-page-2/services/bg.png" alt="sandeep-portfolio" />
						</div>
					</div>
				</div>
			</section>

		</>
	)
}
