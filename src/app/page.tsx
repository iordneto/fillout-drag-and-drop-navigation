import { StepNavigation } from "@/components/navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="pt-16 pb-8 px-6">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <svg
                width="100"
                height="26"
                viewBox="0 0 100 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Fillout Logo"
              >
                <title>Fillout Logo</title>
                <path
                  d="M54.6676 5.42578C60.6601 5.42578 63.6897 8.65511 63.6897 15.1138C63.6897 18.1766 62.7575 21.1063 61.2594 22.8042C59.7612 24.5021 57.3309 25.401 54.3013 25.401C51.3716 25.401 49.2077 24.602 47.8094 23.0373C46.2447 21.3061 45.3125 18.3764 45.3125 15.0805C45.3125 8.6884 48.4752 5.42578 54.6676 5.42578ZM54.601 11.3185C52.2372 11.3185 51.0054 12.8499 51.0054 15.7463C51.0054 18.8758 52.2705 20.6402 54.5011 20.6402C56.7317 20.6402 58.0301 18.7759 58.0301 15.5798C58.0301 12.75 56.8981 11.3185 54.601 11.3185Z"
                  fill="#FFC738"
                />
                <path
                  d="M83.5841 6.0918V24.7353H77.5916V22.7711C77.5916 22.1386 77.6249 21.9721 77.7913 20.7736H77.5916C77.0256 22.4049 76.6261 23.104 75.8604 23.8364C74.8283 24.8685 73.3968 25.4012 71.7988 25.4012C69.8345 25.4012 68.1033 24.6022 67.1379 23.2372C66.6052 22.4715 66.1724 21.1731 66.0392 19.7415C66.0059 19.1756 65.9727 18.0436 65.9727 15.1805V6.0918H72.2316V15.0141C72.2316 18.0103 72.2649 18.2767 72.6311 18.9092C73.0306 19.5418 73.7297 19.908 74.5953 19.908C75.7605 19.908 76.6927 19.2421 77.0589 18.1768C77.2919 17.4444 77.3252 17.1115 77.3252 15.0141V6.0918H83.5841Z"
                  fill="#FFC738"
                />
                <path
                  d="M36.7227 24.7748V0H42.9164V24.7748H36.7227Z"
                  fill="#FFC738"
                />
                <path
                  d="M27.2852 24.7748V0H33.6263V24.7748H27.2852Z"
                  fill="#FFC738"
                />
                <path
                  d="M0 2.6543H15.0419V8.21143H5.87728V11.8711H15.0419V17.0289H5.87728V24.7747H0V2.6543Z"
                  fill="#FFC738"
                />
                <path
                  d="M17.9258 24.7366L17.9258 6.29492C19.0577 6.72772 19.7901 6.86088 20.9554 6.86088C22.0873 6.86088 22.9862 6.69443 24.1847 6.29492L24.1847 24.7366H17.9258Z"
                  fill="#FFC738"
                />
                <path
                  d="M20.9861 5.20898C18.5801 5.20898 17.3637 4.36697 17.3637 2.68293C17.3637 1.88431 17.7379 1.12042 18.3395 0.677711C18.941 0.235 19.9167 0.000624307 21.1331 0.000624414C22.3094 0.000624516 23.1783 0.208959 23.7397 0.616947C24.3679 1.06834 24.7422 1.83223 24.7422 2.69161C24.7422 4.35829 23.4723 5.20898 20.9861 5.20898Z"
                  fill="#FFC738"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M90.1411 2.60742C90.141 7.33465 88.4789 8.18736 85.3828 8.18736V11.8539H88.479C88.3458 13.8182 88.3125 15.0167 88.3125 16.9143C88.3125 20.2768 88.6121 21.9747 89.4111 23.2398C90.31 24.6381 92.0745 25.4038 94.4049 25.4038C96.802 25.4038 98.3667 24.7712 99.998 23.1399V18.812C98.9992 20.0771 97.9339 20.643 96.6355 20.643C95.8365 20.643 95.1374 20.3101 94.8045 19.7774C94.4382 19.2115 94.3051 18.3459 94.3051 16.8145C94.3051 14.6838 94.2052 11.8539 94.2052 11.8539H99.998V6.07939H94.2052V2.60742H90.1411Z"
                  fill="#FFC738"
                />
              </svg>
            </div>

            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "#071003" }}
            >
              Engineering Assessment
            </h1>
            <p className="text-xl mb-8" style={{ color: "#211C20" }}>
              Advanced drag-and-drop navigation with smart constraints
            </p>

            {/* Reference Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a
                href="https://recruiting.fillout.com/frontend-take-home"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors"
                style={{
                  backgroundColor: "#FFC738",
                  color: "#071003",
                  borderColor: "#FFC738",
                }}
              >
                <span>📋</span>
                Assignment
              </a>
              <a
                href="https://www.figma.com/design/ed3Q3i07AsMXevtcN5dYKX/Fillout-Frontend-Take-home---July-2025--Community-?node-id=1-107&t=8W3nbcfALIiObsEv-1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors hover:bg-gray-50"
                style={{
                  color: "#211C20",
                  borderColor: "#211C20",
                }}
              >
                <span>🎨</span>
                Figma Design
              </a>
              <a
                href="https://github.com/iordneto/fillout-drag-and-drop-navigation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors hover:bg-gray-50"
                style={{
                  color: "#211C20",
                  borderColor: "#211C20",
                }}
              >
                <span>💾</span>
                GitHub Repo
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Demo Section - Main Focus */}
        <div className="px-6 mb-16">
          <div className="text-center mb-8">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#071003" }}
            >
              Interactive Demo
            </h2>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: "#FFC738", color: "#071003" }}
            >
              <span className="w-2 h-2 bg-current rounded-full animate-pulse"></span>
              Try dragging, inserting, and right-clicking!
            </div>
          </div>
          <StepNavigation />
        </div>

        {/* Features Overview - Compact */}
        <div className="px-6 mb-16">
          <div className="max-w-4xl mx-auto">
            <h3
              className="text-2xl font-bold text-center mb-8"
              style={{ color: "#071003" }}
            >
              Key Features & Decisions
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#FFC738" }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{ color: "#071003" }}
                    >
                      ✨
                    </span>
                  </div>
                  <h4 className="font-semibold" style={{ color: "#071003" }}>
                    Features
                  </h4>
                </div>

                <div className="space-y-3 text-sm" style={{ color: "#211C20" }}>
                  <p>
                    <strong>Fixed Pages:</strong> Info/Ending positions locked
                  </p>
                  <p>
                    <strong>Drag & Drop:</strong> Smooth reordering with
                    constraints
                  </p>
                  <p>
                    <strong>Smart Insertion:</strong> Add pages between items
                  </p>
                  <p>
                    <strong>Context Menu:</strong> Right-click for actions
                  </p>
                  <p>
                    <strong>Scroll Navigation:</strong> Horizontal with arrows
                  </p>
                </div>
              </div>

              {/* Decisions */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#FFC738" }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{ color: "#071003" }}
                    >
                      🎯
                    </span>
                  </div>
                  <h4 className="font-semibold" style={{ color: "#071003" }}>
                    Technical Decisions
                  </h4>
                </div>

                <div className="space-y-3 text-sm" style={{ color: "#211C20" }}>
                  <p>
                    <strong>Fillout-inspired:</strong> Matches existing patterns
                  </p>
                  <p>
                    <strong>dnd-kit:</strong> Accessible drag & drop
                  </p>
                  <p>
                    <strong>Zustand:</strong> Lightweight state management
                  </p>
                  <p>
                    <strong>Testing:</strong> Focused on business logic
                  </p>
                  <p>
                    <strong>Performance:</strong> Minimal re-renders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="text-center py-8 px-6 border-t"
          style={{ borderColor: "#FFC738" }}
        >
          <p className="text-sm" style={{ color: "#211C20" }}>
            Built with React, TypeScript, Tailwind CSS, and Fillout design
            principles
          </p>
        </div>
      </div>
    </div>
  );
}
