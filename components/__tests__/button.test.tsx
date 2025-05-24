import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../ui/button'; 

// Mock GSAP and its plugins directly within the factory
jest.mock('gsap', () => {
  const mockPlayFn = jest.fn();
  const mockReverseFn = jest.fn();
  const mockKillFn = jest.fn(); // Shared kill function for all timeline instances

  // This object will be returned by the mocked gsap.timeline()
  const mockTimelineInstance = {
    play: mockPlayFn,
    reverse: mockReverseFn,
    kill: mockKillFn, // All timelines created will use this mock for .kill()
    to: jest.fn().mockReturnThis(), // For chaining
  };

  // Store the cleanup function that should be returned by mm.add's callback
  let currentMatchMediaAddCleanup: (() => void) | null = null;

  const mockMatchMediaAdd = jest.fn((_query, funcThatReturnsCleanup) => {
    // Execute the function which sets up animations and returns a cleanup function
    const specificCleanup = funcThatReturnsCleanup(); 
    currentMatchMediaAddCleanup = specificCleanup; // Store it
    // The object returned by .add() has a .revert() method, which IS the specificCleanup
    return { revert: specificCleanup || jest.fn() }; 
  });

  // This is the mock for the top-level mm.revert()
  const topLevelMatchMediaRevertFn = jest.fn(() => {
    // When mm.revert() is called, it should execute the stored cleanup function
    // from the last call to .add() within that matchMedia instance.
    if (currentMatchMediaAddCleanup) {
      currentMatchMediaAddCleanup();
    }
  });
  
  return {
    __esModule: true,
    gsap: {
      registerPlugin: jest.fn(),
      set: jest.fn(),
      timeline: jest.fn(() => mockTimelineInstance),
      matchMedia: jest.fn(() => ({
        add: mockMatchMediaAdd,
        revert: topLevelMatchMediaRevertFn, // mm.revert()
      })),
      // For assertions:
      _mockTimelineInstance: mockTimelineInstance, // To access play, reverse, kill mocks
      _mockMatchMediaAdd: mockMatchMediaAdd,       // To check calls to add
      _mockTopLevelRevertFn: topLevelMatchMediaRevertFn, // To check calls to mm.revert()
      _mockKillFnFromTimeline: mockKillFn, // To check calls to any timeline's .kill()
    },
  };
});

// Mock ResizeObserver globally for this test file
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));


describe('Button Component', () => {
  let mockTimelineInstance: any;
  let mockGsapMatchMediaAdd_fromFactory: any; 
  let mockTopLevelRevertFn_fromFactory: any;
  let mockKillFnFromTimeline_fromFactory: any;


  beforeEach(() => {
    const gsapMock = require('gsap').gsap;
    mockTimelineInstance = gsapMock._mockTimelineInstance;
    mockGsapMatchMediaAdd_fromFactory = gsapMock._mockMatchMediaAdd; 
    mockTopLevelRevertFn_fromFactory = gsapMock._mockTopLevelRevertFn;
    mockKillFnFromTimeline_fromFactory = gsapMock._mockKillFnFromTimeline;

    mockTimelineInstance.play.mockClear();
    mockTimelineInstance.reverse.mockClear();
    mockKillFnFromTimeline_fromFactory.mockClear(); 
    mockGsapMatchMediaAdd_fromFactory.mockClear(); 
    mockTopLevelRevertFn_fromFactory.mockClear();
    gsapMock.timeline.mockClear();
  });

  test('renders button with children', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('applies default variant classes', () => {
    render(<Button>Default Button</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  test('applies specified variant classes', () => {
    render(<Button variant="destructive">Destructive Button</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('bg-destructive', 'text-destructive-foreground');
  });

  test('renders as child component when asChild prop is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    const linkElement = screen.getByRole('link', { name: /link button/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe('A');
  });

  test('GSAP hover and focus animations are triggered', () => {
    render(<Button>Interactive Button</Button>);
    const buttonElement = screen.getByRole('button');

    fireEvent.mouseEnter(buttonElement);
    expect(mockTimelineInstance.play).toHaveBeenCalledTimes(1);
    fireEvent.mouseLeave(buttonElement);
    expect(mockTimelineInstance.reverse).toHaveBeenCalledTimes(1);

    fireEvent.focus(buttonElement);
    expect(mockTimelineInstance.play).toHaveBeenCalledTimes(2); 
    fireEvent.blur(buttonElement);
    expect(mockTimelineInstance.reverse).toHaveBeenCalledTimes(2);
  });
  
  test('GSAP animations are not set up if prefers-reduced-motion is true', () => {
    const gsapMock = require('gsap').gsap;
    // Get the mock for matchMedia().add that was set up in the factory
    const mockAdd = gsapMock.matchMedia().add; 
    
    // Override its implementation for this test
    mockAdd.mockImplementationOnce((query: string, funcThatReturnsCleanup: () => (() => void) | void) => {
        if (query === "(prefers-reduced-motion: no-preference)") {
          // Don't call funcThatReturnsCleanup, simulating that animations are not set up
        } else {
           // For other queries, if any (none in Button.tsx's case for matchMedia)
           funcThatReturnsCleanup();
        }
        return { revert: jest.fn() }; // Return a mock revert for this specific .add call
    });
    
    gsapMock.timeline.mockClear(); // Clear timeline factory calls before render

    render(<Button>Motion Test</Button>);
    const buttonElement = screen.getByRole('button');
    
    // Because the func inside mm.add was effectively skipped for "(prefers-reduced-motion: no-preference)",
    // no timelines should have been created by it.
    expect(gsapMock.timeline).not.toHaveBeenCalled();

    fireEvent.mouseEnter(buttonElement);
    expect(mockTimelineInstance.play).not.toHaveBeenCalled();
    fireEvent.mouseLeave(buttonElement);
    expect(mockTimelineInstance.reverse).not.toHaveBeenCalled();
  });

  test('GSAP cleanup occurs on unmount', () => {
    const { unmount } = render(<Button>Test</Button>);
    unmount();
    expect(mockTopLevelRevertFn_fromFactory).toHaveBeenCalledTimes(1);
    expect(mockKillFnFromTimeline_fromFactory).toHaveBeenCalledTimes(2); 
  });

});
