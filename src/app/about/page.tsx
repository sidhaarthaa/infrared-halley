import PageShell from "@/components/PageShell";

export default function AboutPage() {
    return (
        <PageShell>
            <div className="max-w-[540px]">
                <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                    About
                </h1>

                <div className="space-y-4 sm:space-y-5">
                    <p className="text-[14px] sm:text-[15px] leading-[1.75] text-gray-500">
                        I&apos;m Sai Karthik — a creative writer and designer
                        who believes that great communication lives at the
                        crossroads of language and visual design.
                    </p>

                    <p className="text-[14px] sm:text-[15px] leading-[1.75] text-gray-500">
                        Over the years, I&apos;ve worked across editorial
                        writing, brand storytelling, UI/UX design, and content
                        strategy. My approach is rooted in curiosity — I dig
                        into how people think, what they need to hear, and how
                        to present it in a way that feels both beautiful and
                        true.
                    </p>

                    <p className="text-[14px] sm:text-[15px] leading-[1.75] text-gray-500">
                        Whether it&apos;s crafting a narrative for a brand,
                        designing an interface, or writing a long-form essay, I
                        bring the same obsession with clarity and craft. I
                        believe every detail matters — from the weight of a
                        headline to the whitespace around a paragraph.
                    </p>

                    <p className="text-[14px] sm:text-[15px] leading-[1.75] text-gray-500">
                        When I&apos;m not writing or designing, you&apos;ll find
                        me exploring new tools, reading about typography, or
                        experimenting with creative coding.
                    </p>

                    <div className="pt-4 border-t border-gray-100 mt-6 sm:mt-8">
                        <h2 className="text-[15px] sm:text-[16px] font-semibold text-gray-900 mb-3 sm:mb-4">
                            What I Do
                        </h2>
                        <div className="space-y-3">
                            {[
                                {
                                    area: "Creative Writing",
                                    detail: "Essays, brand narratives, editorial content",
                                },
                                {
                                    area: "Design",
                                    detail: "UI/UX, visual identity, layout systems",
                                },
                                {
                                    area: "Content Strategy",
                                    detail: "Voice & tone, content architecture, storytelling",
                                },
                            ].map((item) => (
                                <div
                                    key={item.area}
                                    className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5 sm:gap-4"
                                >
                                    <p className="text-[13px] sm:text-[14px] font-medium text-gray-700">
                                        {item.area}
                                    </p>
                                    <p className="text-[12px] sm:text-[13px] text-gray-400">
                                        {item.detail}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-6 sm:mt-8">
                        <h2 className="text-[15px] sm:text-[16px] font-semibold text-gray-900 mb-3 sm:mb-4">
                            Experience
                        </h2>
                        <div className="space-y-3">
                            {[
                                {
                                    role: "Creative Writer & Designer",
                                    company: "Freelance",
                                    period: "2020 — Present",
                                },
                                {
                                    role: "Content Strategist",
                                    company: "Design Studio",
                                    period: "2018 — 2020",
                                },
                                {
                                    role: "Junior Designer & Writer",
                                    company: "Agency",
                                    period: "2016 — 2018",
                                },
                            ].map((item) => (
                                <div
                                    key={item.period}
                                    className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5 sm:gap-4"
                                >
                                    <div>
                                        <p className="text-[13px] sm:text-[14px] font-medium text-gray-700">
                                            {item.role}
                                        </p>
                                        <p className="text-[12px] sm:text-[13px] text-gray-400">
                                            {item.company}
                                        </p>
                                    </div>
                                    <span className="text-[11px] sm:text-[12px] text-gray-300 whitespace-nowrap">
                                        {item.period}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageShell>
    );
}
