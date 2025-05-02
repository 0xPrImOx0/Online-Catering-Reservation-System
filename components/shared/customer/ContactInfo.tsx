import { Card } from "@/components/ui/card";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import React from "react";
import MapComponent from "../MapComponent";

export default function ContactInfo() {
  const contactInfos = [
    {
      title: "Email Us",
      icon: Mail,
      content: "hello@gourmetcater.com",
      subcontent: "We'll respond within 24 hours",
    },
    {
      title: "Call Us",
      icon: Phone,
      content: "(555) 123-4567",
      subcontent: "Mon-Fri: 9:00am - 5:30pm EST",
    },
    {
      title: "Visit Us",
      icon: MapPin,
      content: "456 Elm Street, Suite 101",
      subcontent: "By appointment only",
    },
  ];
  return (
    <section className="flex flex-col max-w-[950px] mx-auto gap-8 mt-10">
      {/* Get In Touch */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Get in Touch</h2>
        <div className="flex gap-6 max-sm:flex-col">
          {contactInfos.map((info) => (
            <Card className="flex flex-1 gap-4 px-6 py-4" key={info.title}>
              <info.icon className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-medium">{info.title}</h3>
                <h4 className="text-primary hover:underline">{info.content}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {info.subcontent}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Connect With Us */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Connect With Us</h2>
        <p className="text-muted-foreground">
          Follow us on social media for the latest updates, behind-the-scenes
          content, and special offers.
        </p>

        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-12 h-12 text-white bg-blue-600 rounded-full transition-colors hover:bg-blue-700"
          >
            <Facebook className="w-6 h-6" />
            <span className="sr-only">Facebook</span>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 rounded-full transition-opacity hover:opacity-90"
          >
            <Instagram className="w-6 h-6" />
            <span className="sr-only">Instagram</span>
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-12 h-12 text-white bg-black rounded-full transition-colors hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
              <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              <path d="M15 8v8a4 4 0 0 1-4 4" />
              <line x1="9" y1="16" x2="9" y2="20" />
            </svg>
            <span className="sr-only">TikTok</span>
          </a>

          <a
            href="https://wa.me/15551234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-12 h-12 text-white bg-green-500 rounded-full transition-colors hover:bg-green-600"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="sr-only">WhatsApp</span>
          </a>
        </div>

        <div className="mt-6">
          <p className="text-sm text-muted-foreground">
            Direct message us on any platform for quick responses to simple
            questions.
          </p>
        </div>
      </div>
      <MapComponent />
    </section>
  );
}
