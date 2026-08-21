import ClientApp from "./ClientApp";
import { getAllDocPaths } from "@/data/docs";

export function generateStaticParams() {
  return [
    { slug: [] },
    ...getAllDocPaths().map((path) => ({
      slug: path.split("/").filter(Boolean),
    })),
  ];
}

export default function Page() {
  return <ClientApp />;
}
