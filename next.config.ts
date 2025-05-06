import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: false, // Disables source maps in production
  images: {
    domains: [
      "www.kawalingpinoy.com",
      "www.angsarap.net",
      "i0.wp.com",
      "www.manilaspoon.com",
      "farm6.static.flickr.com",
      "assets.unileversolutions.com",
      "kitchenconfidante.com",
      "foodtray2go.com",
      "thesmartlocal.ph",
      "philippinetourismusa.com",
      "juancarlo.ph",
      "maviscatering.com",
      "riverineplace.com",
      "greatex.org",
      "www.lumina.com.ph",
      "ik.imagekit.io",
      "img.freepik.com",
      "media.istockphoto.com",
      "inspirations.ph",
      "banquetsofmn.com",
      "www.brides.com",
      "alwaince.com",
      "www.srisowbarnikaadecorator.com",
      "ambrosiaeventsmke.com",
      "events.enderuncolleges.com",
      "www.shutterstock.com",
      "hips.hearstapps.com",
      "tie.usprogramming8.com",
      "ual-media-res.cloudinary.com",
      "miro.medium.com",
      "www.travelwisconsin.com",
      "www.flyacecorp.com",
      //dummy
      "www.allrecipes.com",
    ],
  },
};

export default nextConfig;
