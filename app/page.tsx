import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Categories from "@/components/home/Categories";
import EventListing from "@/components/home/EventListing";
import Testimonials from "@/components/home/Testimonials";
import NewsletterFaq from "@/components/home/NewsLetterFaq";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Stats/>
      <Categories />    
        <EventListing /> 
        <Testimonials /> 
        <NewsletterFaq /> 
    </div>
  );
}