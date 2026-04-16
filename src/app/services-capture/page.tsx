import { notFound } from "next/navigation";
import ServicesCaptureClient from "./ServicesCaptureClient";

export default function ServicesCapturePage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <ServicesCaptureClient />;
}
