import { businessMetadata } from "@/lib/caterer/business-metadata";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const { map } = businessMetadata;

export default function MapComponent() {
  return (
    <div className="flex flex-col items-center gap-4">
      <iframe
        src={map.embeddedLink}
        width="100%"
        height="450"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-xl border shadow-md w-full max-w-5xl"
      ></iframe>

      <Button asChild variant="outline">
        <Link
          href={map.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center"
        >
          View on Google Maps
        </Link>
      </Button>
    </div>
  );
}
