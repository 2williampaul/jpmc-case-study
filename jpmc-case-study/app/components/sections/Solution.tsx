"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BentoGrid } from "../ui/bento-grid";

// All photos from SNAPS folder - Asymmetric bento layout
// Breaking predictable patterns for organic, flowing layout
const snapsImages = [
  // Start: Large left (2x2), 2 small right
  {
    id: 1,
    src: "/SNAPS/IMG_20180623_164237.webp",
    alt: "Travel photo",
    colSpan: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1 sm:row-span-2 md:row-span-2 lg:row-span-2",
  },
  {
    id: 2,
    src: "/SNAPS/IMG_20190103_033550_279.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 3,
    src: "/SNAPS/IMG_20190519_225103_181.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  // Break pattern: 2 small left, large right (2x2)
  {
    id: 4,
    src: "/SNAPS/IMG_20190608_224319_697.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 5,
    src: "/SNAPS/IMG_20191002_121800_916.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 6,
    src: "/SNAPS/IMG_20200508_104424-EFFECTS.webp",
    alt: "Travel photo",
    colSpan: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1 sm:row-span-2 md:row-span-2 lg:row-span-2",
  },
  // Variation: 4 small photos in a row
  {
    id: 7,
    src: "/SNAPS/IMG_20200516_153417.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 8,
    src: "/SNAPS/IMG_20200607_142600-EFFECTS.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 9,
    src: "/SNAPS/IMG_20200711_092943.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 10,
    src: "/SNAPS/IMG_20200727_193921_101.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  // Large left (2x2), 2 small right
  {
    id: 11,
    src: "/SNAPS/IMG_20210828_105354_2.webp",
    alt: "Travel photo",
    colSpan: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1 sm:row-span-2 md:row-span-2 lg:row-span-2",
  },
  {
    id: 12,
    src: "/SNAPS/IMG_20210909_171352.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 13,
    src: "/SNAPS/IMG_20220529_092034.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  // Break: 1 small, large right (2x2), 1 small
  {
    id: 14,
    src: "/SNAPS/IMG_20220617_115620.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 15,
    src: "/SNAPS/IMG_20220624_143919.webp",
    alt: "Travel photo",
    colSpan: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1 sm:row-span-2 md:row-span-2 lg:row-span-2",
  },
  {
    id: 16,
    src: "/SNAPS/IMG_20220912_194214.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  // Large left (2x2), 3 small right
  {
    id: 17,
    src: "/SNAPS/IMG_20220929_183737.webp",
    alt: "Travel photo",
    colSpan: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1 sm:row-span-2 md:row-span-2 lg:row-span-2",
  },
  {
    id: 18,
    src: "/SNAPS/IMG_20221212_124703.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 19,
    src: "/SNAPS/IMG_20230119_215033.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 20,
    src: "/SNAPS/PXL_20230407_191742798.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  // Variation: 3 small left, large right (2x2)
  {
    id: 21,
    src: "/SNAPS/PXL_20230930_142851223.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 22,
    src: "/SNAPS/Tree+planting.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 23,
    src: "/SNAPS/10629557_10152753868904559_3561853083146448616_n.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 24,
    src: "/SNAPS/11.webp",
    alt: "Travel photo",
    colSpan: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1 sm:row-span-2 md:row-span-2 lg:row-span-2",
  },
  // Break pattern: 2 small, large left (2x2), 1 small
  {
    id: 25,
    src: "/SNAPS/11821054_1618709501721695_249890945_n.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 26,
    src: "/SNAPS/12479353_1557063534619563_582110555_n.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 27,
    src: "/SNAPS/12599066_933838910045340_311950688_n.webp",
    alt: "Travel photo",
    colSpan: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1 sm:row-span-2 md:row-span-2 lg:row-span-2",
  },
  {
    id: 28,
    src: "/SNAPS/14279152_172976939808161_2061105686_n.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  // Large left (2x2), 2 small right
  {
    id: 29,
    src: "/SNAPS/14295319_1125578267549394_65401663_n.webp",
    alt: "Travel photo",
    colSpan: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1 sm:row-span-2 md:row-span-2 lg:row-span-2",
  },
  {
    id: 30,
    src: "/SNAPS/14374451_1369902616370825_253131428_n.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 31,
    src: "/SNAPS/15876936_268067413612881_5831430608500293632_n.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  // Variation: 1 small, large right (2x2), 2 small
  {
    id: 32,
    src: "/SNAPS/17553861_10158437048940258_4958351618534634811_n.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 33,
    src: "/SNAPS/17634618_10158437054895258_2311364822226677998_n.webp",
    alt: "Travel photo",
    colSpan: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1 sm:row-span-2 md:row-span-2 lg:row-span-2",
  },
  {
    id: 34,
    src: "/SNAPS/17757472_10158437055240258_1455407860694578404_n.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 35,
    src: "/SNAPS/18199096_10158605246355258_3147526177729692931_n.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  // End: Asymmetric finish - large left (2x2), 1 small, then 2 small below
  {
    id: 36,
    src: "/SNAPS/18301111_10158605246855258_8235322165911883041_n.webp",
    alt: "Travel photo",
    colSpan: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1 sm:row-span-2 md:row-span-2 lg:row-span-2",
  },
  {
    id: 37,
    src: "/SNAPS/18301682_10158605243895258_4416544402126843064_n.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 38,
    src: "/SNAPS/19.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 39,
    src: "/SNAPS/6.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  // Final: 1 small, 1 large right (2x2) for asymmetric ending
  {
    id: 40,
    src: "/SNAPS/image-asset.webp",
    alt: "Travel photo",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 41,
    src: "/SNAPS/PXL_20251129_125044459.jpg",
    alt: "Travel photo",
    colSpan: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1 sm:row-span-2 md:row-span-2 lg:row-span-2",
  },
];

export default function Solution() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="snaps"
      ref={ref}
      className="py-32 sm:py-40 lg:py-48 relative z-10 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-16">
            Snaps
          </h2>
          <p className="text-lg sm:text-xl text-black/70 mb-12 max-w-3xl">
            Below are photos from my travels around Europe, Asia and the USA, which give an insight into some of the things I've seen, tasted and enjoyed.
          </p>
          <BentoGrid images={snapsImages} />
        </motion.div>
      </div>
    </section>
  );
}


