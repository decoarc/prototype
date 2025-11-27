import React, { useRef, useState, useEffect } from "react";
import "./Skills.css";

interface Skill {
  name: string;
  category: string;
}

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => (
  <div className="skill-card">
    <div className="skill-icon">
      <span>{skill.name.charAt(0)}</span>
    </div>
    <h3 className="skill-name">{skill.name}</h3>
    <span className="skill-category">{skill.category}</span>
  </div>
);

const Skills: React.FC = () => {
  const skills: Skill[] = [
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "JavaScript", category: "Frontend" },
    { name: "HTML/CSS", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "Vue.js", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Backend" },
    { name: "Express", category: "Backend" },
    { name: "MongoDB", category: "Backend" },
    { name: "PostgreSQL", category: "Backend" },
    { name: "Git", category: "Tools" },
    { name: "Docker", category: "Tools" },
    { name: "AWS", category: "Tools" },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrollingRef = useRef(false);

  const cardWidth = 300;
  const gap = 30;
  const cardSpacing = cardWidth + gap;
  const trackPadding = 20;

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do scroll
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch handlers para mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Inicializar scroll para posição do meio (cards originais)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Calcular posição inicial (início dos cards originais)
    const containerWidth = container.clientWidth;
    const containerCenter = containerWidth / 2;
    const originalStart = trackPadding + skills.length * cardSpacing;
    const startPosition = originalStart + containerCenter - cardWidth / 2;

    container.scrollLeft = startPosition;
  }, []);

  // Atualizar transformações 3D dos cards baseado no scroll e gerenciar loop infinito
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const updateCarousel = () => {
      if (isScrollingRef.current) return;

      const cards = track.querySelectorAll(
        ".skill-card"
      ) as NodeListOf<HTMLElement>;
      const containerWidth = container.clientWidth;
      const containerCenter = containerWidth / 2;
      const currentScrollLeft = container.scrollLeft;

      // Calcular limites para loop infinito
      const originalStart = trackPadding + skills.length * cardSpacing; // início dos cards originais
      const originalEnd = trackPadding + skills.length * 2 * cardSpacing; // fim dos cards originais

      // Loop infinito: se chegou no fim dos cards originais ou além, volta para início
      if (currentScrollLeft >= originalEnd) {
        isScrollingRef.current = true;
        // Desabilitar smooth scroll temporariamente para fazer o jump instantâneo
        const originalScrollBehavior = container.style.scrollBehavior;
        container.style.scrollBehavior = "auto";

        const excess = currentScrollLeft - originalEnd;
        const newPosition = originalStart + excess;

        // Fazer o reposicionamento instantâneo
        container.scrollLeft = newPosition;

        // Restaurar smooth scroll após um frame
        requestAnimationFrame(() => {
          container.style.scrollBehavior = originalScrollBehavior || "smooth";
          isScrollingRef.current = false;
        });
        return;
      }

      // Loop infinito: se chegou antes dos cards originais, volta para fim
      if (currentScrollLeft < originalStart) {
        isScrollingRef.current = true;
        // Desabilitar smooth scroll temporariamente
        const originalScrollBehavior = container.style.scrollBehavior;
        container.style.scrollBehavior = "auto";

        const excess = originalStart - currentScrollLeft;
        const newPosition = originalEnd - excess;

        // Fazer o reposicionamento instantâneo
        container.scrollLeft = newPosition;

        // Restaurar smooth scroll após um frame
        requestAnimationFrame(() => {
          container.style.scrollBehavior = originalScrollBehavior || "smooth";
          isScrollingRef.current = false;
        });
        return;
      }

      cards.forEach((card, index) => {
        // Calcular posição do card no track
        const cardLeft = trackPadding + index * cardSpacing;
        const cardCenter = cardLeft + cardWidth / 2;

        // Posição relativa ao centro do viewport
        const viewportCenter = currentScrollLeft + containerCenter;
        const distanceFromCenter = cardCenter - viewportCenter;

        // Normalizar a distância (-1 a 1)
        const normalizedDistance = distanceFromCenter / (containerWidth / 2);

        // Calcular rotação e profundidade baseado na distância do centro
        const maxRotation = 50; // graus máximos de rotação
        const rotation = normalizedDistance * maxRotation;

        // Profundidade 3D (raio do carrossel)
        const radius = 200; // raio do carrossel em pixels
        const depth =
          Math.cos((normalizedDistance * Math.PI) / 2) * radius - radius;

        // Escala baseada na distância (cards no centro são maiores)
        const scale = 0.7 + (1 - Math.abs(normalizedDistance)) * 0.3;

        // Opacidade baseada na distância
        const opacity = 0.4 + (1 - Math.abs(normalizedDistance)) * 0.6;

        // Aplicar transformações 3D
        card.style.transform = `
          rotateY(${-rotation}deg) 
          translateZ(${depth}px) 
          scale(${scale})
        `;
        card.style.opacity = `${opacity}`;
      });

      // Atualizar índice atual (considerando apenas cards originais)
      let scrollPos = currentScrollLeft;

      // Se estamos nos duplicados à direita, calcular como se estivéssemos no início
      if (scrollPos >= originalEnd) {
        scrollPos = originalStart + (scrollPos - originalEnd);
      }
      // Se estamos nos duplicados à esquerda, calcular como se estivéssemos no fim
      else if (scrollPos < originalStart) {
        scrollPos = originalEnd - (originalStart - scrollPos);
      }

      const relativePosition = scrollPos - originalStart;
      const index = Math.round(relativePosition / cardSpacing);
      const normalizedIndex =
        ((index % skills.length) + skills.length) % skills.length;
      setCurrentIndex(normalizedIndex);
    };

    // Usar requestAnimationFrame para suavizar as animações
    let animationFrameId: number;
    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(updateCarousel);
    };

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateCarousel);
    updateCarousel(); // Inicializar

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCarousel);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <h2 className="skills-title">Skills & Technologies</h2>
        <p className="skills-subtitle">Drag to explore</p>

        <div
          ref={containerRef}
          className="skills-carousel"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div ref={trackRef} className="skills-track">
            {/* Cards duplicados à esquerda (cópias dos últimos) - para scroll infinito à esquerda */}
            {skills.map((skill, index) => (
              <SkillCard key={`left-${index}`} skill={skill} />
            ))}
            {/* Cards originais */}
            {skills.map((skill, index) => (
              <SkillCard key={`original-${index}`} skill={skill} />
            ))}
            {/* Cards duplicados à direita (cópias dos primeiros) - para scroll infinito à direita */}
            {skills.map((skill, index) => (
              <SkillCard key={`right-${index}`} skill={skill} />
            ))}
          </div>
        </div>

        {/* Indicadores de posição */}
        <div className="skills-indicators">
          {skills.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
