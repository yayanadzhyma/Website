import { useEffect, useRef } from 'react';

interface Circle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  opacity: number;
  targetScale: number;
  currentScale: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function FloatingCirclesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let circles: Circle[] = [];

    // Colors matching the brand palette
    const colors = [
      '#4A1B21', // brand-wine
      '#642831', // brand-wine-light
      '#EAC9D0', // brand-pink
      '#D4ADB5', // brand-pink-dark
      '#EDD8C5', // brand-beige
      '#838F58', // brand-sage
      '#9BAA6F', // brand-sage-light
    ];

    const resizeCanvas = () => {
      const parent = containerRef.current;
      if (!parent) return;
      
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Re-initialize or adjust circles count on resize
      initCircles(rect.width, rect.height);
    };

    const initCircles = (width: number, height: number) => {
      circles = [];
      const density = Math.min(width * height / 40000, 24); // max 24 circles for pristine look
      
      // Seed a couple of very large premium circles to match the frame uploads
      const sizes = [
        { min: 90, max: 140, count: 4 }, // huge circles
        { min: 45, max: 80, count: 8 },  // medium circles
        { min: 15, max: 40, count: 8 },  // small circles
      ];

      sizes.forEach(({ min, max, count }) => {
        for (let i = 0; i < count; i++) {
          const radius = Math.random() * (max - min) + min;
          const color = '#4a1b21';

          // Random starting opacities (so they overlap elegantly like the uploaded frames)
          const opacity = Math.random() * 0.4 + 0.35; // nice opacity so they blend organically

          circles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4, // ultra-slow luxury drift
            vy: (Math.random() - 0.5) * 0.4,
            radius: radius,
            baseRadius: radius,
            color: color,
            opacity: opacity,
            targetScale: 1,
            currentScale: 1,
            pulseSpeed: Math.random() * 0.005 + 0.002,
            pulsePhase: Math.random() * Math.PI * 2,
          });
        }
      });
    };

    // Resize observer to handle dynamic layout updates
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Set up mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.targetX = e.touches[0].clientX - rect.left;
        mouseRef.current.targetY = e.touches[0].clientY - rect.top;
        mouseRef.current.active = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);

    // Initial run
    resizeCanvas();

    // Main render loop
    const tick = () => {
      const parent = containerRef.current;
      if (!parent) return;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      if (mouse.active) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.08;
          mouse.y += (mouse.targetY - mouse.y) * 0.08;
        }
      } else {
        mouse.x += (-1000 - mouse.x) * 0.05;
        mouse.y += (-1000 - mouse.y) * 0.05;
      }

      // Draw and update circles
      circles.forEach((circle) => {
        // Move circle
        circle.x += circle.vx;
        circle.y += circle.vy;

        // Bounce of edges with elastic bounds
        const buffer = circle.radius * -0.5;
        if (circle.x < buffer) {
          circle.x = buffer;
          circle.vx *= -1;
        } else if (circle.x > width - buffer) {
          circle.x = width - buffer;
          circle.vx *= -1;
        }
        
        if (circle.y < buffer) {
          circle.y = buffer;
          circle.vy *= -1;
        } else if (circle.y > height - buffer) {
          circle.y = height - buffer;
          circle.vy *= -1;
        }

        // Pulse scale breathing effect
        circle.pulsePhase += circle.pulseSpeed;
        const pulseFactor = Math.sin(circle.pulsePhase) * 0.08; // scale by +/- 8%
        
        // Mouse reactivity (organic scaling and slight repelling force)
        let scaleTarget = 1 + pulseFactor;
        
        if (mouse.active) {
          const dx = circle.x - mouse.x;
          const dy = circle.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pushRadius = 240;

          if (dist < pushRadius) {
            const force = (pushRadius - dist) / pushRadius;
            
            // Gently push away
            circle.x += (dx / dist) * force * 1.5;
            circle.y += (dy / dist) * force * 1.5;

            // Grow/shrink slightly when hovered
            scaleTarget = (1 + pulseFactor) * (1 + force * 0.18);
          }
        }

        circle.currentScale += (scaleTarget - circle.currentScale) * 0.1;

        // Render circle
        ctx.beginPath();
        const currentRadius = Math.max(5, circle.baseRadius * circle.currentScale);
        ctx.arc(circle.x, circle.y, currentRadius, 0, Math.PI * 2);
        
        // Convert to RGBA style colors
        ctx.fillStyle = circle.color;
        ctx.globalAlpha = circle.opacity;
        ctx.fill();
      });

      // Reset global alpha
      ctx.globalAlpha = 1.0;

      animationId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-25 md:opacity-30 mix-blend-multiply"
    >
      <canvas 
        ref={canvasRef} 
        className="block"
      />
    </div>
  );
}
