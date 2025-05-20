const businessMetadata = {
  businessName: "Food Sentinel",
  address:
    "University of Science and Technology of Southern Philippines, Cagayan de Oro City, Philippines",
  map: {
    link: "https://maps.app.goo.gl/NVDdvaswMioboVp27",
    embeddedLink:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1213.9020884663971!2d124.6563335!3d8.4852594!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32fff2c3ca5ae8c7%3A0x880805868ab84491!2sUniversity%20of%20Science%20and%20Technology%20of%20Southern%20Philippines%20-%20CDO%20Campus!5e1!3m2!1sen!2sph!4v1746285060356!5m2!1sen!2sph",
    zoom: 15,
    address:
      "University of Science and Technology of Southern Philippines, Cagayan de Oro City, Philippines",
  },
  tagline:
    "Savor the heart of Filipino cuisine, preserving tradition and flavor since 2002",
  systemName: "Catering Reservation System",
  businessLogo: "/catering-logo.png",
  businessHours: "8:00 AM - 5:00 PM",
  businessDays: "Monday - Friday",
  socialMediaLinks: [
    { platform: "Facebook", url: "https://www.facebook.com/food-sentinel" },
    { platform: "Instagram", url: "https://www.instagram.com/food-sentinel" },
    { platform: "Twitter", url: "https://www.twitter.com/food-sentinel" },
    { platform: "Tiktok", url: "https://www.tiktok.com/@food-sentinel" },
  ],
};

const ownerMetadata = {
  name: "Margarita Forés",
  renderIntroduction: function () {
    return `Our catering service is led by the renowned founder, ${this.name}, celebrated for her mastery of Filipino cuisine. With a deep respect for tradition and a passion for culinary excellence, she guarantees that every event we cater delivers an authentic and unforgettable Filipino dining experience.`;
  },
  description:
    "Awarded Asia's Best Female Chef in 2016, Margarita Forés is a Filipino that brings her distinguished culinary expertise to Food Sentinel with a vision to elevate authentic Filipino cuisine. Through her deep respect for tradition and innovative approach, each dish is thoughtfully crafted to capture the rich heritage of the Philippines, guided by the belief that every dish has a story to tell",
  role: "Asia's Best Female Chef 2016",
  email: "margarita.fores@food-sentinel.com",
  phone: "+639123456789",
  profilePic: "/images/caterer-profile.jpg",
};

export { businessMetadata, ownerMetadata };
