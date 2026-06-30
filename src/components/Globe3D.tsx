import { useEffect, useRef } from 'react';

export default function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false, startX: 0, startY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    let animationId: number;

    const updateSize = () => {
      width = canvas.parentElement?.clientWidth || 450;
      height = canvas.parentElement?.clientHeight || 450;
      canvas.width = width;
      canvas.height = height;
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    updateSize();

    // Generate points on a sphere (latitude & longitude)
    const points: { x3d: number; y3d: number; z3d: number }[] = [];
    const sphereRadius = Math.min(width, height) * 0.38;
    const numPoints = 280;

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;

      points.push({
        x3d: sphereRadius * Math.sin(phi) * Math.cos(theta),
        y3d: sphereRadius * Math.sin(phi) * Math.sin(theta),
        z3d: sphereRadius * Math.cos(phi),
      });
    }

    // Dynamic neon glowing rings / arcs
    const arcs: { start: number; end: number; progress: number; speed: number; color: string }[] = [
      { start: 10, end: 85, progress: 0, speed: 0.02, color: '#38bdf8' },
      { start: 50, end: 150, progress: 0, speed: 0.015, color: '#a78bfa' },
      { start: 120, end: 240, progress: 0, speed: 0.01, color: '#ec4899' },
    ];

    // Mouse Drag listeners
    const onMouseDown = (e: MouseEvent) => {
      rotationRef.current.isDragging = true;
      rotationRef.current.startX = e.clientX;
      rotationRef.current.startY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!rotationRef.current.isDragging) return;
      const dx = e.clientX - rotationRef.current.startX;
      const dy = e.clientY - rotationRef.current.startY;
      rotationRef.current.targetY += dx * 0.005;
      rotationRef.current.targetX -= dy * 0.005;
      rotationRef.current.startX = e.clientX;
      rotationRef.current.startY = e.clientY;
    };

    const onMouseUp = () => {
      rotationRef.current.isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const animate = () => {
      const rot = rotationRef.current;
      // Auto rotate when not dragging
      if (!rot.isDragging) {
        rot.targetY += 0.003;
      }

      // Smooth interpolation (damping)
      rot.x += (rot.targetX - rot.x) * 0.1;
      rot.y += (rot.targetY - rot.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // Radial glowing aura behind globe
      const aura = ctx.createRadialGradient(
        width / 2,
        height / 2,
        sphereRadius * 0.6,
        width / 2,
        height / 2,
        sphereRadius * 1.5
      );
      aura.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
      aura.addColorStop(0.5, 'rgba(167, 139, 250, 0.03)');
      aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Project and render points
      const projectedPoints: { x: number; y: number; z: number; size: number }[] = [];

      points.forEach((pt) => {
        // Rotate around X-axis
        let x1 = pt.x3d;
        let y1 = pt.y3d * Math.cos(rot.x) - pt.z3d * Math.sin(rot.x);
        let z1 = pt.y3d * Math.sin(rot.x) + pt.z3d * Math.cos(rot.x);

        // Rotate around Y-axis
        let x2 = x1 * Math.cos(rot.y) + z1 * Math.sin(rot.y);
        let y2 = y1;
        let z2 = -x1 * Math.sin(rot.y) + z1 * Math.cos(rot.y);

        // Perspective scaling
        const k = 1.3;
        const scale = k / (k - z2 / sphereRadius);

        projectedPoints.push({
          x: cx + x2 * scale,
          y: cy + y2 * scale,
          z: z2,
          size: scale * (z2 > 0 ? 2.5 : 1.2),
        });
      });

      // Render links for points on the same hemisphere (create mesh lines)
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.05)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedPoints.length; i++) {
        const p1 = projectedPoints[i];
        if (p1.z < 0) continue; // Skip backside for clarity
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p2 = projectedPoints[j];
          if (p2.z < 0) continue;

          // Only draw close connections to form clusters
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < sphereRadius * 0.35) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw the globe dots
      projectedPoints.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.z > 0) {
          // Frontside glowing dots
          ctx.fillStyle = `rgba(129, 140, 248, ${0.4 + (p.z / sphereRadius) * 0.6})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#6366f1';
        } else {
          // Backside dim dots
          ctx.fillStyle = 'rgba(75, 85, 99, 0.15)';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });

      ctx.shadowBlur = 0; // reset shadows

      // Draw glowing connectivity arcs (neon network rays)
      arcs.forEach((arc) => {
        arc.progress += arc.speed;
        if (arc.progress > 1) {
          arc.progress = 0;
        }

        const p1 = projectedPoints[arc.start];
        const p2 = projectedPoints[arc.end];

        if (p1 && p2 && p1.z > -10 && p2.z > -10) {
          // Midpoint logic for arc bezier curve
          const mx = (p1.x + p2.x) / 2;
          const my = (p1.y + p2.y) / 2 - sphereRadius * 0.25;

          // Draw neon background line
          ctx.strokeStyle = arc.color;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 6;
          ctx.shadowColor = arc.color;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(mx, my, p2.x, p2.y);
          ctx.stroke();

          // Draw the pulsing particle along the path
          const t = arc.progress;
          const px = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * mx + t * t * p2.x;
          const py = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * my + t * t * p2.y;

          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#ffffff';
          ctx.fill();
        }
      });

      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div id="globe-parent" className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing">
      <canvas ref={canvasRef} className="block select-none pointer-events-auto" />
    </div>
  );
}
