import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TimelineSection } from '../timeline-section'; // Adjust path if needed

// --- Mock GSAP and its plugins ---
const mockGsapPlay = jest.fn();
const mockGsapPause = jest.fn();
const mockGsapKill = jest.fn();
const mockGsapRevert = jest.fn();
const mockGsapTimelineTo = jest.fn().mockReturnThis(); // For chaining .to()

const mockGsapTimeline = jest.fn(() => ({
  to: mockGsapTimelineTo,
  play: mockGsapPlay,
  pause: mockGsapPause,
  kill: mockGsapKill,
  // Add other methods if needed by the component
}));

const mockGsapMatchMediaAdd = jest.fn((_query, func) => {
  func(); // Immediately execute the function to simulate 'prefers-reduced-motion: no-preference'
  return { revert: mockGsapRevert };
});

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));


jest.mock('gsap', () => ({
  __esModule: true,
  gsap: {
    registerPlugin: jest.fn(),
    utils: {
      toArray: jest.fn(selector => {
        if (typeof selector === 'string') {
          // Basic querySelectorAll mock for tests
          return Array.from(document.querySelectorAll(selector));
        }
        if (selector instanceof HTMLElement) { // Handle case where element itself is passed
            return [selector];
        }
        return [];
      }),
    },
    set: jest.fn(),
    to: jest.fn(),
    fromTo: jest.fn(),
    timeline: mockGsapTimeline,
    matchMedia: jest.fn(() => ({
      add: mockGsapMatchMediaAdd,
      revert: mockGsapRevert,
    })),
  },
}));

jest.mock('gsap/ScrollTrigger', () => ({
  __esModule: true,
  ScrollTrigger: {
    create: jest.fn().mockReturnValue({ kill: mockGsapKill }),
    getAll: jest.fn().mockReturnValue([]),
    refresh: jest.fn(),
  },
}));

jest.mock('gsap/ScrollToPlugin', () => ({
  __esModule: true,
  ScrollToPlugin: {}, // Empty mock
}));

jest.mock('gsap/Observer', () => ({
  __esModule: true,
  Observer: {
    create: jest.fn().mockReturnValue({ 
        kill: mockGsapKill, 
        isDragging: false, 
        isPressed: false,
        // Mock event listener methods if needed, e.g., on: jest.fn(), off: jest.fn()
    }),
  },
}));

// Mock next/font (if your component uses it directly or indirectly)
jest.mock('next/font/google', () => ({
  Poppins: () => ({ style: { fontFamily: 'mocked-poppins' } }),
  Playfair_Display: () => ({ style: { fontFamily: 'mocked-playfair-display' } }),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'), // Keep other exports like AnimatePresence
  motion: { // Mock the 'motion' object
    // @ts-ignore
    div: ({ children, ...props }) => <div {...props}>{children}</div>, // Simplest functional component mock
    // Add other motion elements if TimelineSection or its children use them directly e.g. motion.span
    span: ({ children, ...props }) => <span {...props}>{children}</span>, 
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useScroll: jest.fn(() => ({ scrollYProgress: {} })),
  useTransform: jest.fn(value => value),
}));


describe('TimelineSection', () => {
  let originalInnerWidth: PropertyDescriptor | undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    originalInnerWidth = Object.getOwnPropertyDescriptor(window, 'innerWidth');
  });

  afterEach(() => {
    if (originalInnerWidth) {
      Object.defineProperty(window, 'innerWidth', originalInnerWidth);
    }
  });

  const setScreenWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    // Manually trigger resize for the component's listener
    window.dispatchEvent(new Event('resize'));
  };

  test('renders section title and timeline events', () => {
    render(<TimelineSection />);
    expect(screen.getByText('Our Journey')).toBeInTheDocument();
    expect(screen.getByText('NBA TECH Founded')).toBeInTheDocument();
  });

  test('initializes with auto-scroll playing on desktop (width >= 768px)', () => {
    setScreenWidth(1024);
    render(<TimelineSection />);
    // Expect the Pause button to be visible, indicating it's playing
    expect(screen.getByLabelText('Pause timeline auto-scroll')).toBeInTheDocument();
    // GSAP timeline `play()` should be called by the logic that sets isPlaying based on screen width
    // or the timeline is created in a playing state.
    // Check if the timeline creation itself was called, implying setup for play.
    expect(mockGsapTimeline).toHaveBeenCalled(); 
    // The timeline is paused if not isPlaying, so if it's playing, pause was not called.
    // And play was called (or it starts playing by default)
    expect(mockGsapPause).not.toHaveBeenCalled();
  });
  
  test('initializes with auto-scroll paused on mobile (width < 768px)', () => {
    setScreenWidth(500);
    render(<TimelineSection />);
     // Expect the Play button to be visible
    expect(screen.getByLabelText('Play timeline auto-scroll')).toBeInTheDocument();
    // GSAP timeline `pause()` should be called or it should be initialized paused.
    // The timeline is created, but then immediately paused due to isPlaying being false.
    expect(mockGsapTimeline).toHaveBeenCalled(); 
    expect(mockGsapPause).toHaveBeenCalled(); 
  });


  test('play/pause button toggles isPlaying state and animation', () => {
    setScreenWidth(1024); // Start on desktop, playing
    render(<TimelineSection />);

    const initialPauseButton = screen.getByLabelText('Pause timeline auto-scroll');
    fireEvent.click(initialPauseButton); // Click to pause

    expect(screen.getByLabelText('Play timeline auto-scroll')).toBeInTheDocument();
    expect(mockGsapPause).toHaveBeenCalledTimes(1); // Pause was called once

    const playButton = screen.getByLabelText('Play timeline auto-scroll');
    fireEvent.click(playButton); // Click to play

    expect(screen.getByLabelText('Pause timeline auto-scroll')).toBeInTheDocument();
    // Play is called when isPlaying becomes true.
    // Depending on how the mock is set up, this might be tricky if play is called on init too.
    // Let's assume our mockGsapPlay is fresh for this part of interaction.
    // The useEffect for isPlaying will trigger the play/pause on the timeline ref.
    expect(mockGsapPlay).toHaveBeenCalledTimes(1); // Play was called once after being paused.
  });
});
