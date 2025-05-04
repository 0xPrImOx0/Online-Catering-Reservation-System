import { businessMetadata } from "@/lib/caterer/business-metadata";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MapComponent({
  isCaterer = false,
  embeddedURL,
}: {
  isCaterer?: boolean;
  embeddedURL?: string;
}) {
  const { map } = businessMetadata;

  return (
    <div className="flex flex-col items-center gap-4">
      <iframe
        src={embeddedURL || map.embeddedLink}
        width="100%"
        height="600"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-xl border shadow-md w-full max-w-5xl"
      ></iframe>

      {!isCaterer && (
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
      )}
    </div>
  );
}
