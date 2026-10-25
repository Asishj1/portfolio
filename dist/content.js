/* Replace this manifest with verified projects before public launch.
   Demo titles describe illustrative layouts, never real client work. */
window.PORTFOLIO = {
  name: 'Frame by Frame', // Working identity; replace with your name or studio.
  email: null, // Add a verified public address to enable the contact button.
  categories: [
    { name: 'SaaS', count: 2 }, { name: 'CGI', count: 6 },
    { name: 'AI', count: 8 }, { name: 'Explainer', count: 2 },
    { name: 'Motion Graphics', count: 5 }, { name: 'Promotional Ads', count: 6 }
  ],
  media: {
    reel: { url: './assets/sintel-trailer.mp4', credit: 'Sintel trailer © Blender Foundation · CC BY 3.0', source: 'https://durian.blender.org/' },
    flower: { url: './assets/flower.mp4', credit: 'MDN CC0 flower sample', source: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
    joy: { url: './assets/bunny-trailer.mp4', credit: 'Big Buck Bunny trailer © Blender Foundation · CC BY 3.0', source: 'https://peach.blender.org/' }
  },
  // Remote stock images are used only as labeled demonstration artwork.
  images: {
    mountains: './assets/mountains.jpg',
    desert: './assets/desert.jpg',
    forest: './assets/forest.jpg',
    sea: './assets/sea.jpg',
    flower: './assets/flower.jpg'
  },
  featured: [
    { id: 'cgi-01', category: 'CGI', title: 'Beyond the ordinary', subtitle: 'CGI / VISUAL EXPLORATION', image: 'desert', alternate: 'mountains', style: 'cgi', media: 'reel', overlay: 'OTHER<br><em>worlds.</em>' },
    { id: 'saas-01', category: 'SaaS', title: 'A clearer flow', subtitle: 'SAAS / PRODUCT IN MOTION', image: 'mountains', style: 'saas', media: 'reel' },
    { id: 'ai-01', category: 'AI', title: 'Somewhere, imagined', subtitle: 'AI / VISUAL EXPLORATION', image: 'forest', alternate: 'flower', style: 'ai', media: 'flower', overlay: '<em>Somewhere,</em><br>imagined.' },
    { id: 'motion-01', category: 'Motion Graphics', title: 'Playing with perspective', subtitle: 'MOTION GRAPHICS / FORM & RHYTHM', image: 'desert', style: 'motion', media: 'flower', overlay: 'MAKE<br><em>moves.</em>' },
    { id: 'promo-01', category: 'Promotional Ads', title: 'Into the feeling', subtitle: 'PROMOTIONAL ADS / EDIT & PACE', image: 'sea', alternate: 'mountains', style: 'promo', media: 'joy', overlay: '<em>Into the</em><br>feeling.' },
    { id: 'explainer-01', category: 'Explainer', title: 'The simple things', subtitle: 'EXPLAINER / CLARITY IN MOTION', image: 'flower', style: 'explainer', media: 'flower', overlay: 'A little less.<br><em>A lot more.</em>' }
  ]
};
