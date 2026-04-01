export interface ImageMeta {
  src: string;
  title: string;
  caption?: string;
}

export const imagesData: ImageMeta[] = [
  { src: '/images/1.jpg', title: 'toronto.jpg', caption: '' },
  { src: '/images/2.jpg', title: 'my_dog.jpg', caption: '' },
  { src: '/images/3.jpg', title: 'night.jpg', caption: '' },
  { src: '/images/4.png', title: 'jamhacks9.png', caption: 'me (second from left)' },
  { src: '/images/5.jpg', title: 'hawkhacks2024.jpg', caption: 'me (in the red shirt)' },
];
