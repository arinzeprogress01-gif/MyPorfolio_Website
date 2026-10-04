import { useEffect, useState } from 'react'
import { cn } from '../../lib/cn'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import { portfolioPreview } from './data/portfolioPreview'
import ProfileCard from './pathCards/ProfileCard'
import CredentialsCard from './pathCards/CredentialsCard'
import ProjectCard from './pathCards/ProjectCard'

const ROTATE_EVERY = 5500 // milliseconds

// Order matters: first = front, second = behind-right, third = behind-left
const cards = [
  { id: 'profile', label: "Daniel's profile", tone: 'light', Content: ProfileCard, data: portfolioPreview.profile },
  { id: 'credentials', label: "Daniel's credentials", tone: 'light', Content: CredentialsCard, data: portfolioPreview.credentials },
  { id: 'project', label: "Daniel's featured project", tone: 'dark', Content: ProjectCard, data: portfolioPreview.project },
]

const tones = {
  light: 'border border-border bg-card text-card-foreground',
  dark: 'bg-primary text-primary-foreground',
}

// side: -1 = left, 0 = front, 1 = right
const slots = [
  { side: 0, y: 0, rotate: 0, scale: 1, z: 30 },
  { side: 1, y: 3, rotate: 5, scale: 0.9, z: 20 },
  { side: -1, y: 3, rotate: -5, scale: 0.9, z: 10 },
]

export default function PathCardsStack() {
  const [active, setActive] = useState(0)
  const [engaged, setEngaged] = useState(false) // true while hovering or focusing
  const reducedMotion = usePrefersReducedMotion()
  const count = cards.length

  useEffect(() => {
    if (engaged || reducedMotion) return
    const timer = setTimeout(() => setActive((current) => (current + 1) % count), ROTATE_EVERY)
    return () => clearTimeout(timer)
  }, [active, engaged, reducedMotion, count])

  return (
    <div
      className="mx-auto w-full max-w-xl"
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={() => setEngaged(false)}
    >
      {/* All cards share one grid cell, so the height follows the tallest card */}
      <div className="grid grid-cols-1 py-6 [--side:30] sm:[--side:38]">
        {cards.map((card, index) => {
          const position = (index - active + count) % count // 0 = front
          const slot = slots[position]
          const isFront = position === 0
          const spreadX = engaged ? slot.side * 8 : 0
          const spreadRotate = engaged ? slot.side * 2 : 0

          return (
            <div
              key={card.id}
              className="col-start-1 row-start-1 w-[64%] justify-self-center transition-transform duration-700 ease-out motion-reduce:transition-none sm:w-[56%]"
              style={{
                zIndex: slot.z,
                transform: `translate(calc(${slot.side} * var(--side) * 1% + ${spreadX}%), ${slot.y}%) rotate(${slot.rotate + spreadRotate}deg) scale(${slot.scale})`,
              }}
            >
              <article
                className={cn(
                  'relative h-full animate-float rounded-3xl p-5 transition-shadow duration-700 motion-reduce:animate-none sm:p-6',
                  tones[card.tone],
                  isFront ? 'shadow-premium' : 'shadow-float'
                )}
                style={{ animationDelay: `${-index * 2}s` }}
              >
                <card.Content data={card.data} />

                {!isFront && (
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Show ${card.label}`}
                    className="absolute inset-0 z-10 cursor-pointer rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  />
                )}
              </article>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex justify-center gap-2" role="group" aria-label="Choose a portfolio card">
        {cards.map((card, index) => (
          <button
            key={card.id}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show ${card.label}`}
            aria-current={index === active}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              index === active ? 'w-8 bg-accent' : 'w-2 bg-border hover:bg-accent-bright'
            )}
          />
        ))}
      </div>
    </div>
  )
}