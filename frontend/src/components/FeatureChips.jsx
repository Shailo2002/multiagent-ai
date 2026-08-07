import {
  AppWindow,
  FileSpreadsheet,
  FileText,
  Globe,
  Image,
  LayoutDashboard,
  Presentation,
  Video,
  Workflow,
} from "lucide-react";

const defaultFeatures = [
  {
    id: "websites",
    label: "Websites",
    icon: Globe,
  },
  {
    id: "slides",
    label: "Slides",
    icon: Presentation,
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
  },
  {
    id: "sheets",
    label: "Sheets",
    icon: FileSpreadsheet,
  },
  {
    id: "workflows",
    label: "Workflows",
    icon: Workflow,
  },
  {
    id: "apps",
    label: "Apps",
    icon: AppWindow,
  },
  {
    id: "video",
    label: "Video",
    icon: Video,
  },
  {
    id: "images",
    label: "Images",
    icon: Image,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
];

export default function FeatureChips({
  activeFeature,
  features = defaultFeatures,
  onChange,
  workspace = false,
}) {
  return (
    <div
      aria-label="Available capabilities"
      className={workspace ? "capability-list" : "feature-chips"}
      role="list"
    >
      {features.map((feature) => {
        const Icon = feature.icon;
        const active = activeFeature === feature.id;

        return (
          <button
            aria-pressed={active}
            className={`${workspace ? "pill" : "feature-chip"} ${
              active ? "active" : ""
            }`}
            key={feature.id}
            onClick={() => onChange?.(feature.id)}
            role="listitem"
            type="button"
          >
            <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
            <span>{feature.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export { defaultFeatures };
