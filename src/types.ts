export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
  tag?: string;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  category: "cut" | "beard" | "facial" | "pack";
  price: number;
  duration: string;
  description: string;
}

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  barberId: string;
  barberName: string;
  date: string;
  time: string;
  status: "Pendiente" | "Confirmado" | "Cancelado";
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const services: Service[] = [
  // Cortes
  {
    id: "cut-1",
    name: "Corte Clásico",
    category: "cut",
    price: 25,
    duration: "30 min",
    description: "Técnica tradicional con tijera y máquina para un acabado atemporal."
  },
  {
    id: "cut-2",
    name: "Degradado (Fade)",
    category: "cut",
    price: 30,
    duration: "30 min",
    description: "Transición suave y precisa desde la piel, adaptada a tu estilo."
  },
  {
    id: "cut-3",
    name: "Corte y Lavado VIP",
    category: "cut",
    price: 40,
    duration: "45 min",
    description: "Incluye lavado con productos premium y masaje capilar relajante."
  },
  // Barba
  {
    id: "beard-1",
    name: "Arreglo de Barba",
    category: "beard",
    price: 15,
    duration: "25 min",
    description: "Perfilado preciso y reducción de volumen con máquina y tijera."
  },
  {
    id: "beard-2",
    name: "Ritual de Afeitado",
    category: "beard",
    price: 25,
    duration: "35 min",
    description: "Toallas calientes, espuma artesanal y afeitado tradicional a navaja."
  },
  // Faciales
  {
    id: "facial-1",
    name: "Limpieza Básica",
    category: "facial",
    price: 20,
    duration: "30 min",
    description: "Exfoliación suave y mascarilla hidratante para revitalizar la piel."
  },
  {
    id: "facial-2",
    name: "Tratamiento Black Mask",
    category: "facial",
    price: 15,
    duration: "20 min",
    description: "Eliminación profunda de puntos negros y limpieza de poros."
  },
  // Packs
  {
    id: "pack-1",
    name: "Pack Ejecutivo",
    category: "pack",
    price: 55,
    duration: "90 min",
    description: "Corte de Cabello + Arreglo de Barba + Limpieza Facial Premium."
  }
];

