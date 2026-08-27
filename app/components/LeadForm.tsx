"use client";
import {useState} from "react"; import {ArrowRight,CheckCircle2} from "lucide-react";
export default function LeadForm(){const[sent,setSent]=useState(false);
if(sent)return <div className="rounded-[28px] bg-white p-8 text-black shadow-2xl"><CheckCircle2 className="mb-4 text-[#c9953d]" size={34}/><h2 className="serif text-3xl">Request received.</h2><p className="mt-3 text-sm leading-6 text-[#706b61]">Our DivineStays team will contact you with suitable options.</p></div>;
return <form onSubmit={e=>{e.preventDefault();setSent(true)}} className="rounded-[28px] bg-white p-7 text-black shadow-2xl">
<p className="text-xs font-bold uppercase tracking-[.2em] text-[#c9953d]">Get matched</p><h2 className="serif mt-2 text-3xl">Find your stay.</h2>
<div className="mt-6 space-y-3">
<input required placeholder="Your name" className="w-full rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3"/>
<input required placeholder="WhatsApp / phone number" className="w-full rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3"/>
<div className="grid gap-3 sm:grid-cols-2"><select className="rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3"><option>Preferred location</option><option>Jhawar Nagar</option><option>Landmark City</option><option>Coral Park</option></select><select className="rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3"><option>Monthly budget</option><option>Under ₹7,000</option><option>₹7,000–₹10,000</option><option>₹10,000+</option></select></div>
<div className="grid gap-3 sm:grid-cols-2"><select className="rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3"><option>Room preference</option><option>Single</option><option>Double sharing</option><option>Triple sharing</option></select><input type="date" className="rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3"/></div>
<input placeholder="Institute / coaching" className="w-full rounded-xl border border-[#e7e0d4] bg-[#faf8f4] px-4 py-3"/>
</div>
<button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b1a18] px-5 py-3.5 font-semibold text-white">Get my options <ArrowRight size={17}/></button>
<p className="mt-3 text-center text-[11px] text-[#8a8378]">We’ll use your details only to respond to your accommodation enquiry.</p></form>}