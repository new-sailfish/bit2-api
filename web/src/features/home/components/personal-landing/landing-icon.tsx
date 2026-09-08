/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
export type LandingIconName =
  | 'arrow'
  | 'book'
  | 'copy'
  | 'sparkle'
  | 'openai'
  | 'claude'
  | 'gemini'
  | 'shield'
  | 'models'
  | 'pie'
  | 'trend'
  | 'routing'
  | 'lock'
  | 'monitor'
  | 'scale'
  | 'customer-star'
  | 'customer-sun'
  | 'customer-hex'
  | 'github'
  | 'x'
  | 'linkedin'
  | 'globe'

type LandingIconProps = {
  name: LandingIconName
}

export function LandingIcon(props: LandingIconProps) {
  if (props.name === 'arrow') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden>
        <path d='M5 12h13m-4-5 5 5-5 5' />
      </svg>
    )
  }
  if (props.name === 'book') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden>
        <path d='M4 5.2c2.8-.7 5-.3 6.6 1.1V19c-1.6-1.3-3.8-1.7-6.6-1.1V5.2Zm16 0c-2.8-.7-5-.3-6.6 1.1V19c1.6-1.3 3.8-1.7 6.6-1.1V5.2Z' />
      </svg>
    )
  }
  if (props.name === 'copy') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden>
        <rect x='8' y='8' width='11' height='11' rx='2' />
        <path d='M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8' />
      </svg>
    )
  }
  if (props.name === 'sparkle' || props.name === 'gemini') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden>
        <path
          d='M12 2.8c.55 3.55 2.55 5.55 6.1 6.1-3.55.55-5.55 2.55-6.1 6.1-.55-3.55-2.55-5.55-6.1-6.1 3.55-.55 5.55-2.55 6.1-6.1Z'
          fill='currentColor'
        />
        <path
          d='M18.4 15.2c.27 1.7 1.23 2.67 2.94 2.94-1.71.27-2.67 1.23-2.94 2.94-.27-1.71-1.23-2.67-2.94-2.94 1.71-.27 2.67-1.23 2.94-2.94Z'
          fill='currentColor'
          opacity='.65'
        />
      </svg>
    )
  }
  if (props.name === 'openai') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden>
        <circle cx='12' cy='7' r='3.2' />
        <circle cx='16.3' cy='9.5' r='3.2' />
        <circle cx='16.3' cy='14.5' r='3.2' />
        <circle cx='12' cy='17' r='3.2' />
        <circle cx='7.7' cy='14.5' r='3.2' />
        <circle cx='7.7' cy='9.5' r='3.2' />
      </svg>
    )
  }
  if (props.name === 'claude') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden>
        <rect
          x='4.2'
          y='4.2'
          width='15.6'
          height='15.6'
          rx='4'
          fill='#f1e1cf'
          stroke='none'
        />
        <path
          d='m8.2 16 3.6-8h1.1l3.5 8h-1.9l-.75-1.9h-3l-.76 1.9H8.2Zm3.1-3.4h1.9L12.25 10l-.95 2.6Z'
          fill='#5a3825'
          stroke='none'
        />
      </svg>
    )
  }
  if (props.name === 'shield') {
    return <ShieldIcon />
  }
  if (props.name === 'models') {
    return <ModelsIcon />
  }
  if (props.name === 'pie') {
    return <PieIcon />
  }
  if (props.name === 'trend') {
    return <TrendIcon />
  }
  if (props.name === 'routing') {
    return <RoutingIcon />
  }
  if (props.name === 'lock') {
    return <LockIcon />
  }
  if (props.name === 'monitor') {
    return <MonitorIcon />
  }
  if (props.name === 'scale') {
    return <ScaleIcon />
  }
  if (props.name === 'customer-star') {
    return <CustomerStarIcon />
  }
  if (props.name === 'customer-sun') {
    return <CustomerSunIcon />
  }
  if (props.name === 'customer-hex') {
    return <CustomerHexIcon />
  }
  if (props.name === 'github') {
    return <GithubIcon />
  }
  if (props.name === 'x') {
    return <XIcon />
  }
  if (props.name === 'linkedin') {
    return <LinkedinIcon />
  }
  return <GlobeIcon />
}

function ShieldIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden>
      <path d='M12 3.2 19 6v5.4c0 4.35-2.6 7.45-7 9.4-4.4-1.95-7-5.05-7-9.4V6l7-2.8Z' />
      <path d='m8.8 12 2.05 2.05 4.4-4.45' />
    </svg>
  )
}

function ModelsIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden>
      <path d='m12 3 7 4v8l-7 4-7-4V7l7-4Z' />
      <path d='m5.3 7.2 6.7 3.9 6.7-3.9M12 11.1V19' />
    </svg>
  )
}

function PieIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden>
      <path d='M12 3a9 9 0 1 0 9 9h-9V3Z' />
      <path d='M15 3.7A8.95 8.95 0 0 1 20.3 9H15V3.7Z' />
    </svg>
  )
}

function TrendIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden>
      <path d='m5 16 4.2-4.4 3.3 2.8L19 7.7M14.8 7.7H19V12' />
    </svg>
  )
}

function RoutingIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden>
      <circle cx='12' cy='5' r='2.1' />
      <circle cx='5' cy='12' r='2.1' />
      <circle cx='19' cy='12' r='2.1' />
      <circle cx='12' cy='19' r='2.1' />
      <path d='m10.6 6.5-4 4m6.8-4 4 4m-10.5 3 3.7 4m6.5-4-3.7 4' />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden>
      <rect x='5' y='10' width='14' height='10' rx='2.5' />
      <path d='M8.5 10V7.5A3.5 3.5 0 0 1 12 4a3.5 3.5 0 0 1 3.5 3.5V10M12 14v2.5' />
    </svg>
  )
}

function MonitorIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden>
      <rect x='3.5' y='4.5' width='17' height='12' rx='2.2' />
      <path d='M7 11h2.4l1.25-3 2.3 6 1.45-3H17M9 20h6m-3-3.5V20' />
    </svg>
  )
}

function ScaleIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden>
      <rect x='4' y='4' width='16' height='5' rx='1.6' />
      <rect x='4' y='10' width='16' height='5' rx='1.6' />
      <rect x='4' y='16' width='16' height='4' rx='1.6' />
      <circle cx='7' cy='6.5' r='.8' fill='currentColor' stroke='none' />
      <circle cx='7' cy='12.5' r='.8' fill='currentColor' stroke='none' />
      <circle cx='7' cy='18' r='.8' fill='currentColor' stroke='none' />
    </svg>
  )
}

function CustomerStarIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden>
      <path
        d='M12 3.5 15 8l5.3 1-3.65 3.9.7 5.3L12 16l-5.35 2.2.7-5.3L3.7 9 9 8l3-4.5Z'
        fill='currentColor'
        stroke='none'
      />
    </svg>
  )
}

function CustomerSunIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden>
      <path
        d='M12 3.5c2 0 3.2 2.4 4.4 3.3 1.3 1 4 .8 4.6 2.8.6 1.9-1.6 3.4-2.1 4.9-.5 1.7.4 4.1-1.3 5.2-1.7 1.1-3.7-.4-5.6-.4s-3.9 1.5-5.6.4c-1.7-1.1-.8-3.5-1.3-5.2-.5-1.5-2.7-3-2.1-4.9.6-2 3.3-1.8 4.6-2.8C8.8 5.9 10 3.5 12 3.5Z'
        fill='currentColor'
        stroke='none'
      />
      <circle cx='12' cy='12' r='3.5' fill='white' stroke='none' opacity='.9' />
    </svg>
  )
}

function CustomerHexIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden>
      <path d='M12 3.5 18.5 7v9L12 20.5 5.5 16V7L12 3.5Z' />
      <path d='M9 12h2l1-2 1.4 4 1-2H17' />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden>
      <path
        d='M12 3.5a8.5 8.5 0 0 0-2.7 16.56c.43.08.58-.18.58-.41v-1.6c-2.37.52-2.87-1.02-2.87-1.02-.39-.98-.95-1.24-.95-1.24-.78-.53.06-.52.06-.52.86.06 1.31.88 1.31.88.76 1.31 2 .93 2.49.71.08-.55.3-.93.54-1.14-1.89-.22-3.88-.95-3.88-4.2 0-.93.33-1.69.88-2.29-.09-.22-.38-1.08.08-2.25 0 0 .72-.23 2.34.87A8.1 8.1 0 0 1 12 7.56c.72 0 1.44.1 2.12.29 1.62-1.1 2.34-.87 2.34-.87.46 1.17.17 2.03.08 2.25.55.6.88 1.36.88 2.29 0 3.26-2 3.97-3.9 4.19.31.27.58.79.58 1.6v2.34c0 .23.16.49.59.41A8.5 8.5 0 0 0 12 3.5Z'
        fill='currentColor'
        stroke='none'
      />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden>
      <path d='M5 5 19 19M19 5 5 19' />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden>
      <rect
        x='4'
        y='9'
        width='3'
        height='10'
        rx='1'
        fill='currentColor'
        stroke='none'
      />
      <circle cx='5.5' cy='5.5' r='1.7' fill='currentColor' stroke='none' />
      <path
        d='M10 19V9h3v1.6c1-1.3 2.2-1.9 3.6-1.9 2.4 0 3.9 1.6 3.9 4.7V19h-3v-5c0-1.7-.6-2.6-1.9-2.6-1.5 0-2.6 1-2.6 3V19h-3Z'
        fill='currentColor'
        stroke='none'
      />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden>
      <circle cx='12' cy='12' r='8.5' />
      <path d='M7 5.6c3.6 3.5 6 7.8 7.4 13.1M4.2 10.2c4.8.2 9.1-.9 12.8-3.5M7.2 18.3c2.8-3.5 6.9-5.2 12.1-5.1' />
    </svg>
  )
}
