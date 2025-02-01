import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";
import { version } from "../../package.json";
import { i18n } from "../i18n";
import versionComp from "./Version";

interface Options {
  links: Record<string, string>;
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear();
    const links = opts?.links ?? [];
    const Version = versionComp();

    return (
      <footer
        class={`${displayClass ?? ""}`}
        style={{
          padding: "40px 20px",
          textAlign: "center",
          fontFamily: "Lexend, sans-serif",
          background: "none", // Ensure no white background in footer
          color: "#545351", // Dark gray text
        }}
      >
        <div
          style={{
            color: "#545351", // Dark grey text color
            padding: "0", // Remove any additional padding
            textAlign: "center",
            background: "none", // Remove background to prevent white box
          }}
        >
          <p>
            {i18n(cfg.locale).components.footer.createdWith}{" "}
            <a
              href="https://quartz.jzhao.xyz/"
              style={{ color: "secondary", textDecoration: "underline" }} // Same link color as the rest of the website
            >
              Quartz v{version}
            </a>{" "}
            © {year}
          </p>
          <p>
            <a
              href="https://sites.google.com/view/kidscollab"
              style={{ color: "secondary", textDecoration: "underline" }} // Same link color as the rest of the website
            >
              KidsCollab Google Sites
            </a>
          </p>
          <p><Version /> Updated {new Date().toLocaleDateString()}</p>
          <ul>
            {Object.entries(links).map(([text, link]) => (
              <li key={link}>
                <a
                  href={link}
                  style={{
                    color: "secondary", // Same link color as the rest of the website
                    textDecoration: "underline",
                  }}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Floating Buttons Section */}
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeDKeQq8hZXR0ebq5clspQWrRGZ9lUaSx1JrFGqdu-KKeigpQ/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "highlight", // Darker grey with blue undertone
              color: "#a0b1ca",
              padding: "15px 30px",
              textAlign: "center",
              borderRadius: "50px",
              textDecoration: "none",
              fontSize: "16px",
              fontFamily: "Lexend, sans-serif",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              transition: "background-color 0.3s, transform 0.3s ease-in-out",
              border: "none",
            }}
          >
            Beta Feedback
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfsDvKfpNUXUs6h3tyTgPMhFLOixsAuV81mPo9T1VH7yqxiQg/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "highlight", // Same warm grey with blue undertone
              color: "#a0b1ca",
              padding: "15px 30px",
              textAlign: "center",
              borderRadius: "50px",
              textDecoration: "none",
              fontSize: "16px",
              fontFamily: "Lexend, sans-serif",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              transition: "background-color 0.3s, transform 0.3s ease-in-out",
              border: "none",
            }}
          >
            Item Submission
          </a>
        </div>
      </footer>
    );
  };

  Footer.css = ''; // No external CSS file needed
  return Footer;
}) satisfies QuartzComponentConstructor;