export const barbers: Barber[] = [
  {
    id: "barber-1",
    name: "Marcos R.",
    specialty: "Especialista en degradados",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZe_AW4-fiY5jvLsfgAyGrLzAzoGkX7R2xqRYeJTUBIGJzpQqUE5hk0-TfF90Ptld3qz3m5gA99ls9fp5nSxNTuDV5TVJg2u5hZkHqfxjxGE8wrI44HqdWVIH86SYJXZOB_lLobNaj0JSuUmzgAo1dlk6oUfbWIFxE1nqAHFRXT3EV_JxMsosPmXqj3XHwRtBCcOhpc2ZHZVcv6_v32WvxvS2K5WxVH4GtXsagq136s7cCeBTgao90AJoSb5vbIbOMMrgrImtHubw"
  },
  {
    id: "barber-2",
    name: "Elena G.",
    specialty: "Estilo Clásico & Barba",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkBTdcfCXr0FK-Jw7aC8pZsEJdGOptvSky6-C_tfF85Z6G42ADt_T0h24hyUPvXJ3oHQY7tElX3BaQoa-GAdzPeYHEmucNqghaGOFksLeETeYhHy0_l1MgE_xtP5SGIqMGN7a3XnWg1BPvduHEpaL29pNgDOaslSb9qQ_gHI1Pj5ZMSOPPhF_eNwU6Kc1iAj_7eC-h-UFS0soFI4h19jQx-AjPSEo8Z6Y0Zkj-I8ogra4CBMFi6dfeFGipTNmlmXsqNTd6vVJKOo8"
  },
  {
    id: "barber-3",
    name: "David M.",
    specialty: "Diseño & Creatividad",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9o7YIo93KW6XGl5_C-sBjG4NZAgu8YZk4lYR9dv6RgCA8-SPkmafBGA23-edtjaRKla5MAMsCQY2Nipk_Ijsmo49PK-AviRpzxxmR9CCmkeQ4v3-fmKGna8cs25AWUVMn8IVbINLvapwZYdJMGYCER0Gz6ayyrv0h9K16DCMkYp9C8ROB84ES2dG6uXMg6WYQ_y2M_TIa4FkV_EmdeH1lGFk5mTEfO1ymW8-PjNYRcREMuUa1wP0i-M4a-hdjRKlJWCMxMBaJW7c"
  }
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Matte Finish Wax",
    category: "Ceras",
    price: 24.00,
    rating: 4.9,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdnmlaWbJ5-k88TYEyBaEOcYuxh22P3eJKDhrg0gLg7CX2zsOjnOxI9ITlPStRQV5bZz6lwReF0o7nVV6DS10nawW-ORdhTmUcuuh2rFu1cSBj0GdHliwdTX2SHDokLxb4c3RKUnJBD7DIFQYSM1vtdAGEAxiFWVOj2AS7A19kUN34-zhTorhIZOavqoXBIabhPR364RX21uO0q1fyDMNQLDp77w-DniwHY_321ObMaEyEmLlejQKpD6wM4r7E34fNmSb90SbecFM",
    description: "Cera capilar de acabado mate definitivo, fijación fuerte y textura impecable."
  },
  {
    id: "prod-2",
    name: "Sandalwood Beard Oil",
    category: "Aceites",
    price: 18.50,
    rating: 4.8,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkbThAgEK6Z5ywAnbMuS1H8DBuhvuDmChLQTOOXq9FFoy_9tqMnBFw5wa0oByCAHxjwm2FRpMDH9jgsMPi3AaAQVlnoOfaGSXXQts-nUAVfiwC896Sruh8VWI8wH3Zb0V7gKi8_ZMG7KfxpaSy3Ep0QI5rvXor2rsXXGcsvIEAR1IzgE93_6PtD6tLnzQk7oJMRbEBtPs1v7G0FnLZWGWozM7mi-AcG2MtlWrYIngSAhALeUCthC4XY6xsr1DmiOUOI-dK5BZGdC4",
    description: "Aceite de barba premium formulado con madera de sándalo puro para nutrir y suavizar."
  },
  {
    id: "prod-3",
    name: "Chrome Ritual Set",
    category: "Sets de Regalo",
    price: 85.00,
    rating: 5.0,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOVGMiWapMn-u-mTlpMPAcQKPAXtEwMf5mis5wimUHE6CO75PjqqWyI4WV7pUdv6sCRgVycU6KIpztt5k8CLD6wwuFUwVcxi1ggha19BMom8vw17OMP2RqQkY3vqG1xRAd2v8vgL0GEBJuDKrrcvcZN0GwoCfrALwl0r9D5J_FNTl3x2C_BpKCGjA7OOzhxWVSoyt-lVwerAcer_vuKhGvv4z3kFAUH3f1x-yjPSVlYEhI6bYl5Ahj5O4oqhY8dtVY3Av4PSLAmpk",
    tag: "BESTSELLER",
    description: "Kit de afeitado de lujo que incluye maquinilla de cromo, brocha de afeitar y crema premium."
  },
  {
    id: "prod-4",
    name: "Daily Detox Shampoo",
    category: "Champús",
    price: 22.00,
    rating: 4.7,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiDHAQnlYWBao2VE0HDw24vRWgV8BSHNXgwmp4BQvoQszAZFCLzD2qbOlp7UYs9lfs0nCToXVPGLa5aE1O6mKgDiIHY8-7QiICj-QCY-lG3dDjU6ZYdpHKj21dmCu3bMoJYNezSzz6o7EjvU3zeaUWICvFByQFCyom6-94AsQmYCyH5WAW6aul3yaN7tlCsqReSgVAH9wTFlT2jf-fgbnBREVM7P-qL3gU1joMbAbF4qwXd9rgucZ9KQwMlxkCLb5ObB4RIt282V4",
    description: "Champú revitalizador que desintoxica el cuero cabelludo y recupera el brillo natural."
  },
  {
    id: "prod-5",
    name: "Precision Mustache Wax",
    category: "Accesorios",
    price: 15.00,
    rating: 4.6,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWKiFbMVRiHh4t2lrmDM1pT5xBTRGryKWPJ3u1u6nhJT_xv0xdUFJyDNyG30PznOVTotfmNfstuYFVJACFlRhTg6SOcH-qwLmL9TCl30yHHHftruSBEjhMI-SghY5-pylaeSKwlk5BlGOuwttrtPH9TsD99k49cbtwlXDaWoAD2HZYMzHWtT5nk350GBuiEJ9-y65cQoWfysZKuz0Rt3gVDIM7bDfdfPE2dvvacMZR3bYdn1ZM9lW_yOe3X8nazbj5OcGA-8XtkpU",
    description: "Cera para bigote de precisión total. Perfume clásico y fijación de larga duración."
  },
  {
    id: "prod-6",
    name: "Aftershave Revitalize",
    category: "Tratamientos",
    price: 32.00,
    rating: 4.9,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0xLDCx7oQgea8940SUVSOPIzuLMfoTUjMMHQCtF6UnxrzLPOEsz1PSOcfgjHsK8fsBaXyueXJhnU7pQyXP1EbR2Jdvlr6bjtys5o4gKqS2JoEWK2SbnhnnT8Q6Rj50zjayk63x5CO3dIYFJrmGXex_R7YYP9rnNbvOBUHbSoMX-q9NyBSL_aG2EWJmWPxkD-e6nssDk1ULESwmt2aXa_5wIpope2YqnXUte_EO1FsoSJkfUl7hxPY41u-c66w0VrnPFsSb_3m9HY",
    tag: "NUEVO",
    description: "Loción para después del afeitado. Hidrata y alivia instantáneamente rejuveneciendo la piel."
  }
];

