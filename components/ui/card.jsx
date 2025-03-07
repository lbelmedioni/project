import { cn } from "@/lib/utils";

export function Card({ className, ...props }) {
  return <div className={cn("bg-white shadow rounded-lg", className)} {...props} />;
}

export function CardHeader({ children }) {
  return <div className="p-4 border-b">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}
