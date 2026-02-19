import PageShell from "@/components/PageShell";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <PageShell>
            <div className="mb-8 sm:mb-10">
                <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-gray-900 leading-tight mb-2 sm:mb-3">
                    Blog
                </h1>
                <p className="text-[13px] sm:text-[15px] text-gray-400">
                    Thoughts on writing, design, and the space in between.
                </p>
            </div>

            {posts.length === 0 ? (
                <div className="py-16 text-center">
                    <p className="text-gray-400 text-[15px]">
                        No posts yet. Add a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[13px]">.md</code> file to{" "}
                        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[13px]">content/posts/</code> to get started.
                    </p>
                </div>
            ) : (
                <div className="grid gap-3 sm:gap-4">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            data-cursor="pointer"
                            className="group block p-4 sm:p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200 glass-card-interactive"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-1.5 sm:mb-2">
                                <h2 className="text-[14px] sm:text-[16px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h2>
                                <time className="text-[11px] sm:text-[12px] text-gray-300 whitespace-nowrap">
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </time>
                            </div>

                            <p className="text-[12px] sm:text-[14px] text-gray-400 leading-relaxed mb-2.5 sm:mb-3">
                                {post.excerpt}
                            </p>

                            {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-500 transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </PageShell>
    );
}
