import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";

export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <PageShell>
            <article>
                {/* Back link */}
                <Link
                    href="/blog"
                    data-cursor="pointer"
                    className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] text-gray-400 hover:text-blue-500 transition-colors mb-6 sm:mb-8"
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Blog
                </Link>

                {/* Post header */}
                <header className="mb-8 sm:mb-10">
                    <h1 className="text-[22px] sm:text-[26px] md:text-[32px] font-bold text-gray-900 leading-tight mb-2 sm:mb-3">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <time className="text-[12px] sm:text-[13px] text-gray-400">
                            {new Date(post.date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </time>
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-500"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </header>

                {/* Rendered markdown */}
                <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
            </article>
        </PageShell>
    );
}
