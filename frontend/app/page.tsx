import CTASection from "@/components/CTASection";
import EnquiryForm from "@/components/EnquiryForm";
import GalleryGrid from "@/components/GalleryGrid";
import Hero from "@/components/Hero";
import LayoutCard from "@/components/LayoutCard";
import PlotCard from "@/components/PlotCard";
import ProjectCard from "@/components/ProjectCard";
import { galleryItems } from "@/data/gallery";
import { layouts } from "@/data/layouts";
import { plots } from "@/data/plots";
import { projects } from "@/data/projects";

export default function Home() {
  const featuredPlots = plots.slice(0, 3);
  const featuredLayouts = layouts.slice(0, 2);
  const featuredProjects = projects.slice(0, 2);
  const enquiryOptions = Array.from(
    new Set([
      ...plots.slice(0, 4).map((plot) => plot.name),
      ...layouts.slice(0, 3).map((layout) => layout.name),
    ]),
  );

  return (
    <div className="pb-16 sm:pb-24">
      <Hero
        eyebrow="Nyamagoud Developers, Jamkhandi"
        headline="Premium Residential Plots in and around Jamkhandi"
        description="Discover carefully planned residential plots, developing layouts, and completed real estate works from a local team focused on trust, clarity, and site support."
        primaryAction={{ label: "View Available Plots", href: "/plots" }}
        secondaryAction={{ label: "Book a Site Visit", href: "/contact#enquiry" }}
        highlights={[
          "Residential plot discovery",
          "Ongoing layout development",
          "Transparent enquiry support",
        ]}
        stats={[
          { label: "Focused on", value: "Jamkhandi region" },
          { label: "Project types", value: "Plots, layouts, works" },
          { label: "Approach", value: "Local and transparent" },
        ]}
      />

      {/* About Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-[2.5rem] border border-white/60 bg-white/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-md sm:grid-cols-[1.2fr_0.8fr] lg:p-12">
          <div className="flex flex-col justify-center space-y-5">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">
              About the developer
            </p>
            <h2 className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl lg:leading-tight">
              C. M. Nyamagoud brings local experience and a practical approach.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              The focus is on residential plots, layout development, and completed works that are easy to understand, easy to inspect, and simple to enquire about. Every listing is presented with enough detail to help a family or investor move from discovery to a site visit with confidence.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ["Trust first", "Transparent dealing and clear communication."],
              ["Site support", "Guidance from enquiry to visit and follow-up."],
              ["Local knowledge", "Focused on Jamkhandi and nearby growth corridors."],
            ].map(([title, text]) => (
              <div
                key={title}
                className="group rounded-2xl bg-white/50 p-6 shadow-sm ring-1 ring-emerald-100 transition-all hover:bg-emerald-50/80 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-800 transition-colors">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plots Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-sky-600">Featured plots</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Available residential opportunities</h2>
          </div>
          <a
            href="/plots"
            className="inline-flex w-fit items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-300 hover:text-sky-700 hover:shadow-md active:scale-95"
          >
            Explore all plots
          </a>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredPlots.map((plot) => (
            <PlotCard key={plot.name} plot={plot} />
          ))}
        </div>
      </section>

      {/* Ongoing Layouts Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-600">Ongoing layouts</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Layouts currently under development</h2>
          </div>
          <a
            href="/layouts"
            className="inline-flex w-fit items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-md active:scale-95"
          >
            View all layouts
          </a>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {featuredLayouts.map((layout) => (
            <LayoutCard key={layout.name} layout={layout} />
          ))}
        </div>
      </section>

      {/* Completed Projects Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-600">Completed projects</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Delivered development works</h2>
          </div>
          <a
            href="/completed-projects"
            className="inline-flex w-fit items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal-300 hover:text-teal-700 hover:shadow-md active:scale-95"
          >
            View past projects
          </a>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>

      {/* Features Value Proposition */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Trusted local presence", "Jamkhandi-focused development and plot discovery.", "text-emerald-700"],
            ["Clear enquiry flow", "Cards, CTAs, and a reusable form for quick follow-up.", "text-sky-700"],
            ["Residential planning", "Layouts and plots designed for practical family living.", "text-amber-700"],
            ["Long-term support", "From site visit scheduling to post-enquiry guidance.", "text-rose-700"],
          ].map(([title, text, colorClass]) => (
            <div
              key={title}
              className="group rounded-3xl border border-white/80 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(15,23,42,0.08)]"
            >
              <h3 className={`text-lg font-bold ${colorClass}`}>{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-rose-600">Gallery preview</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Recent site and project visuals</h2>
          </div>
          <a
            href="/gallery"
            className="inline-flex w-fit items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-rose-300 hover:text-rose-700 hover:shadow-md active:scale-95"
          >
            Open gallery
          </a>
        </div>
        <GalleryGrid items={galleryItems.slice(0, 6)} />
      </section>

      {/* CTA & Enquiry */}
      <div className="mt-8 space-y-16 sm:space-y-24">
        <CTASection
          eyebrow="Ready to enquire?"
          title="Tell us what you are looking for and we will guide you to the right plot or layout."
          description="Use the form below to request pricing, schedule a site visit, or ask for a callback. The form is static for now and logs enquiries to the console so it can be connected to an API route later."
          primaryAction={{ label: "Open contact page", href: "/contact" }}
          secondaryAction={{ label: "Browse available plots", href: "/plots" }}
        />

        <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8" id="enquiry">
          <div className="rounded-[2.5rem] bg-white p-6 shadow-xl ring-1 ring-slate-900/5 sm:p-10">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Send an Enquiry</h2>
              <p className="mt-2 text-sm text-slate-600">Fill out the details below and our team will get back to you shortly.</p>
            </div>
            <EnquiryForm interestOptions={enquiryOptions} />
          </div>
        </section>
      </div>
    </div>
  );
}