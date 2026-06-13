import { FileText } from "lucide-react";

interface DescribeProps {
  description: string;
}

export default function Describe({ description }: DescribeProps) {
  return (
    <div className="space-y-10">
      {/* Long Description */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-app-surface border border-app-border rounded-lg flex items-center justify-center text-app-accent">
            <FileText size={20} />
          </div>
          <h2 className="text-2xl font-black text-app-primary tracking-tight uppercase">Description</h2>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-app-secondary leading-relaxed text-lg font-medium">
            {description}
          </p>
          <p className="text-app-secondary leading-relaxed text-lg font-medium">
            This high-quality digital asset is designed to streamline your workflow and provide professional-grade results. 
            Whether you're building a new project from scratch or enhancing an existing one, our tools are built with 
            performance, security, and scalability in mind.
          </p>
        </div>
      </section>
    </div>
  );
}
