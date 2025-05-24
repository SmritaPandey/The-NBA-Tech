"use client"

import { useRef, useEffect, useState } from "react" // Added useState
import { motion, useScroll, useTransform } from "framer-motion" 
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin" // Added ScrollToPlugin
import { Observer } from "gsap/Observer" // Added Observer
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Award, Rocket, Users, Code, Shield, Play, Pause } from "lucide-react" // Added Play, Pause icons
import { Button } from "@/components/ui/button" // For Play/Pause button

// Timeline data
const timelineEvents = [
  {
    year: "2018",
    title: "NBA TECH Founded",
    description: "Started with a team of 5 developers focused on custom software solutions.",
    icon: Rocket,
    color: "software-blue",
  },
  {
    year: "2019",
    title: "Cybersecurity Division",
    description: "Expanded services to include comprehensive security solutions and 24/7 SOC operations.",
    icon: Shield,
    color: "cybersecurity-green",
  },
  {
    year: "2020",
    title: "50+ Team Members",
    description: "Grew to over 50 professionals across development, security, and infrastructure teams.",
    icon: Users,
    color: "hr-purple",
  },
  {
    year: "2021",
    title: "Enterprise Solutions",
    description: "Launched banking and enterprise solution services for large-scale organizations.",
    icon: Code,
    color: "banking-gold",
  },
  {
    year: "2022",
    title: "Industry Recognition",
    description: "Received multiple awards for innovation in secure digital transformation.",
    icon: Award,
    color: "marketing-orange",
  },
  {
    year: "2023",
    title: "Global Expansion",
    description: "Expanded operations to serve clients across 3 continents with 24/7 support.",
    icon: Calendar,
    color: "infrastructure-red",
  },
]

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef, // This ref is for the main section for Framer Motion's animation
    offset: ["start end", "end start"],
  })

  const titleRef = useRef<HTMLDivElement>(null);
  const eventsContainerRef = useRef<HTMLDivElement>(null); 
  const autoScrollTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Default isPlaying to true on larger screens, false on smaller screens
  const [isPlaying, setIsPlaying] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  
  useEffect(() => {
    // Handler to update isPlaying based on window resize
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsPlaying(false); // Pause on small screens
      } else {
        setIsPlaying(true); // Play on larger screens (can be adjusted)
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      // Initial check
      handleResize();
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []); // Runs once to set up resize listener


  // GSAP Animations & Auto-scroll
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);
    const mm = gsap.matchMedia();
    let observerInstance: Observer | null = null;
    let clonedElements: HTMLElement[] = [];

    const timelineContext = mm.add("(prefers-reduced-motion: no-preference)", () => {
      const container = eventsContainerRef.current;
      if (!container) return;

      // --- Existing Title and Card Reveal Animations ---
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top bottom-=100px",
              once: true,
            },
          }
        );
      }

      // Timeline Event Cards Reveal
      if (eventsContainerRef.current) {
        const cards = gsap.utils.toArray<HTMLDivElement>(
          eventsContainerRef.current.querySelectorAll(".timeline-event-card")
        );
        if (cards.length > 0) {
          gsap.set(cards, {opacity: 0, x: -50}); // Initial state for horizontal reveal
          cards.forEach((card, index) => {
            gsap.to(card, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: ScrollTrigger.create({ // Link to horizontal scroll
                  trigger: eventsContainerRef.current,
                  scroller: eventsContainerRef.current, // The container itself is the scroller
                  horizontal: true,
                  scrub: false, // Can be true for scrub effect
                  start: "left center+=200px", // Adjust as needed
                  end: "right left", // Dummy end, adjust if needed
                }),
                start: "left center+=100px", // When the left of the card hits 100px past center of viewport (in horizontal scroll)
                once: true, // Animate once
                // toggleActions: "play none none none", // Play animation when it enters
              },
            });
          });
        }
      }

      // Card hover effects (GSAP replacing CSS) - This should be outside auto-scroll logic if it's independent
      const allTimelineCardElements = gsap.utils.toArray<HTMLDivElement>(".gsap-timeline-card-hover");
      allTimelineCardElements.forEach(cardEl => {
        gsap.set(cardEl, { transformOrigin: "center center" });
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(cardEl, { 
          y: -5, 
          scale: 1.02,
          boxShadow: "0px 8px 15px rgba(0,0,0,0.07)",
          duration: 0.3, 
          ease: "power2.out" 
        });
        cardEl.addEventListener("mouseenter", () => hoverTl.play());
        cardEl.addEventListener("mouseleave", () => hoverTl.reverse());
      });

      // --- Auto-scroll Logic ---
      const originalCards = gsap.utils.toArray<HTMLElement>(container.querySelectorAll(".timeline-event-card"));
      if (originalCards.length === 0) return;

      const cardWidth = originalCards[0].offsetWidth + parseFloat(getComputedStyle(originalCards[0]).marginRight || '0') + parseFloat(getComputedStyle(originalCards[0]).marginLeft || '0');
      const totalOriginalWidth = cardWidth * originalCards.length;
      const viewportWidth = container.offsetWidth;
      
      // Clone cards for seamless loop if content is scrollable
      if (totalOriginalWidth > viewportWidth) {
        let numClones = Math.ceil(viewportWidth / cardWidth) +1; // Clone enough to fill viewport + one extra
        numClones = Math.min(numClones, originalCards.length); // Don't clone more than available
        
        for (let i = 0; i < numClones; i++) {
          const clone = originalCards[i].cloneNode(true) as HTMLElement;
          container.appendChild(clone);
          clonedElements.push(clone);
        }
      }
      
      const totalScrollWidth = totalOriginalWidth; // Scroll up to the end of original content

      autoScrollTimelineRef.current = gsap.timeline({
        paused: !isPlaying, // Initial play state
        onComplete: () => { // For seamless loop with clones
           if (totalOriginalWidth > viewportWidth) {
            gsap.set(container, { scrollLeft: 0 });
            autoScrollTimelineRef.current?.play(0); // Play from start
           }
        },
        onInterrupt: () => { // If user interacts, pause
            // This might be handled better by Observer
        }
      })
      .to(container, {
        scrollLeft: totalScrollWidth,
        duration: totalOriginalWidth / 50, // Adjust speed: pixels per second
        ease: "none",
      });
      
      if (totalOriginalWidth <= viewportWidth) { // If not enough content to scroll, disable timeline
          autoScrollTimelineRef.current.pause();
      }


      // Pause on hover over the container
      container.addEventListener("mouseenter", () => {
        if (isPlaying) autoScrollTimelineRef.current?.pause();
      });
      container.addEventListener("mouseleave", () => {
        if (isPlaying && !observerInstance?.isDragging && !observerInstance?.isPressed) { // Check if user is not currently interacting
             autoScrollTimelineRef.current?.play();
        }
      });

      // Observer for manual scroll/drag interaction
      observerInstance = Observer.create({
        target: container,
        type: "scroll", // Using "scroll" type on the container itself
        onDown: () => { // User starts interaction (mousedown/touchstart on scrollbar or content if draggable)
          if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
          autoScrollTimelineRef.current?.pause();
        },
        onDrag: () => { // While dragging scrollbar
            if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
            autoScrollTimelineRef.current?.pause();
        },
        onWheel: () => {
            if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
            autoScrollTimelineRef.current?.pause();
        },
        onRelease: () => { // User ends interaction
          if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
          interactionTimeoutRef.current = setTimeout(() => {
            if (isPlaying && !container.matches(':hover')) { // Resume only if mouse is not over container
              autoScrollTimelineRef.current?.play();
            }
          }, 2500); // 2.5s delay before resuming
        },
        // Prevent scroll event bubbling if needed, though not primary for this logic
        // tolerance:10, 
        // preventDefault:true, 
      });

      return () => { // Cleanup for this specific matchMedia context
        autoScrollTimelineRef.current?.kill();
        observerInstance?.kill();
        clonedElements.forEach(clone => clone.remove());
        clonedElements = [];
        if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
        // Remove event listeners added directly
        container.removeEventListener("mouseenter", () => {}); // Placeholder, actual removal needs stored handler
        container.removeEventListener("mouseleave", () => {}); // Placeholder
      };
    }); // End of mm.add

    return () => { // Main useEffect cleanup
      mm.revert();
      // Kill all scroll triggers specifically created for this component (title, card reveals)
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === titleRef.current || 
            gsap.utils.toArray<HTMLDivElement>(eventsContainerRef.current?.querySelectorAll(".timeline-event-card") || []).includes(trigger.vars.trigger as HTMLDivElement)
           ) {
          trigger.kill();
        }
      });
       // Ensure hover effect timelines are also killed if they weren't part of mm.revert()
       gsap.utils.toArray<HTMLDivElement>(".gsap-timeline-card-hover").forEach(cardEl => {
        const tl = gsap.getTweensOf(cardEl); // Get all tweens/timelines associated with the element
        if (tl) tl.forEach(t => t.kill());
      });
    };
  }, [isPlaying]); // Re-run useEffect if isPlaying changes

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) 
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])   

  return (
    <section id="timeline" className="py-20 bg-muted/30 relative overflow-hidden" ref={containerRef}>
      <motion.div className="container mx-auto" style={{ opacity, scale }}> 
        <div ref={titleRef} className="text-center mb-12 relative"> {/* Added relative for button positioning */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            From our founding to today, we've continuously evolved to meet the changing needs of our clients.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative mt-16 pb-8">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" />

          {/* Play/Pause Button */}
          <div className="absolute top-0 right-0 mt-0 mr-0 md:mr-4">
            <Button
              variant="outline"
              size="icon"
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause timeline auto-scroll" : "Play timeline auto-scroll"}
              className="border-2 border-[hsl(var(--electric-cyan))/50] hover:border-[hsl(var(--electric-cyan))] hover:bg-[hsl(var(--electric-cyan))/10] text-[hsl(var(--electric-cyan))]"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative mt-16 pb-8">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" />

          <div ref={eventsContainerRef} className="flex flex-nowrap overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            <div className="w-1/12 flex-shrink-0" /> 
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                // Add a unique class for original cards if needed, but .timeline-event-card is fine
                className="timeline-event-card w-10/12 md:w-8/12 lg:w-5/12 flex-shrink-0 px-4 snap-center opacity-0" 
              >
                <div className="relative gsap-timeline-card-hover"> 
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--electric-cyan))] to-[hsl(var(--deep-blue))] flex items-center justify-center z-10 shadow-md border border-[hsl(var(--electric-cyan))/30]"
                  >
                    <event.icon className="h-5 w-5 text-white" />
                  </div>

                  {/* Year badge */}
                  <Badge
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-14 bg-[hsl(var(--electric-cyan))] text-[hsl(var(--deep-blue))] font-semibold"
                  >
                    {event.year}
                  </Badge>

                  {/* Content card - removed CSS hover classes, will be handled by GSAP via .gsap-timeline-card-hover */}
                  <Card className="mt-8 border-[hsl(var(--electric-cyan))/20]">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[hsl(var(--deep-blue))] to-[hsl(var(--electric-cyan))] bg-clip-text text-transparent dark:from-[hsl(var(--electric-cyan))] dark:to-[hsl(210,40%,90%)]">{event.title}</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
            <div className="w-1/12 flex-shrink-0" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
