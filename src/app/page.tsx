import PageShell from "@/components/PageShell";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <PageShell>
      {/* Hero */}
      <div className="mb-12 sm:mb-16">
        <h1 className="text-[24px] sm:text-[28px] md:text-[34px] font-bold text-gray-900 leading-[1.15] mb-4 sm:mb-6 max-w-[520px]">
          Creative Writing &amp; Design
        </h1>

        <div className="max-w-[540px] space-y-4 sm:space-y-5">
          <p className="text-[14px] sm:text-[15px] leading-[1.75] text-gray-500">
            Hey, I&apos;m Sai Karthik. I&apos;ve spent years
            crafting stories and designing experiences that resonate.
            I believe good writing and good design share the same
            DNA — clarity, rhythm, and empathy.
          </p>
          <p className="text-[14px] sm:text-[15px] leading-[1.75] text-gray-500">
            From long-form essays to visual identities, I work at
            the intersection of words and aesthetics. Every project
            starts with listening and ends with something that feels
            both intentional and effortless.
          </p>
          <p className="text-[14px] sm:text-[15px] leading-[1.75] text-gray-500">
            This blog is where I think out loud — about creativity,
            design systems, storytelling, and the craft of making
            things that matter.
          </p>
        </div>
      </div>

      {/* Latest Posts */}
      {latestPosts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-[16px] sm:text-[18px] font-semibold text-gray-900">
              Latest Posts
            </h2>
            <Link
              href="/blog"
              data-cursor="pointer"
              className="text-[12px] sm:text-[13px] text-blue-500 hover:text-blue-600 transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                data-cursor="pointer"
                className="group block p-4 sm:p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 sm:mb-1.5">
                      {post.title}
                    </h3>
                    <p className="text-[12px] sm:text-[13px] text-gray-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <time className="text-[11px] sm:text-[12px] text-gray-300 whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2.5 sm:mt-3">
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
        </section>
      )}
    </PageShell>
  );
}
