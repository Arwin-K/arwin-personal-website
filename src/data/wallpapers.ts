export interface Wallpaper {
  id: string;
  name: string;
  src: string;
}

export const wallpapers: Wallpaper[] = [
  { id: "cloudbreak", name: "Cloudbreak Cliffs", src: "/wallpapers/cloudbreak.png" },
  { id: "amethyst-keep", name: "Amethyst Keep", src: "/wallpapers/amethyst-keep.png" },
  { id: "eclipse-shore", name: "Eclipse Shore", src: "/wallpapers/eclipse-shore.png" },
];

export const defaultWallpaperId = "eclipse-shore";

// Portrait wallpapers used exclusively by the phone (iPhone-style) UI.
export const phoneWallpapers: Wallpaper[] = [
  { id: "neon-skyline", name: "Neon Skyline", src: "/wallpapers/phone/neon-skyline.png" },
  { id: "hidden-falls", name: "Hidden Falls", src: "/wallpapers/phone/hidden-falls.png" },
  { id: "desert-sun", name: "Desert Sun", src: "/wallpapers/phone/desert-sun.png" },
];

export const defaultPhoneWallpaperId = "neon-skyline";