export interface GalleryItem {
  id: string;
  tag: string;
  title: string;
  imageUrl: string;
  description: string;
  model: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    tag: "Taper Fade",
    title: "Precisión Clásica",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoT_PoAVsoUraUpRsO8VoCYrGI8pTuKiSCDEJEYOWv9dqVefdbdBs-18eiMNfP9TFWm8Mkt7bHMxtndsj2WgcEX-p-oxUECjFKcLclkeYZuixZwuJu-wDF7hkYvwkXGqsSS12c-jfekpxoxlAFSWYjNeBtE1aDP2XO0S9fdV9c9fuZ0V-F2UFS4pENdKSHxoKs0x7OMzGU1k9BIb4-JwMf9DAFVtuzLHuKjIg8hqNrivcHrXxCF_dK0ZkyyIcib2SHOQz-EX_xDwM",
    description: "Un afeitado Taper Fade de alta definición. Combina graduado exacto en patillas y nuca para lucir impecable día a día.",
    model: "Carlos R."
  },
  {
    id: "gal-2",
    tag: "Beard Sculpt",
    title: "Esculpido de Barba",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZbowzKgqRVDms3kfa-t7_VXaBVWfSzy8EUabHhhKtPqVSGLDJRQP_R3MwXrhylJzom79MWjZl-i3Aqflxpo55dzG_JeUV09IrTkaxZnxCMIjhxx_I1gvuWLxh0xGAUbzepDuIbAEOqggmXcBllgdIMbf6HyV5tv4LwI5lHBkGRDaJdJbawmk8jUpGpTeF9Ozfzub61P3EEEFxfIGmzpaIAYY6lrxUKAppJM-1T3XeBvFBhBhKhKyHfC9tIf_Ycqqos5AuostfOI",
    description: "Detallado milimétrico de barba alineando las mejillas y cono de cuello utilizando ritual de aceite de sándalo.",
    model: "David L."
  },
  {
    id: "gal-3",
    tag: "Textured Crop",
    title: "Estilo Urbano",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpVdoqLHpCSml8Kf5KzgJ4VIWH0NM8AUC4dIIcxpp_Oy0PIUd8nUmicgQS48AfEKH13uVpPrVY1Kx2DpQMP4ckPny2ypsmYIvEF6QaOLMuEctDBXtaFUsdPWjrehh6U3LhjJpj-07g2wbjZIgmN9uYfxUtvJGYjN6L8MeL--k8-kn-gA6Vn1B13bnNKubEuvjKDHS0153LXg-RfuTHXkJ85AMh9LKNLJD-MetN3362PVSVrLqJ2hycUWpAO4n1nWa4UTAui8C0xIo",
    description: "Corte moderno estructurado con capa texturizada arriba y degradado alto en la nuca. Excelente para cabellos con volumen.",
    model: "Marc J."
  },
  {
    id: "gal-4",
    tag: "Detalle",
    title: "Herramientas Pro",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMHee_IvPSOXxcH6ZLR70SwJc2AIeKWkAUbOg2v882QiKKhkfyqQcLrt63S3GVDKIwF5RlJYlBuPz8KGLigB6oV6HRP_03pmJLc8evvyXCburwmiS6TDxHNJWU0e7ZqXxqR-rZFnRr8HYoq-gug3FdPteumkug-emFfYBqY-DfbywNC7LnNUuzKHy05rqv6XB8wVyzr6pb3cLC_Kpc4Tna8BOiEQM-7PKSHP10tY6V2T0-0daCP-WUNUEaU5gRvARw5sn3kVjcsHI",
    description: "Nuestras herramientas de trabajo: navajas finas de acero quirúrgico esterilizadas y clippers profesionales de alta precisión.",
    model: "BarberSys Lab"
  },
  {
    id: "gal-5",
    tag: "The Space",
    title: "Nuestro Santuario",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNytvFJkO3hMavJR00fUgYj-rIjbCFTbAtEqIyQwlMy2kMDwommtzouDpCTfTC3TrlWzl2SOyPLgqWl1GhdQeYqfcUNBYmP0Hx9TkgLtGbx1l6LtAHWGH_KZBkCgvi8t4WZKQBkZLoil7tEKR0uHe_UCkb1gpJhNJlAjtZqyfRvAYtWtGsk50MGF5RpFJ8JspBjT7xHZJsGh7d0FKtFSEyN01mwzpj6TutVFw8r4Biv_UFWBuBvfFPZ2QlMg9JSuVUAgv5uuzq5Os",
    description: "El salón contemporáneo BarberSys: un santuario de relajación masculina y enfoque clínico en el estilo.",
    model: "Sede Centro"
  },
  {
    id: "gal-6",
    tag: "Slick Back",
    title: "Elegancia Diaria",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5aD-5nBLOWhUhHfYLwEVAGoUYDlErBhI6XApwM4TOWj2_6DrO4a79DyjfS-qGMMzupnBBNbM2RQl3uOIE_lJC3RogTM7PWyN-pNCmhnmjVja9WvWVbO237VA-dnM1tRCc16-hS0PtgX2uGNOscN2QTDqBHxUngiLO6LCfnsQ7WjBX6FJ_4HlbnudYEXJ6Qh80qd-T4GejCp1iIqjDZWO44jQ-89tIztMvsSUMjnHgFjuHc8LCR5XT0hCwHiALkpsoGdgqXTTgcaw",
    description: "Peinado peinado hacia atrás con fijación brillante de aspecto húmedo. Un toque clásico renovado con líneas nítidas.",
    model: "Andrés M."
  }
];
