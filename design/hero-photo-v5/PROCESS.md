# Original-photo Hero cutout

Source: `C:\Users\jovan\Downloads\WhatsApp Image 2026-10-13 at 10.41.54.jpeg`

The foreground was extracted with the portrait-specific `birefnet-portrait` segmentation model and mask post-processing. No generative image editing, retouching, color treatment, face reconstruction, clothing reconstruction, or lossy WebP conversion was used. The transparent result remains PNG.

The white comic border is baked from the final alpha mask with an antialiased 7 px expansion. This replaces the browser SVG morphology filter that caused stair-stepped shoulders.

Verification after trimming transparent padding:

- Source dimensions: 900 × 1600
- Website asset dimensions: 323 × 997
- Fully opaque foreground pixels compared: 159,399
- Exact RGB matches with the original JPEG: 159,399
- Changed foreground RGB pixels: 0
- Exact match: 100%
