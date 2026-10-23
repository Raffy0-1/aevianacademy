import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Official LinkedIn Icon ("in") in authentic LinkedIn Blue (#0A66C2)
 */
export function LinkedInIcon({ className = "h-4 w-4", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#0A66C2"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <circle cx="4.983" cy="5.009" r="2.188" />
      <path d="M9.237 8.855v11.697h3.633v-6.195c0-1.634.31-3.218 2.333-3.218 1.995 0 2.019 1.866 2.019 3.321v6.092h3.633v-6.785c0-3.332-.716-5.897-4.614-5.897-1.872 0-3.125 1.028-3.638 2.001h-.05V8.855H9.237zM3.167 8.855h3.633v11.697H3.167z" />
    </svg>
  );
}

/**
 * Official Instagram Icon in authentic Brand Gradient (#F58529 -> #DD2A7B -> #8134AF -> #515BD4)
 */
export function InstagramIcon({ className = "h-4 w-4", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          id="instagram-real-gradient"
          cx="20%"
          cy="105%"
          r="135%"
          fx="20%"
          fy="105%"
        >
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="10%" stopColor="#fdf497" />
          <stop offset="50%" stopColor="#fd5949" />
          <stop offset="68%" stopColor="#d6249f" />
          <stop offset="100%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.5"
        stroke="url(#instagram-real-gradient)"
        strokeWidth="2.1"
      />
      <circle
        cx="12"
        cy="12"
        r="4.2"
        stroke="url(#instagram-real-gradient)"
        strokeWidth="2.1"
      />
      <circle
        cx="17.2"
        cy="6.8"
        r="1.2"
        fill="url(#instagram-real-gradient)"
      />
    </svg>
  );
}

/**
 * Official Email / Mail Icon in authentic Red (#EA4335)
 */
export function MailIcon({ className = "h-4 w-4", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <rect
        x="2.5"
        y="4.5"
        width="19"
        height="15"
        rx="3.5"
        stroke="#EA4335"
        strokeWidth="2"
      />
      <path
        d="M3.5 7.5L11.12 12.87C11.65 13.24 12.35 13.24 12.88 12.87L20.5 7.5"
        stroke="#EA4335"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Official Phone Call Handset Icon in authentic Call Green (#16A34A)
 */
export function PhoneIcon({ className = "h-4 w-4", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#16A34A"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.053 15.053 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.57 3.9c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.52c0-.55-.45-1-.99-1z" />
    </svg>
  );
}

/**
 * Official WhatsApp Icon in authentic WhatsApp Green (#25D366)
 */
export function WhatsAppIcon({ className = "h-4 w-4", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#25D366"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
