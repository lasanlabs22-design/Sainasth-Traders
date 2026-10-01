const paths = {
  menu: "M4 7h16M4 12h16M4 17h10",
  close: "M6 6l12 12M18 6L6 18",
  arrow: "M5 12h14M13 6l6 6-6 6",
  phone:
    "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  check: "M5 12.5l4.5 4.5L19 7.5",
  filter: "M4 6h16M7 12h10M10 18h4",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
  demo: "M3 10.5L12 4l9 6.5V20H3zM9 20v-6h6v6",
  install: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z",
  amc: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6zM9 12l2 2 4-4",
  rental: "M4 7h16v12H4zM8 7V5h8v2M4 12h16",
  training: "M3 9l9-5 9 5-9 5zM7 11.5V16c0 1.5 2.5 3 5 3s5-1.5 5-3v-4.5",
  spares: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z",
  cup: "M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3c-1 1.2 1 1.8 0 3M12 3c-1 1.2 1 1.8 0 3",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01",
  facebook: "M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z",
  youtube: "M3 8.5A3.5 3.5 0 0 1 6.5 5h11A3.5 3.5 0 0 1 21 8.5v7a3.5 3.5 0 0 1-3.5 3.5h-11A3.5 3.5 0 0 1 3 15.5zM10 9v6l5-3z",
} as const;

export type IconName = keyof typeof paths | "whatsapp";

export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
