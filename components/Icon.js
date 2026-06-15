"use client";
export const Icon = ({ name, ...p }) => {
  const icons = {
    flame: <path d="M12 2s4 4 4 8a4 4 0 1 1-8 0c0-1 .5-2 .5-2S6 11 6 14a6 6 0 0 0 12 0c0-5-6-12-6-12z" />,
    bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6z" />,
    heart: <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5 6 5c2 0 3 1.2 3.8 2.3C10.6 6.2 11.7 5 13.8 5 17.3 5 19 9 21.5 12 19 16.5 12 21 12 21z" />,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15 9-4 1-2 5 4-1z" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></>,
    doc: <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v4h4" /></>,
    brain: <path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 2 5 3 3 0 0 0 5 1 3 3 0 0 0 5-1 3 3 0 0 0 2-5 3 3 0 0 0-1-5 3 3 0 0 0-3-3 3 3 0 0 0-3 1 3 3 0 0 0-3-1z" />,
    layers: <><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></>,
    robot: <><rect x="5" y="8" width="14" height="11" rx="3" /><path d="M12 8V4M9 13h.01M15 13h.01M3 13v3M21 13v3" /></>,
    spark: <path d="M12 2v6m0 8v6M2 12h6m8 0h6M5 5l4 4m6 6 4 4M19 5l-4 4m-6 6-4 4" />,
    rocket: <path d="M5 15c-2 2-2 5-2 5s3 0 5-2m6-12c3-1 6 0 6 0s1 3 0 6c-1 3-7 8-9 8l-3-3c0-2 5-8 8-9z" />,
    book: <><path d="M4 4h9a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z" /><path d="M20 4h-3a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h3z" /></>,
    map: <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" />,
    pencil: <path d="m4 20 1-4L16 5l3 3L8 19z" />,
    chart: <><path d="M4 20V10M10 20V4M16 20v-6M22 20H2" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
    lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
    google: <path d="M21 12.2c0-.7-.1-1.3-.2-2H12v3.8h5.1a4.4 4.4 0 0 1-1.9 2.9v2.4h3.1c1.8-1.7 2.7-4.1 2.7-7.1z M12 22c2.4 0 4.5-.8 6-2.2l-3.1-2.4c-.8.6-1.9.9-2.9.9-2.3 0-4.2-1.5-4.9-3.6H3.9v2.5A9 9 0 0 0 12 22z M7.1 13.7a5.4 5.4 0 0 1 0-3.4V7.8H3.9a9 9 0 0 0 0 8.4z M12 6.6c1.3 0 2.4.4 3.4 1.3l2.5-2.5A9 9 0 0 0 3.9 7.8l3.2 2.5C7.8 8.1 9.7 6.6 12 6.6z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <path d="m5 12 5 5 9-11" />,
  };
  const stroked = ["compass","search","target","doc","brain","layers","robot","spark","rocket","book","map","pencil","chart","user","lock","clock","check"];
  const isStroked = stroked.includes(name);
  return (
    <svg viewBox="0 0 24 24" fill={isStroked ? "none" : "currentColor"}
      stroke={isStroked ? "currentColor" : "none"} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      {icons[name] || null}
    </svg>
  );
};
