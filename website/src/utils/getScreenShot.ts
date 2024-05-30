'use client';
import html2canvas from 'html2canvas';

export async function getScreenShot() {
  const iframe = document.getElementsByTagName('iframe');
  const screen = iframe[0]?.contentDocument?.getElementsByTagName('canvas')?.[0];
  // @ts-ignore
  const canvas = await html2canvas(screen);
  return canvas.toDataURL('image/png');
}