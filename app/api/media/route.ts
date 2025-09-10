import { NextRequest, NextResponse } from "next/server";

// Video clips in the gallery, now including media5, media6, and media7
const mediaGallery = [
  { src: "/media/media1.MP4", thumb: "/media/media1.png" },
  { src: "/media/media2.MP4", thumb: "/media/media2.png" },
  { src: "/media/media3.MP4", thumb: "/media/media3.png" },
  { src: "/media/media4.MP4", thumb: "/media/media4.png" },
  { src: "/media/media5.MP4", thumb: "/media/media5.png" },
  { src: "/media/media6.MP4", thumb: "/media/media6.png" },
  { src: "/media/media7.MP4", thumb: "/media/media7.png" },
];

export async function GET() {
  return NextResponse.json({ gallery: mediaGallery });
}
