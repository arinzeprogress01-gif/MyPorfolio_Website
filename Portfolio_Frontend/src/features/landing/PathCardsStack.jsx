import { useEffect, useState } from 'react'
import { cn } from '../../lib/cn'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import { pathCards } from './data/pathCards'

const ROTATE_EVERY = 4500 // milliseconds

// Where a card sits depending on its turn: front, behind-right, behind-left
const slots = [
  { x: 0, y: 0, rotate: 0, scale: 1, z: 30 },
  { x: 32, y: 6, rotate: 6, scale: 0.9, z: 20 },
  { x: -32, y: 6, rotate: -6, scale: 0.9, z: 10 },
]

export default function PathCardsStack() {
  const [active, setActive] = useState(0)
  const [engaged, setEngaged] = useState(false) // true while hovering or focusing
  const reducedMotion = usePrefersReducedMotion()
  const count = pathCards.length

  // Every few seconds, bring the next card to the front
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
      <div className="relative h-[26rem] overflow-x-clip sm:h-[28rem]">
        {pathCards.map((card, index) => {
          const position = (index - active + count) % count // 0 = front
          const slot = slots[position]
          const isFront = position === 0
          const side = Math.sign(slot.x) // -1 left, 0 front, 1 right
          const spreadX = engaged ? side * 8 : 0
          const spreadRotate = engaged ? side * 2 : 0

          return (
            <div
              key={card.id}
              className="absolute left-[14%] top-0 w-[72%] transition-transform duration-700 ease-out motion-reduce:transition-none sm:left-[18%] sm:w-[64%]"
              style={{
                zIndex: slot.z,
                transform: `translate(${slot.x + spreadX}%, ${slot.y}%) rotate(${slot.rotate + spreadRotate}deg) scale(${slot.scale})`,
              }}
            >
              <article
                className={cn(
                  'relative animate-float rounded-3xl border border-border bg-card p-5 transition-shadow duration-700 motion-reduce:animate-none sm:p-6',
                  isFront ? 'shadow-premium' : 'shadow-soft'
                )}
                style={{ animationDelay: `${-index * 2}s` }}
              >
                <span
                  className={cn(
                    'flex size-14 items-center justify-center rounded-full font-display text-lg font-bold',
                    card.badge
                  )}
                >
                  {card.initials}
                </span>

                <h3 className="mt-4 font-display text-xl font-bold text-primary">{card.name}</h3>
                <p className="text-xs text-muted-foreground">{card.role}</p>

                <hr className="my-4 border-border" />

                <p className="text-xs leading-relaxed text-muted-foreground">{card.summary}</p>

                <dl className="mt-5 grid grid-cols-3 text-center">
                  {card.stats.map(({ value, label }) => (
                    <div key={label}>
                      <dd className="font-display text-lg font-bold text-foreground">{value}</dd>
                      <dt className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {label}
                      </dt>
                    </div>
                  ))}
                </dl>

                {/* Clicking a card at the back brings it to the front */}
                {!isFront && (
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Show ${card.name}'s portfolio card`}
                    className="absolute inset-0 z-10 cursor-pointer rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  />
                )}
              </article>
            </div>
          )
        })}
      </div>

      {/* Dots: show which card is in front, and let people jump to one */}
      <div className="mt-6 flex justify-center gap-2" role="group" aria-label="Choose a portfolio card">
        {pathCards.map((card, index) => (
          <button
            key={card.id}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show ${card.name}`}
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