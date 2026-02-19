import PageShell from "@/components/PageShell";

export default function ContactPage() {
    return (
        <PageShell>
            <div className="max-w-[540px]">
                <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-gray-900 leading-tight mb-2 sm:mb-3">
                    Contact
                </h1>
                <p className="text-[13px] sm:text-[15px] text-gray-400 mb-8 sm:mb-10">
                    Have a project in mind or just want to say hello? Reach out.
                </p>

                <div className="space-y-6">
                    {/* Contact links */}
                    <div className="grid gap-2.5 sm:gap-3">
                        {[
                            {
                                label: "Email",
                                value: "hello@saikarthik.com",
                                href: "mailto:hello@saikarthik.com",
                            },
                            {
                                label: "Twitter / X",
                                value: "@saikarthik",
                                href: "https://x.com/saikarthik",
                            },
                            {
                                label: "LinkedIn",
                                value: "linkedin.com/in/saikarthik",
                                href: "https://linkedin.com/in/saikarthik",
                            },
                            {
                                label: "Instagram",
                                value: "@saikarthik.writes",
                                href: "https://instagram.com/saikarthik.writes",
                            },
                        ].map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                data-cursor="pointer"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
                            >
                                <span className="text-[12px] sm:text-[13px] text-gray-400">
                                    {item.label}
                                </span>
                                <span className="text-[13px] sm:text-[14px] text-gray-700 group-hover:text-blue-600 transition-colors truncate ml-4">
                                    {item.value}
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* Availability */}
                    <div className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-xl bg-green-50/50 border border-green-100">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[12px] sm:text-[13px] font-medium text-green-700">
                                Available for work
                            </span>
                        </div>
                        <p className="text-[12px] sm:text-[13px] text-green-600/70 leading-relaxed">
                            Currently open to freelance writing, design
                            projects, and creative collaborations.
                        </p>
                    </div>
                </div>
            </div>
        </PageShell>
    );
}
