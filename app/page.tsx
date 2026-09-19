import { ArrowRight, ShieldCheck, Wifi, Utensils, CheckCircle2 } from "lucide-react";
import LeadForm from "./components/LeadForm";
import HostelSearch from "./components/HostelSearch";
import PropertyDirectory from "./components/PropertyDirectory";
import { getPublishedProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default async function Home() {
  const properties = await getPublishedProperties();

  return (
    <main>
      <section className="hero text-white">
        <nav className="container flex items-center justify-between py-6">
          <div className="text-2xl font-semibold">
            Divine<span className="gold">Stays</span>
          </div>
          <a href="#properties" className="rounded-full border border-white/15 px-5 py-2.5 text-sm hover:bg-white/10">
            Explore stays
          </a>
        </nav>
        <div className="container grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="gold text-sm font-bold uppercase tracking-[.25em]">Kota · Student Living</p>
            <h1 className="serif mt-5 max-w-3xl text-5xl leading-[1.04] sm:text-7xl">
              Find a place that feels like <span className="text-[#d9b36b]">home.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/70">
              Four DivineStays locations across Kota, built around comfort, convenience and focused student living.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#lead" className="inline-flex items-center gap-2 rounded-full bg-[#c9953d] px-6 py-3.5 font-semibold text-black">
                Find my stay <ArrowRight size={18} />
              </a>
              <a href="#properties" className="rounded-full border border-white/20 px-6 py-3.5 font-semibold">
                View locations
              </a>
            </div>
            <HostelSearch />
            <div className="mt-12 flex flex-wrap gap-7 text-sm text-white/60">
              <span><ShieldCheck size={17} className="mr-2 inline" />Security-first</span>
              <span><Wifi size={17} className="mr-2 inline" />Wi-Fi ready</span>
              <span><Utensils size={17} className="mr-2 inline" />Food options</span>
            </div>
          </div>
          <LeadForm properties={properties} />
        </div>
      </section>

      <section id="properties" className="container py-24">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="gold text-sm font-bold uppercase tracking-[.2em]">Our four locations</p>
            <h2 className="serif mt-3 text-4xl sm:text-5xl">Choose your side of Kota.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#6f6a61]">
            Start with the location that works for your coaching, commute and daily routine.
          </p>
        </div>
        <div className="mt-12">
          <PropertyDirectory properties={properties} />
        </div>
      </section>

      <section className="bg-[#1b1a18] py-24 text-white">
        <div className="container grid gap-10 md:grid-cols-3">
          <div><div className="gold text-4xl font-bold">01</div><h3 className="mt-4 text-xl font-semibold">Tell us what you need</h3><p className="mt-2 text-sm leading-6 text-white/55">Location, budget, room preference and move-in date.</p></div>
          <div><div className="gold text-4xl font-bold">02</div><h3 className="mt-4 text-xl font-semibold">Get matched</h3><p className="mt-2 text-sm leading-6 text-white/55">We route your enquiry to the right DivineStays property.</p></div>
          <div><div className="gold text-4xl font-bold">03</div><h3 className="mt-4 text-xl font-semibold">Visit & move in</h3><p className="mt-2 text-sm leading-6 text-white/55">Connect, compare and choose your room.</p></div>
        </div>
      </section>

      <section id="lead" className="container py-24">
        <div className="grid gap-10 rounded-3xl bg-white p-8 shadow-sm lg:grid-cols-[.85fr_1.15fr] sm:p-12">
          <div>
            <p className="gold text-sm font-bold uppercase tracking-[.2em]">Lead generation starts here</p>
            <h2 className="serif mt-3 text-4xl sm:text-5xl">One enquiry. The right stay.</h2>
            <p className="mt-5 text-sm leading-7 text-[#6f6a61]">This form routes straight into our lead dashboard so the right property team can follow up fast.</p>
            <div className="mt-7 space-y-3 text-sm">
              <p><CheckCircle2 className="gold mr-2 inline" size={18} />Student name + contact</p>
              <p><CheckCircle2 className="gold mr-2 inline" size={18} />Location + budget</p>
              <p><CheckCircle2 className="gold mr-2 inline" size={18} />Room preference + move-in date</p>
              <p><CheckCircle2 className="gold mr-2 inline" size={18} />Institute / coaching intent</p>
            </div>
          </div>
          <LeadForm properties={properties} />
        </div>
      </section>

      <footer className="border-t border-[#e7e0d4] py-8">
        <div className="container flex flex-col justify-between gap-2 text-sm text-[#6f6a61] sm:flex-row">
          <span>© 2026 DivineStays · Kota, Rajasthan</span>
          <span>Student accommodation, made simpler.</span>
        </div>
      </footer>
    </main>
  );
}
